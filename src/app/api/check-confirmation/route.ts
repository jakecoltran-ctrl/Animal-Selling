import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

// API to check if an email has been confirmed
// Used during email confirmation flow
export async function GET(request: NextRequest) {
  try {
    // Rate limit: 20 requests per minute per IP (polling endpoint)
    const rateLimitKey = getRateLimitKey(request, "check-confirmation");
    const rateLimit = checkRateLimit(rateLimitKey, { windowMs: 60000, maxRequests: 20 });

    if (!rateLimit.allowed) {
      return NextResponse.json({ confirmed: false });
    }

    const email = request.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ confirmed: false });
    }

    // Use service role to check user confirmation status
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Query users to find by email
    // Note: Supabase admin API requires listing users - we search through them
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ confirmed: false });
    }

    const user = data.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

    if (user?.email_confirmed_at) {
      return NextResponse.json({ confirmed: true, userId: user.id });
    }

    return NextResponse.json({ confirmed: false });
  } catch (error) {
    console.error("Check confirmation error:", error);
    return NextResponse.json({ confirmed: false });
  }
}
