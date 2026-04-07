import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Fetch reflections for a quiz result
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resultId = request.nextUrl.searchParams.get("resultId");
    if (!resultId) {
      return NextResponse.json({ error: "Missing resultId" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("reflections")
      .select("reflections")
      .eq("user_id", user.id)
      .eq("result_id", resultId)
      .single();

    if (error && error.code !== "PGRST116") { // PGRST116 = no rows found
      console.error("Error fetching reflections:", error);
      return NextResponse.json({ error: "Failed to fetch reflections" }, { status: 500 });
    }

    return NextResponse.json({ reflections: data?.reflections || {} });
  } catch (error) {
    console.error("Error in GET reflections:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Save reflections for a quiz result
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resultId, reflections } = await request.json();
    if (!resultId) {
      return NextResponse.json({ error: "Missing resultId" }, { status: 400 });
    }

    const { error } = await supabase
      .from("reflections")
      .upsert({
        user_id: user.id,
        result_id: resultId,
        reflections,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,result_id",
      });

    if (error) {
      console.error("Error saving reflections:", error);
      return NextResponse.json({ error: "Failed to save reflections" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST reflections:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
