import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getRateLimitKey } from "@/lib/rate-limit";

// Use service role for pending data (user doesn't exist yet)
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// POST - Save pending quiz data (before account creation)
// Rate limited to prevent abuse
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per minute per IP
    const rateLimitKey = getRateLimitKey(request, "pending-quiz-post");
    const rateLimit = checkRateLimit(rateLimitKey, { windowMs: 60000, maxRequests: 5 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { email, quizAnswers, salesContext } = body;

    if (!email || !quizAnswers || !salesContext) {
      return NextResponse.json(
        { error: "Email, quizAnswers, and salesContext are required" },
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

    // Upsert pending quiz data (replace if email already exists)
    const { error } = await supabase
      .from("pending_quiz_data")
      .upsert(
        {
          email: email.toLowerCase(),
          quiz_answers: quizAnswers,
          sales_context: salesContext,
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Error saving pending quiz data:", error);
      return NextResponse.json(
        { error: "Failed to save quiz data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pending quiz POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Fetch pending quiz data by email
// Only returns data, doesn't expose sensitive info
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("pending_quiz_data")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (error || !data) {
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({
      data: {
        quizAnswers: data.quiz_answers,
        salesContext: data.sales_context,
      },
    });
  } catch (error) {
    console.error("Pending quiz GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Remove pending quiz data after processing
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("pending_quiz_data")
      .delete()
      .eq("email", email.toLowerCase());

    if (error) {
      console.error("Error deleting pending quiz data:", error);
      return NextResponse.json(
        { error: "Failed to delete quiz data" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pending quiz DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
