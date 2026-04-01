"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { animals } from "@/lib/animal-data";
import { createClient } from "@/lib/supabase/client";
import { AnimalType } from "@/types";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

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
  quizResultId?: string;
  hasPurchasedReport?: boolean;
}

interface Team {
  id: string;
  name: string;
  inviteCode: string;
  ownerId: string;
  coLeaderId: string | null;
  members: TeamMember[];
  createdAt: string;
}

interface GiftCode {
  id: string;
  code: string;
  createdAt: string;
  usedAt: string | null;
  usedBy: string | null;
}

const CODE_PACKAGES = [
  { quantity: 5, price: 50 },
  { quantity: 10, price: 100 },
  { quantity: 20, price: 200 },
  { quantity: 40, price: 400 },
];

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(false);
  const [purchasingCodes, setPurchasingCodes] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [showAllCodes, setShowAllCodes] = useState(false);

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

      // Get quiz result IDs of all team members to check purchase status
      const memberQuizResultIds = (teamData.team_members || [])
        .map((m: { quiz_result_id?: string }) => m.quiz_result_id)
        .filter((id: string | undefined): id is string => !!id);

      // Fetch purchase status for team members' specific quiz results
      let purchasedQuizResultIds = new Set<string>();
      if (memberQuizResultIds.length > 0) {
        const { data: purchases } = await supabase
          .from("purchases")
          .select("quiz_result_id")
          .in("quiz_result_id", memberQuizResultIds)
          .eq("status", "completed");

        purchasedQuizResultIds = new Set(purchases?.map(p => p.quiz_result_id).filter((id): id is string => !!id) || []);
      }

      setTeam({
        id: teamData.id,
        name: teamData.name,
        inviteCode: teamData.invite_code,
        ownerId: teamData.owner_id,
        coLeaderId: teamData.co_leader_id || null,
        createdAt: teamData.created_at,
        members: (teamData.team_members || []).map((m: { id: string; user_id: string; name: string; email: string; animal_type: AnimalType; sell_type?: string; customer_type?: string; sales_channel?: string; joined_at: string; quiz_result_id?: string }) => ({
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
          quizResultId: m.quiz_result_id,
          hasPurchasedReport: m.quiz_result_id ? purchasedQuizResultIds.has(m.quiz_result_id) : false,
        })),
      });

      setLoading(false);

      // Load gift codes if user is owner or co-leader
      if (teamData.owner_id === user.id || teamData.co_leader_id === user.id) {
        loadGiftCodes();
      }
    };

    loadData();
  }, [params.id, router]);

  const isLeader = team?.ownerId === userId || team?.coLeaderId === userId;
  const isOwner = team?.ownerId === userId;

  const loadGiftCodes = async () => {
    setLoadingCodes(true);
    try {
      const response = await fetch(`/api/team-gift-codes?teamId=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setGiftCodes(data.codes || []);
      }
    } catch (error) {
      console.error("Failed to load gift codes:", error);
    }
    setLoadingCodes(false);
  };

  const handlePurchaseCodes = async (quantity: number, price: number) => {
    setPurchasingCodes(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productType: "gift_codes",
          teamId: params.id,
          quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout. Please try again.");
        setPurchasingCodes(false);
      }
    } catch (error) {
      console.error("Failed to start checkout:", error);
      alert("Something went wrong. Please try again.");
      setPurchasingCodes(false);
    }
  };

  const handleCopyCode = async (code: string, codeId: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCodeId(codeId);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleDeleteCode = async (codeId: string) => {
    if (!confirm("Remove this used code from your list?")) return;

    try {
      const response = await fetch(`/api/team-gift-codes?codeId=${codeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGiftCodes(giftCodes.filter(c => c.id !== codeId));
      } else {
        alert("Failed to delete code. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete code:", error);
      alert("Failed to delete code. Please try again.");
    }
  };

  const handleKickMember = async (memberId: string, memberName: string) => {
    if (!team || !isLeader) return;

    if (!confirm(`Are you sure you want to remove ${memberName} from the team?`)) return;

    const supabase = createClient();

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", memberId);

    if (error) {
      console.error("Failed to remove member:", error);
      alert("Failed to remove member. Please try again.");
      return;
    }

    // Update local state
    setTeam({
      ...team,
      members: team.members.filter((m) => m.id !== memberId),
    });
  };

  const handlePromoteToCoLeader = async (memberUserId: string, memberName: string) => {
    if (!team || !isOwner) return;

    const action = team.coLeaderId === memberUserId ? "remove" : "promote";
    const confirmMessage = action === "promote"
      ? `Promote ${memberName} to Co-Leader? They will be able to manage team members and view gift codes.`
      : `Remove ${memberName} as Co-Leader?`;

    if (!confirm(confirmMessage)) return;

    const supabase = createClient();

    const newCoLeaderId = action === "promote" ? memberUserId : null;

    const { error } = await supabase
      .from("teams")
      .update({ co_leader_id: newCoLeaderId })
      .eq("id", team.id);

    if (error) {
      console.error("Failed to update co-leader:", error);
      alert("Failed to update co-leader. Please try again.");
      return;
    }

    // Update local state
    setTeam({
      ...team,
      coLeaderId: newCoLeaderId,
    });
  };

  const handleCopyInvite = async () => {
    if (!team) return;
    const inviteUrl = `${window.location.origin}/dashboard/team?code=${team.inviteCode}`;
    await navigator.clipboard.writeText(
      `Join my Animal Selling team "${team.name}"! Click here to join: ${inviteUrl}`
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
    <div className="min-h-screen bg-gray-950 py-12 relative overflow-hidden">
      <AnimatedBackground opacity={0.2} emojiOpacity={0.15} />
      <div className="container mx-auto px-4 relative z-10">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Hero Banner */}
        <div
          className="relative overflow-hidden rounded-2xl mb-8"
          style={{
            background: "linear-gradient(135deg, #dc2626, #d97706, #0891b2, #059669)",
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-8 -top-8 text-[200px] opacity-30">
              🦁
            </div>
          </div>
          <div className="relative z-10 px-8 py-10 flex flex-col md:flex-row items-center gap-6">
            <div
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-5xl shadow-xl"
            >
              🦁🐧🐕🦫
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">
                Team Safari
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                {team.name}
              </h2>
              <p className="text-white/90 text-xl">
                {team.members.length} team member{team.members.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              onClick={handleCopyInvite}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 border"
            >
              {inviteCopied ? "Copied!" : "Copy Invite Link"}
            </Button>
          </div>
        </div>

        {/* Current User Info */}
        {(() => {
          const currentMember = team.members.find(m => m.userId === userId);
          if (!currentMember) return null;
          const userAnimal = animals[currentMember.animalType];
          return (
            <div
              className="mb-8 p-4 rounded-xl border-2 flex items-center gap-4"
              style={{
                backgroundColor: `${userAnimal.color}10`,
                borderColor: `${userAnimal.color}40`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${userAnimal.color}20` }}
              >
                {userAnimal.emoji}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">You</p>
                <p className="font-bold text-gray-900 dark:text-white">{currentMember.name}</p>
                {currentMember.salesContext && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {currentMember.salesContext.sellType === "product" ? "Product" : "Service"} · {currentMember.salesContext.customerType.toUpperCase()} · {currentMember.salesContext.salesChannel === "inside" ? "Inside" : "Outside"}
                  </p>
                )}
              </div>
              <div className="ml-auto text-right">
                <p className="font-medium" style={{ color: userAnimal.color }}>{userAnimal.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{userAnimal.title}</p>
              </div>
            </div>
          );
        })()}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Distribution */}
          <Card className="lg:col-span-2 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-lg">
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
          <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-lg">
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
          <Card className="lg:col-span-2 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              {team.members.length > 0 ? (
                <div className="space-y-3">
                  {team.members.map((member) => {
                    const animal = animals[member.animalType];
                    const isMemberOwner = member.userId === team.ownerId;
                    const isMemberCoLeader = member.userId === team.coLeaderId;
                    const isCurrentUser = member.userId === userId;
                    const canManage = isLeader && !isMemberOwner && !isCurrentUser;
                    const canPromote = isOwner && !isMemberOwner && !isCurrentUser;

                    return (
                      <div
                        key={member.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-[1.01] gap-3 sm:gap-0"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="text-xl sm:text-2xl">{animal.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <p className="font-medium text-sm sm:text-base">{member.name}</p>
                              {isMemberOwner && (
                                <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-medium">
                                  Leader
                                </span>
                              )}
                              {isMemberCoLeader && (
                                <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-medium">
                                  Co-Leader
                                </span>
                              )}
                              {member.hasPurchasedReport ? (
                                <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-medium" title="Has full report access">
                                  ✓ Report
                                </span>
                              ) : (
                                <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium" title="Has not purchased full report">
                                  No Report
                                </span>
                              )}
                            </div>
                            {isLeader && <p className="text-xs sm:text-sm text-muted-foreground truncate">{member.email}</p>}
                            {member.salesContext && (
                              <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                                {member.salesContext.sellType === "product" ? "Product" : "Service"} · {member.salesContext.customerType.toUpperCase()} · {member.salesContext.salesChannel === "inside" ? "Inside" : "Outside"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pl-8 sm:pl-0">
                          <div className="text-left sm:text-right">
                            <p className="font-medium text-sm sm:text-base" style={{ color: animal.color }}>
                              {animal.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{animal.title}</p>
                          </div>
                          {/* Management buttons */}
                          {(canManage || canPromote) && (
                            <div className="flex items-center gap-1 ml-auto sm:ml-2">
                              {canPromote && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handlePromoteToCoLeader(member.userId, member.name)}
                                  className={`text-xs px-2 ${isMemberCoLeader ? "text-cyan-600 hover:text-cyan-700" : "text-gray-500 hover:text-cyan-600"}`}
                                  title={isMemberCoLeader ? "Remove Co-Leader" : "Promote to Co-Leader"}
                                >
                                  {isMemberCoLeader ? "👑" : "⬆️"}
                                </Button>
                              )}
                              {canManage && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleKickMember(member.id, member.name)}
                                  className="text-xs px-2 text-gray-500 hover:text-red-600"
                                  title="Remove from team"
                                >
                                  ✕
                                </Button>
                              )}
                            </div>
                          )}
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
          <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Recommended Pairings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
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
                <div className="p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
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
                <div className="p-3 border border-gray-200 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
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

        {/* Invite Code & Onboard Your Team */}
        <div className={`mt-8 max-w-6xl mx-auto grid ${isLeader ? "md:grid-cols-3" : "grid-cols-1 max-w-md"} gap-6`}>
          <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
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

          {/* Leader Privileges - Leaders Only */}
          {isLeader && (
            <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <CardHeader className="text-center">
                <CardTitle className="text-gray-900 dark:text-white flex items-center justify-center gap-2">
                  <span>👑</span> Leader Privileges
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  What you can do as a team leader
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>View member email addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Remove members from the team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Promote members to Co-Leader</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>Purchase & manage gift codes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Gift Codes Info - Leaders Only */}
          {isLeader && (
            <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <CardHeader className="text-center">
                <CardTitle className="text-gray-900 dark:text-white flex items-center justify-center gap-2">
                  <span>🎁</span> Onboard Your Team
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Give your team free report access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">💡</span>
                    <span>Buy in bulk to share with your team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">💡</span>
                    <span>Codes never expire until used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">💡</span>
                    <span>Purchase options below</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Gift Codes Section - Only visible to team leader or co-leader */}
        {isLeader && (
          <div className="mt-8 max-w-4xl mx-auto">
            {/* Leader-only notice */}
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2">
              <span>👑</span>
              <span>Only team leaders can view and purchase gift codes for team members</span>
            </div>
            <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🎁</span> Unlock Full Report Codes for Your Team
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Purchase gift codes to give your team members free access to their full reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Purchase Packages */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Purchase Code Packages
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CODE_PACKAGES.map((pkg) => (
                      <div
                        key={pkg.quantity}
                        className="border border-gray-200 dark:border-white/20 rounded-xl p-4 text-center hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300 cursor-pointer"
                        onClick={() => !purchasingCodes && handlePurchaseCodes(pkg.quantity, pkg.price)}
                      >
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          {pkg.quantity}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">codes</div>
                        <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                          ${pkg.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  {purchasingCodes && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                      Processing purchase...
                    </p>
                  )}
                </div>

                {/* Existing Codes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Your Codes ({giftCodes.filter(c => !c.usedAt).length} available, {giftCodes.filter(c => c.usedAt).length} used)
                    </h3>
                    {giftCodes.length > 5 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllCodes(!showAllCodes)}
                        className="text-xs"
                      >
                        {showAllCodes ? "Show Less" : `Show All (${giftCodes.length})`}
                      </Button>
                    )}
                  </div>

                  {loadingCodes ? (
                    <div className="text-center py-8">
                      <div className="text-2xl animate-spin mb-2">🎁</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Loading codes...</p>
                    </div>
                  ) : giftCodes.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-gray-300 dark:border-white/20 rounded-xl">
                      <div className="text-3xl mb-2">🎟️</div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No gift codes yet. Purchase a package above to get started.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(showAllCodes ? giftCodes : giftCodes.slice(0, 5)).map((code) => (
                        <div
                          key={code.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            code.usedAt
                              ? "bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-white/10 opacity-60"
                              : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={code.usedAt ? "text-gray-400" : "text-green-500"}>
                              {code.usedAt ? "✓" : "🎁"}
                            </span>
                            <code className={`font-mono font-bold ${code.usedAt ? "text-gray-400 line-through" : "text-gray-900 dark:text-white"}`}>
                              {code.code}
                            </code>
                          </div>
                          <div className="flex items-center gap-2">
                            {code.usedAt ? (
                              <>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Used {new Date(code.usedAt).toLocaleDateString()}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteCode(code.id)}
                                  className="text-xs px-2 text-gray-400 hover:text-red-500"
                                  title="Remove from list"
                                >
                                  ✕
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyCode(code.code, code.id)}
                                className="text-xs"
                              >
                                {copiedCodeId === code.id ? "Copied!" : "Copy"}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
