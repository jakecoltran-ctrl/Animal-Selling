import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { QuizResult } from "@/types";

// GET - Fetch user's quiz results from database (all or by ID)
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const resultId = searchParams.get("id");

    // If ID provided, fetch single result
    if (resultId) {
      const { data: result, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("id", resultId)
        .eq("user_id", user.id)
        .single();

      if (error || !result) {
        return NextResponse.json({ result: null });
      }

      const transformedResult: QuizResult = {
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
    }

    // Otherwise fetch all results
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
        email: user.email,
        sales_context: result.salesContext,
        scores: result.scores,
        percentages: result.percentages,
        primary_type: result.primaryType,
        secondary_type: result.secondaryType,
        answers: result.answers,
        created_at: result.createdAt,
      };

      // Insert new result (use insert instead of upsert for simplicity)
      const { error } = await supabase
        .from("quiz_results")
        .insert(dbRecord);

      if (error) {
        // If duplicate, try update instead
        if (error.code === "23505") {
          const { error: updateError } = await supabase
            .from("quiz_results")
            .update(dbRecord)
            .eq("id", result.id)
            .eq("user_id", user.id);

          if (updateError) {
            console.error(`Error updating result ${result.id}:`, updateError);
            errors.push(result.id);
          } else {
            savedIds.push(result.id);
          }
        } else {
          console.error(`Error saving result ${result.id}:`, error);
          errors.push(result.id);
        }
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
