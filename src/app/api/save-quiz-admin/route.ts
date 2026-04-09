import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Admin endpoint to save quiz result after email confirmation
// Validates that the user's email has pending quiz data before saving
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

    // Verify the userId exists and get the user's email
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !userData?.user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    // Verify user was confirmed recently (within last 10 minutes)
    const confirmedAt = userData.user.email_confirmed_at;
    if (!confirmedAt) {
      return NextResponse.json({ error: "User not confirmed" }, { status: 400 });
    }

    const confirmedTime = new Date(confirmedAt).getTime();
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

    // For existing users who confirmed long ago, verify they have pending data
    if (confirmedTime < tenMinutesAgo) {
      // Check if there's pending quiz data for this user's email
      const { data: pendingData } = await supabaseAdmin
        .from("pending_quiz_data")
        .select("email")
        .eq("email", userData.user.email?.toLowerCase())
        .single();

      if (!pendingData) {
        return NextResponse.json(
          { error: "No pending quiz data found" },
          { status: 400 }
        );
      }
    }

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
