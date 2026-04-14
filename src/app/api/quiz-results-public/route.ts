import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Time limit for public access (30 minutes in milliseconds)
const PUBLIC_ACCESS_WINDOW_MS = 30 * 60 * 1000;

// Public API to fetch quiz result by ID
// Used when viewing results after email confirmation (no session yet)
// Security: Only allows access to results created within the last 30 minutes
export async function GET(request: NextRequest) {
  try {
    const resultId = request.nextUrl.searchParams.get("id");

    if (!resultId) {
      return NextResponse.json({ error: "Result ID required" }, { status: 400 });
    }

    // Validate UUID format to prevent injection
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(resultId)) {
      return NextResponse.json({ error: "Invalid result ID format" }, { status: 400 });
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

    // Security check: Only allow public access to recently created results
    const createdAt = new Date(result.created_at).getTime();
    const now = Date.now();
    if (now - createdAt > PUBLIC_ACCESS_WINDOW_MS) {
      // Result is too old for public access - require authentication
      return NextResponse.json(
        { error: "Please log in to view this result", requiresAuth: true },
        { status: 401 }
      );
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
