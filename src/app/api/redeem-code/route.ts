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
      return NextResponse.json({ error: "Please log in to redeem a code" }, { status: 401 });
    }

    const body = await request.json();
    const { code, quizResultId } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    if (!quizResultId) {
      return NextResponse.json(
        { error: "Quiz result ID is required" },
        { status: 400 }
      );
    }

    // Check if already purchased this report
    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("quiz_result_id", quizResultId)
      .eq("status", "completed")
      .single();

    if (existingPurchase) {
      return NextResponse.json(
        { error: "You already have access to this report" },
        { status: 400 }
      );
    }

    // Find the gift code
    const { data: giftCode, error: codeError } = await supabase
      .from("gift_codes")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (codeError || !giftCode) {
      return NextResponse.json(
        { error: "Invalid code. Please check and try again." },
        { status: 400 }
      );
    }

    // Check if code is already used
    if (giftCode.used_at || giftCode.used_by) {
      return NextResponse.json(
        { error: "This code has already been used" },
        { status: 400 }
      );
    }

    // Check if code is expired
    if (giftCode.expires_at && new Date(giftCode.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "This code has expired" },
        { status: 400 }
      );
    }

    // Mark the code as used
    const { error: updateError } = await supabase
      .from("gift_codes")
      .update({
        used_at: new Date().toISOString(),
        used_by: user.id,
        quiz_result_id: quizResultId,
      })
      .eq("id", giftCode.id);

    if (updateError) {
      console.error("Error updating gift code:", updateError);
      return NextResponse.json(
        { error: "Failed to redeem code" },
        { status: 500 }
      );
    }

    // Create purchase record
    const { error: purchaseError } = await supabase.from("purchases").insert({
      user_id: user.id,
      quiz_result_id: quizResultId,
      product_type: "full_report",
      amount_cents: 0,
      stripe_payment_id: null,
      status: "completed",
      gift_code_id: giftCode.id,
    });

    if (purchaseError) {
      console.error("Error creating purchase:", purchaseError);
      // Try to revert the gift code update
      await supabase
        .from("gift_codes")
        .update({
          used_at: null,
          used_by: null,
          quiz_result_id: null,
        })
        .eq("id", giftCode.id);

      return NextResponse.json(
        { error: "Failed to complete redemption" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Redeem code API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
