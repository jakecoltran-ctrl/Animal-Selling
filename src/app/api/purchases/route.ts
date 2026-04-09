import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST endpoint removed - purchases should only be created through:
// 1. /api/stripe/verify (after Stripe checkout)
// 2. /api/redeem-code (with valid gift code)
// Direct POST to /api/purchases is not allowed to prevent payment bypass

export async function GET() {
  try {
    const supabase = createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all purchases for this user
    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching purchases:", error);
      return NextResponse.json(
        { error: "Failed to fetch purchases" },
        { status: 500 }
      );
    }

    return NextResponse.json({ purchases: data || [] }, { status: 200 });
  } catch (error) {
    console.error("Purchases GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
