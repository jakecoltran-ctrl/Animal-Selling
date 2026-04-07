import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public API to check if an email has been confirmed
// This doesn't require authentication - just checks the database
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Use service role to check user confirmation status
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Check if user exists and is confirmed
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error("Error checking confirmation:", error);
      return NextResponse.json({ confirmed: false });
    }

    const user = data.users.find(u => u.email === email);

    if (user && user.email_confirmed_at) {
      return NextResponse.json({ confirmed: true, userId: user.id });
    }

    return NextResponse.json({ confirmed: false });
  } catch (error) {
    console.error("Check confirmation error:", error);
    return NextResponse.json({ confirmed: false });
  }
}
