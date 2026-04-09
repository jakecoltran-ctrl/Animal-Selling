import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 requests per minute per IP
    const rateLimitKey = getRateLimitKey(request, "email-capture");
    const rateLimit = checkRateLimit(rateLimitKey, { windowMs: 60000, maxRequests: 3 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { email, source } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Check for duplicate
    const { data: existing } = await supabase
      .from("email_captures")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 200 }
      );
    }

    // Insert new email capture
    const { error } = await supabase.from("email_captures").insert({
      email: email.toLowerCase(),
      source: source || "unknown",
    });

    if (error) {
      // Handle duplicate key error gracefully
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 200 }
        );
      }
      console.error("Error capturing email:", error);
      return NextResponse.json(
        { error: "Failed to capture email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email captured successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture email" },
      { status: 500 }
    );
  }
}
