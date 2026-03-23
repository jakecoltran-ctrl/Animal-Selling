import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demo (would use Supabase in production)
const emailCaptures: Array<{ email: string; source: string; createdAt: string }> = [];

export async function POST(request: NextRequest) {
  try {
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

    // Check for duplicate
    const exists = emailCaptures.some((e) => e.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 200 }
      );
    }

    // Store the email
    emailCaptures.push({
      email: email.toLowerCase(),
      source: source || "unknown",
      createdAt: new Date().toISOString(),
    });

    // In production, you would save to Supabase here:
    // const supabase = createClient();
    // await supabase.from('email_captures').insert({ email, source });

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
