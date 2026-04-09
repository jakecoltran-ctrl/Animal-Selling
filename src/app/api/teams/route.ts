import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// DELETE - Delete a team (owner only)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teamId = request.nextUrl.searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json({ error: "Team ID required" }, { status: 400 });
    }

    // Use admin client to check ownership and delete
    const supabaseAdmin = getSupabaseAdmin();

    // Verify user is team owner
    const { data: team, error: teamError } = await supabaseAdmin
      .from("teams")
      .select("owner_id")
      .eq("id", teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    if (team.owner_id !== user.id) {
      return NextResponse.json({ error: "Only team owner can delete" }, { status: 403 });
    }

    // Get gift codes for this team
    const { data: giftCodes } = await supabaseAdmin
      .from("gift_codes")
      .select("id")
      .eq("team_id", teamId);

    // Clear gift_code_id from purchases that reference these codes
    if (giftCodes && giftCodes.length > 0) {
      const giftCodeIds = giftCodes.map(gc => gc.id);
      await supabaseAdmin
        .from("purchases")
        .update({ gift_code_id: null })
        .in("gift_code_id", giftCodeIds);
    }

    // Delete all related records
    await supabaseAdmin.from("gift_codes").delete().eq("team_id", teamId);
    await supabaseAdmin.from("team_members").delete().eq("team_id", teamId);

    // Delete the team
    const { error: deleteError } = await supabaseAdmin
      .from("teams")
      .delete()
      .eq("id", teamId);

    if (deleteError) {
      console.error("Failed to delete team:", deleteError);
      return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Team delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
