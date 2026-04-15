"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { animals } from "@/lib/animal-data";
import { AnimalIcon } from "@/components/ui/AnimalIcon";
import { createClient } from "@/lib/supabase/client";
import { AnimalType } from "@/types";
import { TeamSafariBubble } from "@/components/ui/TeamSafariLogo";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { fetchQuizResultsFromDB } from "@/lib/quiz-sync";
import { useScrollIntoView } from "@/hooks/useScrollIntoView";

interface SalesContext {
  sellType: "product" | "service";
  customerType: "b2b" | "b2c";
  salesChannel: "inside" | "outside";
}

interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  animalType: AnimalType;
  salesContext?: SalesContext;
  joinedAt: string;
}

interface Team {
  id: string;
  name: string;
  inviteCode: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
  isOwner: boolean;
}

function TeamSafariPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const createFormRef = useRef<HTMLDivElement>(null);
  const { scrollIntoViewOnMobile } = useScrollIntoView();

  // Auto-fill invite code from URL parameter
  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      setInviteCode(codeFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const supabase = createClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUserId(user.id);

    const allTeams: Team[] = [];

    // Get teams user owns
    const { data: ownedTeams } = await supabase
      .from("teams")
      .select("*, team_members(*)")
      .eq("owner_id", user.id);

    if (ownedTeams) {
      for (const teamData of ownedTeams) {
        allTeams.push({
          id: teamData.id,
          name: teamData.name,
          inviteCode: teamData.invite_code,
          ownerId: teamData.owner_id,
          createdAt: teamData.created_at,
          isOwner: true,
          members: (teamData.team_members || []).map((m: { id: string; user_id: string; name: string; email: string; animal_type: AnimalType; sell_type?: string; customer_type?: string; sales_channel?: string; joined_at: string }) => ({
            id: m.id,
            userId: m.user_id,
            name: m.name,
            email: m.email,
            animalType: m.animal_type,
            salesContext: m.sell_type ? {
              sellType: m.sell_type as "product" | "service",
              customerType: m.customer_type as "b2b" | "b2c",
              salesChannel: m.sales_channel as "inside" | "outside",
            } : undefined,
            joinedAt: m.joined_at,
          })),
        });
      }
    }

    // Get teams user is a member of (but not owner)
    const { data: memberRecords } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("user_id", user.id);

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
              inviteCode: teamData.invite_code,
              ownerId: teamData.owner_id,
              createdAt: teamData.created_at,
              isOwner: false,
              members: (teamData.team_members || []).map((m: { id: string; user_id: string; name: string; email: string; animal_type: AnimalType; sell_type?: string; customer_type?: string; sales_channel?: string; joined_at: string }) => ({
                id: m.id,
                userId: m.user_id,
                name: m.name,
                email: m.email,
                animalType: m.animal_type,
                salesContext: m.sell_type ? {
                  sellType: m.sell_type as "product" | "service",
                  customerType: m.customer_type as "b2b" | "b2c",
                  salesChannel: m.sales_channel as "inside" | "outside",
                } : undefined,
                joinedAt: m.joined_at,
              })),
            });
          }
        }
      }
    }

    setTeams(allTeams);
    setLoading(false);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const supabase = createClient();

    // First, check if user has completed a quiz
    const quizResults = await fetchQuizResultsFromDB();

    if (quizResults.length === 0) {
      alert("You need to complete the Animal Selling quiz before creating a team. Let's take you there now!");
      router.push("/quiz");
      return;
    }

    // Sort by date and get the most recent result
    quizResults.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const latestResult = quizResults[0];

    // Verify the quiz result has required data
    if (!latestResult.primaryType || !latestResult.salesContext) {
      alert("Your quiz results appear incomplete. Please retake the quiz to create a team.");
      router.push("/quiz");
      return;
    }

    // Get user info
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "Team Member";
    const userEmail = user.email || "";

    // Use validated quiz data
    const userAnimalType = latestResult.primaryType;
    const userSalesContext = latestResult.salesContext;
    const userQuizResultId = latestResult.id;

    const newInviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create team
    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        invite_code: newInviteCode,
        owner_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create team:", error);
      return;
    }

    // Add creator as team member
    await supabase
      .from("team_members")
      .insert({
        team_id: data.id,
        user_id: userId,
        name: userName,
        email: userEmail,
        animal_type: userAnimalType,
        sell_type: userSalesContext.sellType,
        customer_type: userSalesContext.customerType,
        sales_channel: userSalesContext.salesChannel,
        quiz_result_id: userQuizResultId,
      });

    setShowCreateForm(false);
    setTeamName("");

    // Navigate to the new team
    router.push(`/dashboard/team/${data.id}`);
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !inviteCode.trim()) return;

    setJoining(true);
    const supabase = createClient();

    // First, check if user has completed a quiz
    const quizResults = await fetchQuizResultsFromDB();

    if (quizResults.length === 0) {
      alert("You need to complete the Animal Selling quiz before joining a team. Let's take you there now!");
      setJoining(false);
      router.push("/quiz");
      return;
    }

    // Sort by date and get the most recent result
    quizResults.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const latestResult = quizResults[0];

    // Verify the quiz result has required data
    if (!latestResult.primaryType || !latestResult.salesContext) {
      alert("Your quiz results appear incomplete. Please retake the quiz to join a team.");
      setJoining(false);
      router.push("/quiz");
      return;
    }

    // Find team by invite code
    const { data: teamData, error: teamError } = await supabase
      .from("teams")
      .select("id")
      .eq("invite_code", inviteCode.trim().toUpperCase())
      .single();

    if (teamError || !teamData) {
      alert("Invalid invite code. Please check and try again.");
      setJoining(false);
      return;
    }

    // Check if already a member
    const { data: existingMember } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", teamData.id)
      .eq("user_id", userId)
      .single();

    if (existingMember) {
      alert("You're already a member of this team!");
      setJoining(false);
      router.push(`/dashboard/team/${teamData.id}`);
      return;
    }

    // Get user info
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setJoining(false);
      return;
    }

    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "Team Member";
    const userEmail = user.email || "";

    // Use validated quiz data
    const userAnimalType = latestResult.primaryType;
    const userSalesContext = latestResult.salesContext;
    const userQuizResultId = latestResult.id;

    // Join team
    const { error: joinError } = await supabase
      .from("team_members")
      .insert({
        team_id: teamData.id,
        user_id: userId,
        name: userName,
        email: userEmail,
        animal_type: userAnimalType,
        sell_type: userSalesContext.sellType,
        customer_type: userSalesContext.customerType,
        sales_channel: userSalesContext.salesChannel,
        quiz_result_id: userQuizResultId,
      });

    if (joinError) {
      console.error("Failed to join team:", joinError);
      alert("Failed to join team. Please try again.");
      setJoining(false);
      return;
    }

    setInviteCode("");
    setJoining(false);
    router.push(`/dashboard/team/${teamData.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎯</div>
          <p className="text-muted-foreground">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 relative overflow-hidden">
      <AnimatedBackground opacity={0.2} emojiOpacity={0.15} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <TeamSafariBubble className="mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Analyze your sales team&apos;s style distribution
            </p>
          </div>

          {/* Existing Teams */}
          {teams.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Teams</h2>
              <div className="space-y-3">
                {teams.map((team) => (
                  <Link key={team.id} href={`/dashboard/team/${team.id}`}>
                    <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 hover:border-gray-300 dark:hover:border-white/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-gray-900 dark:text-white">{team.name}</p>
                              {team.isOwner && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-medium">
                                  Leader
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {team.members.length} member{team.members.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 flex-wrap">
                            {(["lion", "penguin", "retriever", "beaver"] as AnimalType[]).map((type) => {
                              const count = team.members.filter(m => m.animalType === type).length;
                              if (count === 0) return null;
                              const animal = animals[type];
                              return (
                                <div
                                  key={type}
                                  className="flex items-center gap-0.5 px-2 py-1 rounded-full text-xs"
                                  style={{ backgroundColor: `${animal.color}20`, color: animal.color }}
                                >
                                  <AnimalIcon type={type} size="sm" variant="head" />
                                  <span className="font-medium">{count}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Join Team */}
          <Card className="mb-6 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-md hover:scale-[1.01] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500" />
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">🎟️</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Join an Existing Team</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Got an invite code? Enter it below to join your team&apos;s safari adventure!
                </p>
              </div>
              <form onSubmit={handleJoinTeam} className="space-y-3">
                <Input
                  placeholder="Enter invite code (e.g., ABC123XY)"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-center text-lg tracking-widest uppercase"
                />
                <Button
                  type="submit"
                  disabled={joining}
                  className="w-full text-white font-semibold"
                  style={{ background: "linear-gradient(to right, #0891b2, #059669)" }}
                >
                  {joining ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining the Safari...
                    </span>
                  ) : (
                    "Join Team 🚀"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Create Team Form */}
          {showCreateForm ? (
            <Card ref={createFormRef} className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Create a New Team</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="teamName" className="text-sm font-medium text-gray-900 dark:text-white">
                      Team Name
                    </label>
                    <Input
                      id="teamName"
                      placeholder="e.g., East Coast Sales Team"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      required
                      className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="text-white" style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}>
                      Create Team
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">➕</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Create a New Team</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Start a new team and invite members to see how your selling styles complement each other.
                </p>
                <Button
                  onClick={() => {
                    setShowCreateForm(true);
                    setTimeout(() => scrollIntoViewOnMobile(createFormRef.current), 50);
                  }}
                  className="text-white"
                  style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  Create a Team
                </Button>
              </CardContent>
            </Card>
          )}

          {/* What is Team Safari™ - Explainer Section */}
          <div className="mt-10 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🌍</span> What is Team Safari™?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Team Safari™ helps you understand your sales team&apos;s collective personality.
              By mapping each member&apos;s animal type, you can see how your team&apos;s strengths
              complement each other and identify potential gaps.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold text-white text-sm mb-1">Team Composition</h3>
                <p className="text-gray-400 text-xs">
                  See the distribution of Lions, Penguins, Retrievers, and Beavers on your team.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-2">🤝</div>
                <h3 className="font-semibold text-white text-sm mb-1">Better Collaboration</h3>
                <p className="text-gray-400 text-xs">
                  Understand how different styles work together and where friction might occur.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-white text-sm mb-1">Strategic Pairing</h3>
                <p className="text-gray-400 text-xs">
                  Get recommendations on which team members pair well for different sales scenarios.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <span>⚡</span> How it works
              </h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">1</span>
                  <span><strong className="text-white">Create a team</strong> and get a unique invite code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">2</span>
                  <span><strong className="text-white">Share the code</strong> with your team members</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">3</span>
                  <span><strong className="text-white">View insights</strong> about your team&apos;s style distribution and dynamics</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSafariPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎯</div>
          <p className="text-muted-foreground">Loading teams...</p>
        </div>
      </div>
    }>
      <TeamSafariPageContent />
    </Suspense>
  );
}
