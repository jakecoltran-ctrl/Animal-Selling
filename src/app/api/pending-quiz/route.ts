import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role for pending data (user doesn't exist yet)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST - Save pending quiz data (before account creation)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, quizAnswers, salesContext } = body;

    if (!email || !quizAnswers || !salesContext) {
      return NextResponse.json(
        { error: "Email, quizAnswers, and salesContext are required" },
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
export async function GET(request: Request) {
  try {
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
export async function DELETE(request: Request) {
  try {
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
