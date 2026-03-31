import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    // Verify the session belongs to this user
    if (session.metadata?.user_id !== user.id) {
      return NextResponse.json({ error: "Session does not belong to user" }, { status: 403 });
    }

    const productType = session.metadata?.product_type;

    // Handle full report purchase
    if (productType === "full_report") {
      const quizResultId = session.metadata?.quiz_result_id;

      if (!quizResultId) {
        return NextResponse.json({ error: "Quiz result ID missing" }, { status: 400 });
      }

      // Check if already recorded (idempotency)
      const { data: existingPurchase } = await supabase
        .from("purchases")
        .select("id")
        .eq("stripe_payment_id", session.payment_intent as string)
        .single();

      if (existingPurchase) {
        // Already processed, just return success
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          quizResultId
        });
      }

      // Record the purchase
      const { error: purchaseError } = await supabase.from("purchases").insert({
        user_id: user.id,
        quiz_result_id: quizResultId,
        product_type: "full_report",
        amount_cents: session.amount_total || 1900,
        stripe_payment_id: session.payment_intent as string,
        status: "completed",
      });

      if (purchaseError) {
        console.error("Purchase recording error:", purchaseError);
        return NextResponse.json({ error: "Failed to record purchase" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        quizResultId,
        productType: "full_report"
      });
    }

    // Handle gift codes purchase
    if (productType === "gift_codes") {
      const teamId = session.metadata?.team_id;
      const quantity = parseInt(session.metadata?.quantity || "0");

      if (!teamId || !quantity) {
        return NextResponse.json({ error: "Team ID or quantity missing" }, { status: 400 });
      }

      // Check if already recorded (idempotency)
      const { data: existingCodes } = await supabase
        .from("gift_codes")
        .select("id")
        .eq("stripe_payment_id", session.payment_intent as string)
        .limit(1);

      if (existingCodes && existingCodes.length > 0) {
        // Already processed, fetch the codes
        const { data: codes } = await supabase
          .from("gift_codes")
          .select("code")
          .eq("stripe_payment_id", session.payment_intent as string);

        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          codes: codes?.map(c => c.code) || [],
          teamId
        });
      }

      // Generate gift codes
      const codes: string[] = [];
      const codeRecords = [];

      for (let i = 0; i < quantity; i++) {
        const code = generateGiftCode();
        codes.push(code);
        codeRecords.push({
          code,
          team_id: teamId,
          created_by: user.id,
          stripe_payment_id: session.payment_intent as string,
        });
      }

      const { error: codesError } = await supabase
        .from("gift_codes")
        .insert(codeRecords);

      if (codesError) {
        console.error("Gift codes error:", codesError);
        return NextResponse.json({ error: "Failed to generate codes" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        codes,
        teamId,
        productType: "gift_codes"
      });
    }

    return NextResponse.json({ error: "Unknown product type" }, { status: 400 });
  } catch (error) {
    console.error("Stripe verification error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}

function generateGiftCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing chars like 0, O, 1, I
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
