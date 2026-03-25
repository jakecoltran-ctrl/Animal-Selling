"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { animals } from "@/lib/animal-data";
import { createClient } from "@/lib/supabase/client";
import { AnimalType } from "@/types";

interface TeamMember {
  id: string;
  userId: string;
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

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
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

      // Load specific team
      const { data: teamData, error } = await supabase
        .from("teams")
        .select("*, team_members(*)")
        .eq("id", params.id)
        .single();

      if (error || !teamData) {
        router.push("/dashboard/team");
        return;
      }

      // Check if user is a member of this team
      const isMember = teamData.team_members?.some(
        (m: { user_id: string }) => m.user_id === user.id
      );
      const isOwner = teamData.owner_id === user.id;

      if (!isMember && !isOwner) {
        router.push("/dashboard/team");
        return;
      }

      setTeam({
        id: teamData.id,
        name: teamData.name,
        inviteCode: teamData.invite_code,
        ownerId: teamData.owner_id,
        createdAt: teamData.created_at,
        members: (teamData.team_members || []).map((m: { id: string; user_id: string; name: string; email: string; animal_type: AnimalType; joined_at: string }) => ({
          id: m.id,
          userId: m.user_id,
          name: m.name,
          email: m.email,
          animalType: m.animal_type,
          joinedAt: m.joined_at,
        })),
      });

      setLoading(false);
    };

    loadData();
  }, [params.id, router]);

  const handleCopyInvite = async () => {
    if (!team) return;
    await navigator.clipboard.writeText(
      `Join my Animal Selling team! Use code: ${team.inviteCode}`
    );
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  const handleLeaveTeam = async () => {
    if (!team || !userId) return;

    const isOwner = team.ownerId === userId;

    const confirmMessage = isOwner
      ? "You are the team owner. Leaving will delete the entire team. Are you sure?"
      : "Are you sure you want to leave this team?";

    if (!confirm(confirmMessage)) return;

    const supabase = createClient();

    if (isOwner) {
      const { error } = await supabase
        .from("teams")
        .delete()
        .eq("id", team.id);

      if (error) {
        console.error("Failed to delete team:", error);
        alert("Failed to delete team. Please try again.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("team_id", team.id)
        .eq("user_id", userId);

      if (error) {
        console.error("Failed to leave team:", error);
        alert("Failed to leave team. Please try again.");
        return;
      }
    }

    router.push("/dashboard/team");
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
      const missingNames = missing.map(([type]) => animals[type].name);
      insights.push(
        `Your team is missing ${missingNames.join(" and ")} energy. Consider how to fill this gap.`
      );
    }

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

  if (!team) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Team not found</p>
          <Link href="/dashboard/team">
            <Button className="mt-4">Back to Teams</Button>
          </Link>
        </div>
      </div>
    );
  }

  const distribution = getTypeDistribution();
  const insights = getTeamInsights();
  const total = team.members.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link
              href="/dashboard/team"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline mb-2 inline-block"
            >
              ← Back to Teams
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{team.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {team.members.length} team member{team.members.length !== 1 ? "s" : ""}
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
                How your team&apos;s selling styles are distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {(Object.entries(distribution) as [AnimalType, number][]).map(
                  ([type, count]) => {
                    const animal = animals[type];
                    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div
                        key={type}
                        className="text-center p-4 rounded-lg"
                        style={{ backgroundColor: `${animal.color}15` }}
                      >
                        <div className="text-4xl mb-2">{animal.emoji}</div>
                        <div className="text-2xl font-bold" style={{ color: animal.color }}>
                          {percentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {count} {animal.name}{count !== 1 ? "s" : ""}
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
                    const percentage = total > 0 ? (count / total) * 100 : 0;
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
                          <span className="text-white text-sm">{animal.emoji}</span>
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
                    const isLeader = member.userId === team.ownerId;
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{animal.emoji}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{member.name}</p>
                              {isLeader && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-medium">
                                  Leader
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium" style={{ color: animal.color }}>
                            {animal.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{animal.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No team members yet</p>
                  <Button onClick={handleCopyInvite}>Invite Team Members</Button>
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

        {/* Leave Team */}
        <div className="mt-8 max-w-md mx-auto text-center">
          <Button
            variant="ghost"
            onClick={handleLeaveTeam}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            {team.ownerId === userId ? "Delete Team" : "Leave Team"}
          </Button>
        </div>
      </div>
    </div>
  );
}
