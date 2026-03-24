import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { quizResultId, stripePaymentId } = body;

    if (!quizResultId) {
      return NextResponse.json(
        { error: "Quiz result ID is required" },
        { status: 400 }
      );
    }

    // Check if already purchased
    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("quiz_result_id", quizResultId)
      .eq("status", "completed")
      .single();

    if (existingPurchase) {
      return NextResponse.json(
        { message: "Already purchased", alreadyPurchased: true },
        { status: 200 }
      );
    }

    // Record the purchase
    const { error } = await supabase.from("purchases").insert({
      user_id: user.id,
      quiz_result_id: quizResultId,
      product_type: "full_report",
      amount_cents: 499,
      stripe_payment_id: stripePaymentId || null,
      status: "completed",
    });

    if (error) {
      console.error("Error recording purchase:", error);
      return NextResponse.json(
        { error: "Failed to record purchase" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Purchase API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
