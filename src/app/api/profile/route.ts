import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// PATCH - Update user profile (name and/or email)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await request.json();

    const supabaseAdmin = getSupabaseAdmin();
    const updates: { email?: string; user_metadata?: { name: string } } = {};
    const profileUpdates: { name?: string; email?: string } = {};

    // Handle name change
    if (name && name !== user.user_metadata?.name) {
      updates.user_metadata = { name };
      profileUpdates.name = name;
    }

    // Handle email change
    if (email && email !== user.email) {
      updates.email = email;
      profileUpdates.email = email;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No changes to update" });
    }

    // Update auth user
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      updates
    );

    if (authError) {
      console.error("Auth update error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Update profiles table
    if (Object.keys(profileUpdates).length > 0) {
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update(profileUpdates)
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        // Don't fail the whole request, auth was updated
      }

      // Also update team_members table if name changed
      if (profileUpdates.name) {
        await supabaseAdmin
          .from("team_members")
          .update({ name: profileUpdates.name })
          .eq("user_id", user.id);
      }

      // Update email in team_members if changed
      if (profileUpdates.email) {
        await supabaseAdmin
          .from("team_members")
          .update({ email: profileUpdates.email })
          .eq("user_id", user.id);
      }
    }

    return NextResponse.json({
      success: true,
      emailChanged: !!updates.email,
      message: updates.email
        ? "Profile updated. Please check your new email for verification."
        : "Profile updated successfully."
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
