import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { QuizResult } from "@/types";

// GET - Fetch user's quiz results from database
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: results, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching quiz results:", error);
      return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
    }

    // Transform database format to app format
    const transformedResults: QuizResult[] = (results || []).map((r) => ({
      id: r.id,
      salesContext: r.sales_context,
      scores: r.scores,
      percentages: r.percentages,
      primaryType: r.primary_type,
      secondaryType: r.secondary_type,
      answers: r.answers,
      createdAt: r.created_at,
    }));

    return NextResponse.json({ results: transformedResults });
  } catch (error) {
    console.error("Quiz results GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Save or sync quiz results to database
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { results } = body as { results: QuizResult[] };

    if (!results || !Array.isArray(results)) {
      return NextResponse.json({ error: "Results array required" }, { status: 400 });
    }

    const savedIds: string[] = [];
    const errors: string[] = [];

    for (const result of results) {
      // Transform app format to database format
      const dbRecord = {
        id: result.id,
        user_id: user.id,
        sales_context: result.salesContext,
        scores: result.scores,
        percentages: result.percentages,
        primary_type: result.primaryType,
        secondary_type: result.secondaryType,
        answers: result.answers,
        created_at: result.createdAt,
      };

      // Upsert to handle both new and existing results
      const { error } = await supabase
        .from("quiz_results")
        .upsert(dbRecord, { onConflict: "id,user_id", ignoreDuplicates: false });

      if (error) {
        console.error(`Error saving result ${result.id}:`, error);
        errors.push(result.id);
      } else {
        savedIds.push(result.id);
      }
    }

    return NextResponse.json({
      success: true,
      savedIds,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Quiz results POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
