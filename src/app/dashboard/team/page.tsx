"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { animals } from "@/lib/animal-data";
import { createClient } from "@/lib/supabase/client";
import { AnimalType } from "@/types";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  animalType: AnimalType;
  joinedAt: string;
}

interface Team {
  id: string;
  name: string;
  inviteCode: string;
  ownerId: string;
  members: TeamMember[];
  createdAt: string;
}

// Demo team data
const demoTeam: Team = {
  id: "demo-team-1",
  name: "Sales Dream Team",
  inviteCode: "SAFARI2024",
  ownerId: "demo",
  createdAt: new Date().toISOString(),
  members: [
    {
      id: "1",
      name: "Sarah K.",
      email: "sarah@example.com",
      animalType: "lion",
      joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      name: "Marcus T.",
      email: "marcus@example.com",
      animalType: "penguin",
      joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      name: "Jennifer L.",
      email: "jennifer@example.com",
      animalType: "retriever",
      joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      name: "David C.",
      email: "david@example.com",
      animalType: "beaver",
      joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      name: "Emily R.",
      email: "emily@example.com",
      animalType: "penguin",
      joinedAt: new Date().toISOString(),
    },
  ],
};

export default function TeamSafariPage() {
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();

      // Check auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.id);

      // Load team from Supabase
      const { data: teams } = await supabase
        .from("teams")
        .select("*, team_members(*)")
        .eq("owner_id", user.id)
        .limit(1);

      if (teams && teams.length > 0) {
        const teamData = teams[0];
        setTeam({
          id: teamData.id,
          name: teamData.name,
          inviteCode: teamData.invite_code,
          ownerId: teamData.owner_id,
          createdAt: teamData.created_at,
          members: (teamData.team_members || []).map((m: { id: string; name: string; email: string; animal_type: AnimalType; joined_at: string }) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            animalType: m.animal_type,
            joinedAt: m.joined_at,
          })),
        });
      }

      setLoading(false);
    };

    loadData();
  }, [router]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const supabase = createClient();

    // Get user info
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "Team Member";
    const userEmail = user.email || "";

    // Get user's latest quiz result for their animal type
    let userAnimalType: AnimalType = "lion"; // fallback
    const quizResults: { createdAt: string; primaryType: AnimalType }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("quiz_result_")) {
        const result = localStorage.getItem(key);
        if (result) {
          const parsed = JSON.parse(result);
          quizResults.push({ createdAt: parsed.createdAt, primaryType: parsed.primaryType });
        }
      }
    }
    // Sort by date and get most recent
    if (quizResults.length > 0) {
      quizResults.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      userAnimalType = quizResults[0].primaryType;
    }

    const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create team
    const { data, error } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        invite_code: inviteCode,
        owner_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create team:", error);
      return;
    }

    // Add creator as team member
    const { data: memberData, error: memberError } = await supabase
      .from("team_members")
      .insert({
        team_id: data.id,
        user_id: userId,
        name: userName,
        email: userEmail,
        animal_type: userAnimalType,
      })
      .select()
      .single();

    if (memberError) {
      console.error("Failed to add creator as member:", memberError);
    }

    // Set team state with creator as first member
    setTeam({
      id: data.id,
      name: data.name,
      inviteCode: data.invite_code,
      ownerId: data.owner_id,
      members: memberData ? [{
        id: memberData.id,
        name: memberData.name,
        email: memberData.email,
        animalType: memberData.animal_type,
        joinedAt: memberData.joined_at,
      }] : [],
      createdAt: data.created_at,
    });
    setShowCreateForm(false);
    setTeamName("");
  };

  const handleLoadDemo = () => {
    setTeam(demoTeam);
  };

  const handleCopyInvite = async () => {
    if (!team) return;
    await navigator.clipboard.writeText(
      `Join my Animal Selling team! Use code: ${team.inviteCode}`
    );
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  const getTypeDistribution = (): Record<AnimalType, number> => {
    const distribution: Record<AnimalType, number> = {
      lion: 0,
      penguin: 0,
      retriever: 0,
      beaver: 0,
    };
    if (!team) return distribution;
    team.members.forEach((member) => {
      distribution[member.animalType]++;
    });
    return distribution;
  };

  const getTeamInsights = () => {
    if (!team || team.members.length === 0) return null;

    const distribution = getTypeDistribution();
    const total = team.members.length;
    const insights: string[] = [];

    // Find dominant and missing types
    const entries = Object.entries(distribution) as [AnimalType, number][];
    const sorted = entries.sort(([, a], [, b]) => b - a);
    const dominant = sorted[0];
    const missing = sorted.filter(([, count]) => count === 0);

    if (dominant[1] / total > 0.4) {
      const animal = animals[dominant[0]];
      insights.push(
        `Your team is ${animal.name}-heavy (${Math.round((dominant[1] / total) * 100)}%). Consider how this affects your sales approach.`
      );
    }

    if (missing.length > 0) {
      const missingNames = missing.map(
        ([type]) => animals[type].name
      );
      insights.push(
        `Your team is missing ${missingNames.join(
          " and "
        )} energy. Consider how to fill this gap.`
      );
    }

    // Pairing suggestions
    if (distribution.lion > 0 && distribution.beaver > 0) {
      insights.push(
        "Lions and Beavers make great pairs — Lions drive the close while Beavers provide the data."
      );
    }
    if (distribution.penguin > 0 && distribution.retriever > 0) {
      insights.push(
        "Penguins and Retrievers complement each other — Penguins open doors while Retrievers nurture relationships."
      );
    }

    return insights;
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🎯</div>
          <p className="text-muted-foreground">Loading team...</p>
        </div>
      </div>
    );
  }

  // No team yet
  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4">🦁🐧🐕🦫</div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Team Safari</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Analyze your sales team's style distribution
              </p>
            </div>

            {showCreateForm ? (
              <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Create Your Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateTeam} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="teamName"
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
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
                      <Button type="submit">Create Team</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCreateForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="text-center py-12 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
                  <CardContent>
                    <div className="text-6xl mb-6">🦁🐧🐕🦫</div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Create or Join a Team
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                      See how your team's selling styles complement each other.
                      Identify gaps and optimize pairings.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button
                        onClick={() => setShowCreateForm(true)}
                        className="text-white"
                        style={{
                          background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)"
                        }}
                      >
                        Create a Team
                      </Button>
                      <Button variant="outline" onClick={handleLoadDemo} className="border-gray-300 dark:border-gray-600">
                        Load Demo Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Join an Existing Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Input placeholder="Enter invite code" className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600" />
                      <Button variant="outline" className="border-gray-300 dark:border-gray-600">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Team exists - show dashboard
  const distribution = getTypeDistribution();
  const insights = getTeamInsights();
  const total = team.members.length;
  const isDemo = team.id === "demo-team-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Demo Notice */}
        {isDemo && (
          <div className="mb-6 p-4 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-200">
                  This is a Demo Team
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  This example shows how Team Safari works. Create your own team to invite real members and see your actual team dynamics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline mb-2 inline-block"
            >
              ← Back to Profile
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{team.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {team.members.length} team members
            </p>
          </div>
          <Button
            onClick={handleCopyInvite}
            className="text-white"
            style={{
              background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)"
            }}
          >
            {inviteCopied ? "Copied!" : "Copy Invite Link"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Distribution */}
          <Card className="lg:col-span-2 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Team Style Distribution</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                How your team's selling styles are distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {(Object.entries(distribution) as [AnimalType, number][]).map(
                  ([type, count]) => {
                    const animal = animals[type];
                    const percentage =
                      total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div
                        key={type}
                        className="text-center p-4 rounded-lg"
                        style={{ backgroundColor: `${animal.color}15` }}
                      >
                        <div className="text-4xl mb-2">{animal.emoji}</div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: animal.color }}
                        >
                          {percentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {count} {animal.name}
                          {count !== 1 ? "s" : ""}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Visual bar */}
              <div className="h-8 rounded-full overflow-hidden flex">
                {(Object.entries(distribution) as [AnimalType, number][]).map(
                  ([type, count]) => {
                    if (count === 0) return null;
                    const animal = animals[type];
                    const percentage =
                      total > 0 ? (count / total) * 100 : 0;
                    return (
                      <div
                        key={type}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: animal.color,
                        }}
                        className="flex items-center justify-center"
                      >
                        {percentage >= 15 && (
                          <span className="text-white text-sm">
                            {animal.emoji}
                          </span>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Team Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {insights && insights.length > 0 ? (
                <ul className="space-y-4">
                  {insights.map((insight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="mt-1">💡</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Add team members to see insights
                </p>
              )}
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card className="lg:col-span-2 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              {team.members.length > 0 ? (
                <div className="space-y-3">
                  {team.members.map((member) => {
                    const animal = animals[member.animalType];
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{animal.emoji}</span>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className="font-medium"
                            style={{ color: animal.color }}
                          >
                            {animal.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {animal.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No team members yet
                  </p>
                  <Button onClick={handleCopyInvite}>
                    Invite Team Members
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pairing Recommendations */}
          <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Recommended Pairings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🦁</span>
                    <span className="font-medium text-gray-900 dark:text-white">+</span>
                    <span>🦫</span>
                    <span className="text-sm font-medium ml-2 text-gray-900 dark:text-white">
                      Closer + Specialist
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Lion drives, Beaver proves
                  </p>
                </div>
                <div className="p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🐧</span>
                    <span className="font-medium text-gray-900 dark:text-white">+</span>
                    <span>🐕</span>
                    <span className="text-sm font-medium ml-2 text-gray-900 dark:text-white">
                      Connector + Advisor
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Penguin opens, Retriever nurtures
                  </p>
                </div>
                <div className="p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🦁</span>
                    <span className="font-medium text-gray-900 dark:text-white">+</span>
                    <span>🐧</span>
                    <span className="text-sm font-medium ml-2 text-gray-900 dark:text-white">
                      Closer + Connector
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    High-energy deal drivers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invite Code */}
        <Card className="mt-8 max-w-md mx-auto border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-gray-900 dark:text-white">Invite Code</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Share this code with team members
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-white/20">
              <code className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                {team.inviteCode}
              </code>
            </div>
            <Button
              onClick={handleCopyInvite}
              className="w-full text-white"
              style={{
                background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)"
              }}
            >
              {inviteCopied ? "Copied!" : "Copy Invite Link"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
