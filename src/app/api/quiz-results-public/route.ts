import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Public API to fetch quiz result by ID
// Used when viewing results after email confirmation (no session yet)
export async function GET(request: NextRequest) {
  try {
    const resultId = request.nextUrl.searchParams.get("id");

    if (!resultId) {
      return NextResponse.json({ error: "Result ID required" }, { status: 400 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: result, error } = await supabaseAdmin
      .from("quiz_results")
      .select("*")
      .eq("id", resultId)
      .single();

    if (error || !result) {
      return NextResponse.json({ result: null });
    }

    // Transform database format to app format
    const transformedResult = {
      id: result.id,
      salesContext: result.sales_context,
      scores: result.scores,
      percentages: result.percentages,
      primaryType: result.primary_type,
      secondaryType: result.secondary_type,
      answers: result.answers,
      createdAt: result.created_at,
    };

    return NextResponse.json({ result: transformedResult });
  } catch (error) {
    console.error("Quiz results public GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
