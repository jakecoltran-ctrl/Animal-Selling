import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// POST - Check purchase status for multiple quiz result IDs
// Used by team leaders to see which members have unlocked reports
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizResultIds } = await request.json();

    if (!quizResultIds || !Array.isArray(quizResultIds)) {
      return NextResponse.json({ error: "quizResultIds array required" }, { status: 400 });
    }

    if (quizResultIds.length === 0) {
      return NextResponse.json({ purchasedIds: [] });
    }

    // Use admin client to check purchases across all users
    const supabaseAdmin = getSupabaseAdmin();

    const { data: purchases, error } = await supabaseAdmin
      .from("purchases")
      .select("quiz_result_id")
      .in("quiz_result_id", quizResultIds)
      .eq("status", "completed");

    if (error) {
      console.error("Error checking purchases:", error);
      return NextResponse.json({ error: "Failed to check purchases" }, { status: 500 });
    }

    const purchasedIds = purchases?.map(p => p.quiz_result_id).filter(Boolean) || [];

    return NextResponse.json({ purchasedIds });
  } catch (error) {
    console.error("Purchase check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
