import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function generateGiftCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status !== "paid") {
          break;
        }

        const productType = session.metadata?.product_type;
        const userId = session.metadata?.user_id;

        if (!userId) {
          console.error("No user_id in session metadata");
          break;
        }

        if (productType === "full_report") {
          const quizResultId = session.metadata?.quiz_result_id;

          if (!quizResultId) {
            console.error("No quiz_result_id in session metadata");
            break;
          }

          // Check if already recorded (idempotency)
          const { data: existingPurchase } = await supabase
            .from("purchases")
            .select("id")
            .eq("stripe_payment_id", session.payment_intent as string)
            .single();

          if (existingPurchase) {
            break;
          }

          // Record the purchase
          const { error: purchaseError } = await supabase.from("purchases").insert({
            user_id: userId,
            quiz_result_id: quizResultId,
            product_type: "full_report",
            amount_cents: session.amount_total || 1099,
            stripe_payment_id: session.payment_intent as string,
            status: "completed",
          });

          if (purchaseError) {
            console.error("Error recording purchase:", purchaseError);
          }
        } else if (productType === "gift_codes") {
          const teamId = session.metadata?.team_id;
          const quantity = parseInt(session.metadata?.quantity || "0");

          if (!teamId || !quantity) {
            console.error("Missing team_id or quantity in metadata");
            break;
          }

          // Check if already recorded (idempotency)
          const { data: existingCodes } = await supabase
            .from("gift_codes")
            .select("id")
            .eq("stripe_payment_id", session.payment_intent as string)
            .limit(1);

          if (existingCodes && existingCodes.length > 0) {
            break;
          }

          // Generate gift codes
          const codeRecords = [];
          for (let i = 0; i < quantity; i++) {
            codeRecords.push({
              code: generateGiftCode(),
              team_id: teamId,
              created_by: userId,
              stripe_payment_id: session.payment_intent as string,
            });
          }

          const { error: codesError } = await supabase
            .from("gift_codes")
            .insert(codeRecords);

          if (codesError) {
            console.error("Error generating gift codes:", codesError);
          }
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
