import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Generate a random code
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing characters like 0, O, 1, I
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET - Fetch gift codes for a team
export async function GET(request: Request) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
    }

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is the team owner or co-leader
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("owner_id, co_leader_id")
      .eq("id", teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const isLeader = team.owner_id === user.id || team.co_leader_id === user.id;
    if (!isLeader) {
      return NextResponse.json({ error: "Only team leaders can view gift codes" }, { status: 403 });
    }

    // Fetch gift codes for this team
    const { data: codes, error: codesError } = await supabase
      .from("gift_codes")
      .select("id, code, created_at, used_at, used_by")
      .eq("team_id", teamId)
      .order("created_at", { ascending: false });

    if (codesError) {
      console.error("Error fetching gift codes:", codesError);
      return NextResponse.json({ error: "Failed to fetch codes" }, { status: 500 });
    }

    const formattedCodes = (codes || []).map((c) => ({
      id: c.id,
      code: c.code,
      createdAt: c.created_at,
      usedAt: c.used_at,
      usedBy: c.used_by,
    }));

    return NextResponse.json({ codes: formattedCodes }, { status: 200 });
  } catch (error) {
    console.error("Team gift codes GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Purchase/generate new gift codes
export async function POST(request: Request) {
  try {
    const supabase = createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { teamId, quantity } = body;

    if (!teamId) {
      return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
    }

    if (!quantity || ![10, 25, 50, 100].includes(quantity)) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    // Check if user is the team owner or co-leader
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("owner_id, co_leader_id")
      .eq("id", teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const isLeader = team.owner_id === user.id || team.co_leader_id === user.id;
    if (!isLeader) {
      return NextResponse.json({ error: "Only team leaders can purchase gift codes" }, { status: 403 });
    }

    // TODO: Add Stripe payment verification here
    // For now, we'll generate the codes directly

    // Generate unique codes
    const codes: { code: string; team_id: string; created_by: string }[] = [];
    const existingCodes = new Set<string>();

    // Get existing codes to avoid duplicates
    const { data: existing } = await supabase.from("gift_codes").select("code");
    if (existing) {
      existing.forEach((c) => existingCodes.add(c.code));
    }

    while (codes.length < quantity) {
      const code = generateCode();
      if (!existingCodes.has(code)) {
        existingCodes.add(code);
        codes.push({
          code,
          team_id: teamId,
          created_by: user.id,
        });
      }
    }

    // Insert the codes
    const { error: insertError } = await supabase.from("gift_codes").insert(codes);

    if (insertError) {
      console.error("Error inserting gift codes:", insertError);
      return NextResponse.json({ error: "Failed to generate codes" }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: quantity }, { status: 200 });
  } catch (error) {
    console.error("Team gift codes POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Remove a used gift code from the list
export async function DELETE(request: Request) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const codeId = searchParams.get("codeId");

    if (!codeId) {
      return NextResponse.json({ error: "Code ID is required" }, { status: 400 });
    }

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the code to verify ownership and that it's used
    const { data: code, error: codeError } = await supabase
      .from("gift_codes")
      .select("id, team_id, used_at")
      .eq("id", codeId)
      .single();

    if (codeError || !code) {
      return NextResponse.json({ error: "Code not found" }, { status: 404 });
    }

    // Check if user is the team owner or co-leader
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("owner_id, co_leader_id")
      .eq("id", code.team_id)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const isLeader = team.owner_id === user.id || team.co_leader_id === user.id;
    if (!isLeader) {
      return NextResponse.json({ error: "Only team leaders can delete gift codes" }, { status: 403 });
    }

    // Only allow deleting used codes
    if (!code.used_at) {
      return NextResponse.json({ error: "Can only delete used codes" }, { status: 400 });
    }

    // Delete the code
    const { error: deleteError } = await supabase
      .from("gift_codes")
      .delete()
      .eq("id", codeId);

    if (deleteError) {
      console.error("Error deleting gift code:", deleteError);
      return NextResponse.json({ error: "Failed to delete code" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Team gift codes DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
