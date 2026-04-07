import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin endpoint to save quiz result after email confirmation
// Uses service role - doesn't require user session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, quizResult } = body;

    if (!userId || !quizResult) {
      return NextResponse.json(
        { error: "userId and quizResult are required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Transform app format to database format
    const dbRecord = {
      id: quizResult.id,
      user_id: userId,
      sales_context: quizResult.salesContext,
      scores: quizResult.scores,
      percentages: quizResult.percentages,
      primary_type: quizResult.primaryType,
      secondary_type: quizResult.secondaryType,
      answers: quizResult.answers,
      created_at: quizResult.createdAt,
    };

    // Insert the quiz result
    const { error } = await supabaseAdmin
      .from("quiz_results")
      .insert(dbRecord);

    if (error) {
      // If duplicate, try update instead
      if (error.code === "23505") {
        const { error: updateError } = await supabaseAdmin
          .from("quiz_results")
          .update(dbRecord)
          .eq("id", quizResult.id);

        if (updateError) {
          console.error("Error updating quiz result:", updateError);
          return NextResponse.json(
            { error: "Failed to update quiz result" },
            { status: 500 }
          );
        }
      } else {
        console.error("Error saving quiz result:", error);
        return NextResponse.json(
          { error: "Failed to save quiz result" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, resultId: quizResult.id });
  } catch (error) {
    console.error("Save quiz admin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
