"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBars } from "@/components/results/RadarChart";
import { getAnimal, animals } from "@/lib/animal-data";
import { QuizResult, AnimalType, TeamMember } from "@/types";
import { TeamSafariBubble } from "@/components/ui/TeamSafariLogo";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getPurchasedResultIds } from "@/lib/purchases";
import { syncQuizResults } from "@/lib/quiz-sync";

// Tips content based on animal type
const getRecommendedContent = (animalType: AnimalType) => ({
  growth: {
    title: `Growth Tips for ${getAnimal(animalType).name}s`,
    desc: "5 ways to leverage your strengths",
    tips: animalType === "lion" ? [
      "Practice pausing before responding - let buyers feel heard before you drive to close",
      "Ask 'What else should I know?' before presenting solutions",
      "Celebrate relationship milestones, not just closed deals",
      "Partner with a Retriever or Penguin on complex accounts",
      "Schedule reflection time after lost deals to identify patterns"
    ] : animalType === "penguin" ? [
      "Create a pre-call checklist to ensure you cover key details",
      "Practice summarizing conversations in writing after calls",
      "Set specific next steps with dates, not vague follow-ups",
      "Partner with a Beaver to strengthen your proposals",
      "Channel your energy into listening as much as talking"
    ] : animalType === "retriever" ? [
      "Practice asking for the sale directly - it's not pushy, it's helpful",
      "Set personal deadlines for following up on stalled deals",
      "Prepare 3 closing phrases you feel comfortable using",
      "Partner with a Lion to help push deals across the finish line",
      "Remember: buyers often need you to guide the decision"
    ] : [
      "Lead with the top 3 points, save the deep details for follow-up",
      "Practice your 30-second pitch until it feels natural",
      "Share recommendations, not just data - buyers want your opinion",
      "Partner with a Penguin to bring energy to presentations",
      "Set time limits for research before reaching out to prospects"
    ]
  },
  selling: {
    title: "Selling to Different Types",
    desc: "Adapt your approach for each buyer",
    tips: animalType === "lion" ? [
      "For Lion buyers: Be direct and efficient - they respect confidence",
      "For Penguin buyers: Slow down, build rapport before business",
      "For Retriever buyers: Show patience, don't rush their process",
      "For Beaver buyers: Come prepared with data and proof points",
      "Mirror the buyer's pace - not everyone moves as fast as you"
    ] : animalType === "penguin" ? [
      "For Lion buyers: Get to the point faster, lead with results",
      "For Penguin buyers: Match their energy, share stories and wins",
      "For Retriever buyers: Focus on relationships and team impact",
      "For Beaver buyers: Have specifics ready, avoid overpromising",
      "Read the room - some buyers want less chat, more substance"
    ] : animalType === "retriever" ? [
      "For Lion buyers: Be more direct, they may see patience as hesitation",
      "For Penguin buyers: Match their enthusiasm, share your excitement",
      "For Retriever buyers: Build deep trust, they value authenticity",
      "For Beaver buyers: Provide thorough answers to their questions",
      "Don't mistake urgency for rudeness - Lions just move fast"
    ] : [
      "For Lion buyers: Lead with bottom line, save details for backup",
      "For Penguin buyers: Add warmth and stories to your data",
      "For Retriever buyers: Show you care about their team's success",
      "For Beaver buyers: Go deep on specs, they appreciate your prep",
      "Not everyone needs all the details you have - read their cues"
    ]
  },
  blindspots: {
    title: "Common Blind Spots",
    desc: "What to watch out for",
    tips: animalType === "lion" ? [
      "You may come across as impatient or pushy to slower-paced buyers",
      "Skipping relationship-building can cost you long-term accounts",
      "Your directness may intimidate quieter decision-makers",
      "Not everyone is ready to decide on your timeline",
      "Listening to understand (not just to respond) builds trust"
    ] : animalType === "penguin" ? [
      "Your enthusiasm may overshadow important details buyers need",
      "Following up consistently is as important as the initial connection",
      "Some buyers want data first, rapport second",
      "Talking too much can make buyers feel unheard",
      "Written commitments matter more than verbal agreements"
    ] : animalType === "retriever" ? [
      "Avoiding confrontation can let deals die slowly instead of closing",
      "Being too accommodating may signal lack of confidence",
      "Some buyers interpret patience as lack of urgency",
      "You may stay too long with prospects who won't buy",
      "Asking for the sale is helping, not pressuring"
    ] : [
      "Too much detail can overwhelm and delay decisions",
      "Analysis paralysis can make you miss timing windows",
      "Buyers may see thoroughness as lack of confidence in your recommendation",
      "Not every question needs a perfect answer before moving forward",
      "Warmth and connection matter as much as being right"
    ]
  }
});

interface UserProfile {
  name: string;
  email: string;
}

interface UserTeam {
  id: string;
  name: string;
  memberCount: number;
  members: TeamMember[];
  isOwner: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [userTeams, setUserTeams] = useState<UserTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const supabase = createClient();

      // Get authenticated user
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        router.push("/login");
        return;
      }

      // Check if email is confirmed
      if (!authUser.email_confirmed_at) {
        router.push("/check-email");
        return;
      }

      // Get user's name from metadata or profile
      const userName = authUser.user_metadata?.name || "";
      setUser({
        name: userName,
        email: authUser.email || "",
      });

      // Load and sync quiz results from database and localStorage
      const results = await syncQuizResults();
      setQuizResults(results);

      // Check which results have been purchased
      if (results.length > 0) {
        const resultIds = results.map(r => r.id);
        const purchased = await getPurchasedResultIds(authUser.id, resultIds);
        setPurchasedIds(purchased);
      }

      // Load all user's teams (as owner or member)
      const allTeams: UserTeam[] = [];

      // Get teams user owns
      const { data: ownedTeams } = await supabase
        .from("teams")
        .select("*, team_members(*)")
        .eq("owner_id", authUser.id);

      if (ownedTeams) {
        for (const teamData of ownedTeams) {
          allTeams.push({
            id: teamData.id,
            name: teamData.name,
            memberCount: teamData.team_members?.length || 0,
            members: (teamData.team_members || []).map((m: { id: string; name: string; email: string; animal_type: AnimalType; joined_at: string }) => ({
              id: m.id,
              name: m.name,
              email: m.email,
              animalType: m.animal_type,
              joinedAt: m.joined_at,
            })),
            isOwner: true,
          });
        }
      }

      // Get teams user is a member of (but not owner)
      const { data: memberRecords } = await supabase
        .from("team_members")
        .select("team_id")
        .eq("user_id", authUser.id);

      if (memberRecords) {
        const ownedTeamIds = new Set(allTeams.map(t => t.id));
        for (const record of memberRecords) {
          if (!ownedTeamIds.has(record.team_id)) {
            const { data: teamData } = await supabase
              .from("teams")
              .select("*, team_members(*)")
              .eq("id", record.team_id)
              .single();

            if (teamData) {
              allTeams.push({
                id: teamData.id,
                name: teamData.name,
                memberCount: teamData.team_members?.length || 0,
                members: (teamData.team_members || []).map((m: { id: string; name: string; email: string; animal_type: AnimalType; joined_at: string }) => ({
                  id: m.id,
                  name: m.name,
                  email: m.email,
                  animalType: m.animal_type,
                  joinedAt: m.joined_at,
                })),
                isOwner: false,
              });
            }
          }
        }
      }

      setUserTeams(allTeams);

      setLoading(false);
    };

    loadUserData();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎯</div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const latestResult = quizResults[0];
  const primaryAnimal = latestResult ? getAnimal(latestResult.primaryType) : null;

  return (
    <div className="py-12 relative overflow-hidden min-h-screen">
      <AnimatedBackground opacity={0.15} emojiOpacity={0.1} />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "there"}!
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="press-effect">
            Sign Out
          </Button>
        </div>

        {/* Hero Banner */}
        {primaryAnimal && (
          <div
            className="relative overflow-hidden rounded-2xl mb-8 animate-fade-in"
            style={{
              background: `linear-gradient(135deg, ${primaryAnimal.color}, ${primaryAnimal.color}dd, ${primaryAnimal.color}aa)`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-8 -top-8 text-[200px] opacity-30">
                {primaryAnimal.emoji}
              </div>
            </div>
            <div className="relative z-10 px-8 py-10 flex flex-col md:flex-row items-center gap-6">
              <div
                className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-6xl shadow-xl"
              >
                {primaryAnimal.emoji}
              </div>
              <div className="text-center md:text-left">
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">
                  Your Sales Animal
                </p>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                  You&apos;re a {primaryAnimal.name}
                </h2>
                <p className="text-white/90 text-xl">
                  {primaryAnimal.title} — {primaryAnimal.tagline}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Type Card */}
            {latestResult && primaryAnimal ? (
              <Card className="animate-fade-in delay-100 hover-lift">
                <CardHeader>
                  <CardTitle>Your Sales Animal</CardTitle>
                  <CardDescription>
                    Based on your most recent assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-6xl">{primaryAnimal.emoji}</div>
                    <div>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: primaryAnimal.color }}
                      >
                        {primaryAnimal.name}
                      </h2>
                      <p className="text-muted-foreground">
                        {primaryAnimal.title}
                      </p>
                    </div>
                  </div>
                  {/* Sales Context Pills */}
                  {latestResult.salesContext && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        {latestResult.salesContext.sellType === "product" ? "Product" : "Service"}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        {latestResult.salesContext.customerType.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        {latestResult.salesContext.salesChannel === "inside" ? "Inside Sales" : "Outside Sales"}
                      </span>
                    </div>
                  )}
                  <ScoreBars scores={latestResult.percentages} />
                  <div className="mt-6 flex flex-wrap gap-3">
                    {purchasedIds.has(latestResult.id) ? (
                      <Link href={`/quiz/results/${latestResult.id}/report`}>
                        <Button
                          style={{ backgroundColor: primaryAnimal.color }}
                          className="text-white press-effect"
                        >
                          View Full Report
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/quiz/results/${latestResult.id}/upgrade`}>
                        <Button
                          style={{ backgroundColor: primaryAnimal.color }}
                          className="text-white press-effect"
                        >
                          Unlock Full Report
                        </Button>
                      </Link>
                    )}
                    <Link href={`/quiz/results/${latestResult.id}`}>
                      <Button variant="outline" className="press-effect">View Results Summary</Button>
                    </Link>
                    <Link href={`/animals/${latestResult.primaryType}`}>
                      <Button variant="outline" className="press-effect">
                        Learn About {primaryAnimal.name}s
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Discover Your Sales Animal</CardTitle>
                  <CardDescription>
                    Take the quiz to find out your animal type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🦁🐧🐕🦫</div>
                    <p className="text-muted-foreground mb-6">
                      You haven't taken the quiz yet. Discover your natural
                      selling style in under 5 minutes.
                    </p>
                    <Link href="/quiz">
                      <Button size="lg">Take the Quiz</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quiz History */}
            {quizResults.length > 0 && (
              <Card className="animate-fade-in delay-200">
                <CardHeader>
                  <CardTitle>Quiz History</CardTitle>
                  <CardDescription>
                    Your previous assessment results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizResults.map((result, index) => {
                      const animal = getAnimal(result.primaryType);
                      return (
                        <div
                          key={result.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors hover-lift animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-3xl">{animal.emoji}</span>
                            <div>
                              <p
                                className="font-medium"
                                style={{ color: animal.color }}
                              >
                                {animal.name}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm text-muted-foreground">
                                  {new Date(result.createdAt).toLocaleDateString()}
                                </p>
                                {result.salesContext && (
                                  <>
                                    <span className="text-muted-foreground">·</span>
                                    <span className="text-xs text-muted-foreground">
                                      {result.salesContext.sellType === "product" ? "Product" : "Service"} · {result.salesContext.customerType.toUpperCase()} · {result.salesContext.salesChannel === "inside" ? "Inside" : "Outside"}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 sm:mt-0">
                            {purchasedIds.has(result.id) ? (
                              <Link href={`/quiz/results/${result.id}/report`}>
                                <Button
                                  size="sm"
                                  style={{ backgroundColor: animal.color }}
                                  className="text-white press-effect w-full sm:w-auto"
                                >
                                  View
                                </Button>
                              </Link>
                            ) : (
                              <Link href={`/quiz/results/${result.id}/upgrade`}>
                                <Button
                                  size="sm"
                                  style={{ backgroundColor: animal.color }}
                                  className="text-white press-effect w-full sm:w-auto"
                                >
                                  Unlock
                                </Button>
                              </Link>
                            )}
                            <Link href={`/quiz/results/${result.id}`}>
                              <Button size="sm" variant="outline" className="press-effect w-full sm:w-auto">
                                Summary
                              </Button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="/quiz">
                      <Button variant="outline">Take Quiz Again</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Teams - only show if user has teams */}
            {userTeams.length > 0 && (
              <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-gray-900 animate-fade-in delay-300 hover-lift">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-900 dark:text-white text-lg">Your Team Safaris</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {userTeams.length} team{userTeams.length !== 1 ? "s" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userTeams.map((team) => (
                      <Link key={team.id} href={`/dashboard/team/${team.id}`}>
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 hover:scale-[1.02] transition-all duration-300 cursor-pointer press-effect text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <p className="font-bold text-gray-900 dark:text-white text-lg">{team.name}</p>
                            {team.isOwner && (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                                Leader
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-center gap-1 flex-wrap">
                            {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map((type) => {
                              const count = team.members.filter(m => m.animalType === type).length;
                              if (count === 0) return null;
                              const animal = animals[type];
                              return (
                                <div
                                  key={type}
                                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs"
                                  style={{ backgroundColor: `${animal.color}20`, color: animal.color }}
                                >
                                  <span>{animal.emoji}</span>
                                  <span className="font-medium">{count}</span>
                                </div>
                              );
                            })}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Team Safari - Create or Join */}
            <Card className="border-2 border-gray-200 dark:border-white/20 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 animate-fade-in delay-300 hover-lift">
              <CardHeader className="pb-2">
                <TeamSafariBubble />
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center mt-2">
                  {userTeams.length > 0 ? "Create or join another team" : "Analyze your team's selling styles"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                  {userTeams.length > 0
                    ? "Want to add another team? Create a new one or join with an invite code."
                    : "Create a team and invite members to see how your styles complement each other."
                  }
                </p>
                <Link href="/dashboard/team">
                  <Button
                    className="w-full text-white press-effect"
                    style={{
                      background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)"
                    }}
                  >
                    {userTeams.length > 0 ? "Create or Join Team" : "Explore Team Safari"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recommended Training */}
            {latestResult && primaryAnimal && (
              <Card className="animate-fade-in delay-400 border-2 border-gray-200 dark:border-white/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Recommended for You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(() => {
                    const content = getRecommendedContent(latestResult.primaryType);
                    const items = [
                      { key: "growth", ...content.growth },
                      { key: "selling", ...content.selling },
                      { key: "blindspots", ...content.blindspots },
                    ];
                    return items.map((item, i) => (
                      <div
                        key={item.key}
                        className="border border-gray-200 dark:border-white/20 rounded-lg overflow-hidden animate-fade-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <button
                          onClick={() => setExpandedTip(expandedTip === item.key ? null : item.key)}
                          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-[1.01] transition-all duration-300 text-left"
                        >
                          <div>
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                          </div>
                          {expandedTip === item.key ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedTip === item.key && (
                          <div className="px-3 pb-3 pt-1 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                            <ul className="space-y-2">
                              {item.tips.map((tip, tipIndex) => (
                                <li
                                  key={tipIndex}
                                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                                >
                                  <span
                                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0 mt-0.5"
                                    style={{ backgroundColor: primaryAnimal.color }}
                                  >
                                    {tipIndex + 1}
                                  </span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ));
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card className="animate-fade-in delay-500">
              <CardHeader>
                <CardTitle>Explore Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { href: "/animals/lion", emoji: "🦁", name: "Lion", colorClass: "text-lion-600" },
                    { href: "/animals/penguin", emoji: "🐧", name: "Penguin", colorClass: "text-penguin-600" },
                    { href: "/animals/retriever", emoji: "🐕", name: "Retriever", colorClass: "text-retriever-600" },
                    { href: "/animals/beaver", emoji: "🦫", name: "Beaver", colorClass: "text-beaver-600" },
                  ].map((animal, index) => (
                    <Link key={animal.name} href={animal.href}>
                      <div
                        className="p-3 border rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-2xl">{animal.emoji}</span>
                        <p className={`text-xs font-medium ${animal.colorClass} mt-1`}>
                          {animal.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
