import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { generateQuizResult } from "@/lib/quiz-scoring";
import { QuizAnswer, SalesContext } from "@/types";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const userEmail = data.user.email;
      const userId = data.user.id;

      // Check for pending quiz data
      if (userEmail) {
        try {
          const supabaseAdmin = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { autoRefreshToken: false, persistSession: false } }
          );

          // Fetch pending quiz data
          const { data: pendingData } = await supabaseAdmin
            .from("pending_quiz_data")
            .select("*")
            .eq("email", userEmail.toLowerCase())
            .single();

          if (pendingData?.quiz_answers && pendingData?.sales_context) {
            // Generate quiz result
            const formattedAnswers: QuizAnswer[] = Object.entries(pendingData.quiz_answers).map(
              ([questionId, value]) => ({
                questionId,
                value: value as 1 | 2 | 3 | 4 | 5,
              })
            );

            const quizResult = generateQuizResult(
              formattedAnswers,
              pendingData.sales_context as SalesContext,
              userEmail
            );

            // Save quiz result to database
            const { error: saveError } = await supabaseAdmin
              .from("quiz_results")
              .insert({
                id: quizResult.id,
                user_id: userId,
                sales_context: quizResult.salesContext,
                scores: quizResult.scores,
                percentages: quizResult.percentages,
                primary_type: quizResult.primaryType,
                secondary_type: quizResult.secondaryType,
                answers: quizResult.answers,
                created_at: quizResult.createdAt,
              });

            if (!saveError) {
              // Delete pending data
              await supabaseAdmin
                .from("pending_quiz_data")
                .delete()
                .eq("email", userEmail.toLowerCase());

              // Redirect to quiz results
              return NextResponse.redirect(`${origin}/quiz/results/${quizResult.id}`);
            }
          }
        } catch (err) {
          console.error("Error processing pending quiz in callback:", err);
        }
      }

      // No pending quiz, redirect to default
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error - redirect to error page or home
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
