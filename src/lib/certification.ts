import { createClient } from "@/lib/supabase/client";
import { GameProgress, GameAttempt, Badge, Certificate, BadgeType, GameType } from "@/types";
import { gameMetadata, generateCertificateNumber } from "./game-content";

const PASSING_ACCURACY = 80;

// ============================================
// GAME PROGRESS FUNCTIONS
// ============================================

export async function getGameProgress(userId: string): Promise<GameProgress[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("game_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return (data || []).map(transformGameProgress);
}

export async function getGameProgressByType(
  userId: string,
  gameType: GameType
): Promise<GameProgress | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("game_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("game_type", gameType)
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found

  return data ? transformGameProgress(data) : null;
}

export async function updateGameProgress(
  userId: string,
  gameType: GameType,
  score: number,
  totalQuestions: number,
  timeTakenSeconds: number | null,
  answers: Record<string, string | number>
): Promise<{ progress: GameProgress; badgesAwarded: BadgeType[] }> {
  const supabase = createClient();
  const accuracy = (score / totalQuestions) * 100;
  const passed = accuracy >= PASSING_ACCURACY;

  // Record the attempt
  const { error: attemptError } = await supabase.from("game_attempts").insert({
    user_id: userId,
    game_type: gameType,
    score,
    total_questions: totalQuestions,
    accuracy,
    time_taken_seconds: timeTakenSeconds,
    answers,
    passed,
  });

  if (attemptError) throw attemptError;

  // Get or create progress record
  const existing = await getGameProgressByType(userId, gameType);

  let progressData;
  if (existing) {
    // Update if this is a better score
    const shouldUpdate = score > existing.bestScore;
    const { data, error } = await supabase
      .from("game_progress")
      .update({
        attempts: existing.attempts + 1,
        best_score: shouldUpdate ? score : existing.bestScore,
        best_accuracy: shouldUpdate ? accuracy : existing.bestAccuracy,
        passed: existing.passed || passed,
        completed_at: passed && !existing.completedAt ? new Date().toISOString() : existing.completedAt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw error;
    progressData = data;
  } else {
    // Create new progress record
    const { data, error } = await supabase
      .from("game_progress")
      .insert({
        user_id: userId,
        game_type: gameType,
        attempts: 1,
        best_score: score,
        total_questions: totalQuestions,
        best_accuracy: accuracy,
        passed,
        completed_at: passed ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;
    progressData = data;
  }

  // Check for badges to award
  const badgesAwarded = await checkAndAwardBadges(userId, gameType, accuracy, timeTakenSeconds);

  return {
    progress: transformGameProgress(progressData),
    badgesAwarded,
  };
}

// ============================================
// BADGE FUNCTIONS
// ============================================

export async function getUserBadges(userId: string): Promise<Badge[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return (data || []).map(transformBadge);
}

export async function awardBadge(userId: string, badgeType: BadgeType): Promise<Badge | null> {
  const supabase = createClient();

  // Check if already earned
  const { data: existing } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", userId)
    .eq("badge_type", badgeType)
    .single();

  if (existing) return null; // Already has badge

  const { data, error } = await supabase
    .from("badges")
    .insert({
      user_id: userId,
      badge_type: badgeType,
    })
    .select()
    .single();

  if (error) throw error;

  return transformBadge(data);
}

async function checkAndAwardBadges(
  userId: string,
  gameType: GameType,
  accuracy: number,
  timeTakenSeconds: number | null
): Promise<BadgeType[]> {
  const awarded: BadgeType[] = [];

  // Master badges (passing a game)
  if (accuracy >= PASSING_ACCURACY) {
    const masterBadge = `${gameType}_master` as BadgeType;
    const badge = await awardBadge(userId, masterBadge);
    if (badge) awarded.push(masterBadge);
  }

  // Perfect badges (100%)
  if (accuracy === 100) {
    const perfectBadge = `perfect_${gameType}` as BadgeType;
    const badge = await awardBadge(userId, perfectBadge);
    if (badge) awarded.push(perfectBadge);
  }

  // Speed demon (under 2 minutes)
  if (timeTakenSeconds && timeTakenSeconds < 120 && accuracy >= PASSING_ACCURACY) {
    const badge = await awardBadge(userId, "speed_demon");
    if (badge) awarded.push("speed_demon");
  }

  // Check for perfection (all games 100%)
  const progress = await getGameProgress(userId);
  const allPerfect = progress.length === 4 && progress.every((p) => p.bestAccuracy === 100);
  if (allPerfect) {
    const badge = await awardBadge(userId, "perfection");
    if (badge) awarded.push("perfection");
  }

  // Check for certification eligibility
  const allPassed = progress.length === 4 && progress.every((p) => p.passed);
  if (allPassed) {
    const cert = await getCertificate(userId);
    if (!cert) {
      await generateCertificate(userId);
      const badge = await awardBadge(userId, "certified");
      if (badge) awarded.push("certified");
    }
  }

  return awarded;
}

// ============================================
// CERTIFICATE FUNCTIONS
// ============================================

export async function getCertificate(userId: string): Promise<Certificate | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return data ? transformCertificate(data) : null;
}

export async function getCertificateByNumber(certificateNumber: string): Promise<Certificate | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("certificate_number", certificateNumber)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return data ? transformCertificate(data) : null;
}

export async function generateCertificate(userId: string): Promise<Certificate> {
  const supabase = createClient();

  // Get user info
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  // Get user's latest quiz result for their animal type
  const { data: quizResult } = await supabase
    .from("quiz_results")
    .select("primary_type")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Calculate average accuracy across all games
  const progress = await getGameProgress(userId);
  const averageAccuracy =
    progress.reduce((sum, p) => sum + p.bestAccuracy, 0) / progress.length;

  // Get user name from metadata or email
  const userName =
    userData.user.user_metadata?.full_name ||
    userData.user.user_metadata?.name ||
    userData.user.email?.split("@")[0] ||
    "Animal Seller";

  const { data, error } = await supabase
    .from("certificates")
    .insert({
      user_id: userId,
      certificate_number: generateCertificateNumber(),
      user_name: userName,
      primary_animal_type: quizResult?.primary_type || null,
      average_accuracy: averageAccuracy,
    })
    .select()
    .single();

  if (error) throw error;

  return transformCertificate(data);
}

// ============================================
// CERTIFICATION STATUS
// ============================================

export interface CertificationStatus {
  progress: GameProgress[];
  badges: Badge[];
  certificate: Certificate | null;
  completedGames: number;
  totalGames: number;
  isComplete: boolean;
  overallAccuracy: number;
}

export async function getCertificationStatus(userId: string): Promise<CertificationStatus> {
  const [progress, badges, certificate] = await Promise.all([
    getGameProgress(userId),
    getUserBadges(userId),
    getCertificate(userId),
  ]);

  const completedGames = progress.filter((p) => p.passed).length;
  const totalGames = 4;
  const isComplete = completedGames === totalGames;
  const overallAccuracy =
    progress.length > 0
      ? progress.reduce((sum, p) => sum + p.bestAccuracy, 0) / progress.length
      : 0;

  return {
    progress,
    badges,
    certificate,
    completedGames,
    totalGames,
    isComplete,
    overallAccuracy,
  };
}

// ============================================
// TRANSFORM FUNCTIONS (snake_case -> camelCase)
// ============================================

function transformGameProgress(data: Record<string, unknown>): GameProgress {
  return {
    id: data.id as string,
    userId: data.user_id as string,
    gameType: data.game_type as GameType,
    attempts: data.attempts as number,
    bestScore: data.best_score as number,
    totalQuestions: data.total_questions as number,
    bestAccuracy: data.best_accuracy as number,
    passed: data.passed as boolean,
    completedAt: data.completed_at as string | null,
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string,
  };
}

function transformBadge(data: Record<string, unknown>): Badge {
  return {
    id: data.id as string,
    userId: data.user_id as string,
    badgeType: data.badge_type as BadgeType,
    earnedAt: data.earned_at as string,
  };
}

function transformCertificate(data: Record<string, unknown>): Certificate {
  return {
    id: data.id as string,
    userId: data.user_id as string,
    certificateNumber: data.certificate_number as string,
    userName: data.user_name as string,
    primaryAnimalType: data.primary_animal_type as string | null,
    averageAccuracy: data.average_accuracy as number,
    completedAt: data.completed_at as string,
  };
}
