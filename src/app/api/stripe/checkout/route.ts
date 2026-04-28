import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Price configuration (in cents)
const PRICES = {
  full_report: 1099, // $10.99
  gift_codes_5: 5000, // $50
  gift_codes_10: 10000, // $100
  gift_codes_20: 20000, // $200
  gift_codes_40: 40000, // $400
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productType, quizResultId, teamId, quantity } = body;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://animalselling.com";

    // Handle full report purchase
    if (productType === "full_report") {
      if (!quizResultId) {
        return NextResponse.json({ error: "Quiz result ID required" }, { status: 400 });
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
        return NextResponse.json({ error: "Already purchased" }, { status: 400 });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Animal Selling™ Full Report",
                description: "17-page personalized sales profile report",
              },
              unit_amount: PRICES.full_report,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${appUrl}/quiz/results/${quizResultId}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/quiz/results/${quizResultId}/upgrade`,
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          quiz_result_id: quizResultId,
          product_type: "full_report",
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // Handle gift codes purchase
    if (productType === "gift_codes") {
      if (!teamId || !quantity) {
        return NextResponse.json({ error: "Team ID and quantity required" }, { status: 400 });
      }

      // Verify user is team owner or co-leader
      const { data: team } = await supabase
        .from("teams")
        .select("owner_id, co_leader_id")
        .eq("id", teamId)
        .single();

      if (!team || (team.owner_id !== user.id && team.co_leader_id !== user.id)) {
        return NextResponse.json({ error: "Not authorized to purchase for this team" }, { status: 403 });
      }

      const priceKey = `gift_codes_${quantity}` as keyof typeof PRICES;
      const price = PRICES[priceKey];

      if (!price) {
        return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Animal Selling™ Gift Codes - ${quantity} Pack`,
                description: `${quantity} gift codes for your team members`,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${appUrl}/dashboard/team/${teamId}/gift-success?session_id={CHECKOUT_SESSION_ID}&quantity=${quantity}`,
        cancel_url: `${appUrl}/dashboard/team/${teamId}`,
        customer_email: user.email,
        metadata: {
          user_id: user.id,
          team_id: teamId,
          quantity: quantity.toString(),
          product_type: "gift_codes",
        },
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ error: "Invalid product type" }, { status: 400 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
