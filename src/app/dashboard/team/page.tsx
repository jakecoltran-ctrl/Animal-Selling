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
  isOwner: boolean;
}

export default function TeamSafariPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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
          members: (teamData.team_members || []).map((m: { id: string; user_id: string; name: string; email: string; animal_type: AnimalType; joined_at: string }) => ({
            id: m.id,
            userId: m.user_id,
            name: m.name,
            email: m.email,
            animalType: m.animal_type,
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
              members: (teamData.team_members || []).map((m: { id: string; user_id: string; name: string; email: string; animal_type: AnimalType; joined_at: string }) => ({
                id: m.id,
                userId: m.user_id,
                name: m.name,
                email: m.email,
                animalType: m.animal_type,
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

    // Get user info
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const userName = user.user_metadata?.name || user.email?.split("@")[0] || "Team Member";
    const userEmail = user.email || "";

    // Get user's latest quiz result for their animal type
    let userAnimalType: AnimalType = "lion";
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
    if (quizResults.length > 0) {
      quizResults.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      userAnimalType = quizResults[0].primaryType;
    }

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

    // Get user's animal type
    let userAnimalType: AnimalType = "lion";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("quiz_result_")) {
        const result = localStorage.getItem(key);
        if (result) {
          const parsed = JSON.parse(result);
          userAnimalType = parsed.primaryType;
          break;
        }
      }
    }

    // Join team
    const { error: joinError } = await supabase
      .from("team_members")
      .insert({
        team_id: teamData.id,
        user_id: userId,
        name: userName,
        email: userEmail,
        animal_type: userAnimalType,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline mb-4 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <div className="text-5xl mb-4">🦁🐧🐕🦫</div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Team Safari</h1>
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
                    <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10 hover:border-gray-300 dark:hover:border-white/30 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
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
                          <div className="flex items-center gap-1">
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
                                  <span>{animal.emoji}</span>
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

          {/* Create Team Form */}
          {showCreateForm ? (
            <Card className="mb-6 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
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
            <Card className="mb-6 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">➕</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Create a New Team</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Start a new team and invite members to see how your selling styles complement each other.
                </p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="text-white"
                  style={{ background: "linear-gradient(to right, #dc2626, #d97706, #0891b2, #059669)" }}
                >
                  Create a Team
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Join Team */}
          <Card className="border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/10">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Join an Existing Team</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter the invite code shared by your team leader
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinTeam} className="flex gap-4">
                <Input
                  placeholder="Enter invite code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
                <Button type="submit" variant="outline" disabled={joining} className="border-gray-300 dark:border-gray-600">
                  {joining ? "Joining..." : "Join"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
