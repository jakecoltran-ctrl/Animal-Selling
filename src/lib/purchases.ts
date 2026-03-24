import { createClient } from "@/lib/supabase/client";

export interface Purchase {
  id: string;
  user_id: string;
  quiz_result_id: string;
  product_type: string;
  amount_cents: number;
  stripe_payment_id: string | null;
  status: string;
  created_at: string;
}

/**
 * Check if a user has purchased a specific report
 */
export async function checkPurchaseStatus(
  userId: string,
  quizResultId: string
): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("quiz_result_id", quizResultId)
    .eq("status", "completed")
    .single();

  if (error) {
    // No purchase found or other error
    return false;
  }

  return !!data;
}

/**
 * Get all purchases for a user
 */
export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching purchases:", error);
    return [];
  }

  return data || [];
}

/**
 * Check if user has purchased any of the given quiz result IDs
 * Returns a Set of purchased quiz result IDs for efficient lookup
 */
export async function getPurchasedResultIds(
  userId: string,
  quizResultIds: string[]
): Promise<Set<string>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("purchases")
    .select("quiz_result_id")
    .eq("user_id", userId)
    .eq("status", "completed")
    .in("quiz_result_id", quizResultIds);

  if (error) {
    console.error("Error fetching purchases:", error);
    return new Set();
  }

  return new Set(data?.map((p) => p.quiz_result_id) || []);
}

/**
 * Record a new purchase (called from API route after payment)
 */
export async function recordPurchase(
  userId: string,
  quizResultId: string,
  stripePaymentId?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase.from("purchases").insert({
    user_id: userId,
    quiz_result_id: quizResultId,
    product_type: "full_report",
    amount_cents: 499,
    stripe_payment_id: stripePaymentId || null,
    status: "completed",
  });

  if (error) {
    console.error("Error recording purchase:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
