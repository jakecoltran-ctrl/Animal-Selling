-- Supabase Row Level Security (RLS) Policies
-- Run these in Supabase SQL Editor to secure your tables

-- ============================================
-- QUIZ RESULTS TABLE
-- ============================================

-- Enable RLS
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Users can only read their own quiz results
CREATE POLICY "Users can read own quiz results"
ON quiz_results FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own quiz results
CREATE POLICY "Users can insert own quiz results"
ON quiz_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own quiz results
CREATE POLICY "Users can update own quiz results"
ON quiz_results FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================
-- PURCHASES TABLE
-- ============================================

-- Enable RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Users can only read their own purchases
CREATE POLICY "Users can read own purchases"
ON purchases FOR SELECT
USING (auth.uid() = user_id);

-- Only service role can insert purchases (via API)
-- No INSERT policy for users - purchases created via Stripe webhook or code redemption

-- ============================================
-- TEAMS TABLE
-- ============================================

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Team owners and co-leaders can read their teams
CREATE POLICY "Team leaders can read teams"
ON teams FOR SELECT
USING (auth.uid() = owner_id OR auth.uid() = co_leader_id);

-- Team owners can update their teams
CREATE POLICY "Team owners can update teams"
ON teams FOR UPDATE
USING (auth.uid() = owner_id);

-- Team owners can delete their teams
CREATE POLICY "Team owners can delete teams"
ON teams FOR DELETE
USING (auth.uid() = owner_id);

-- Authenticated users can create teams
CREATE POLICY "Users can create teams"
ON teams FOR INSERT
WITH CHECK (auth.uid() = owner_id);

-- ============================================
-- TEAM MEMBERS TABLE
-- ============================================

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Team members can read members of teams they belong to
CREATE POLICY "Team members can read team members"
ON team_members FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = team_members.team_id
    AND (teams.owner_id = auth.uid() OR teams.co_leader_id = auth.uid())
  )
  OR user_id = auth.uid()
);

-- Team leaders can manage team members
CREATE POLICY "Team leaders can insert team members"
ON team_members FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = team_members.team_id
    AND (teams.owner_id = auth.uid() OR teams.co_leader_id = auth.uid())
  )
);

CREATE POLICY "Team leaders can delete team members"
ON team_members FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = team_members.team_id
    AND (teams.owner_id = auth.uid() OR teams.co_leader_id = auth.uid())
  )
);

-- ============================================
-- GIFT CODES TABLE
-- ============================================

-- Enable RLS
ALTER TABLE gift_codes ENABLE ROW LEVEL SECURITY;

-- Team leaders can read gift codes for their teams
CREATE POLICY "Team leaders can read gift codes"
ON gift_codes FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = gift_codes.team_id
    AND (teams.owner_id = auth.uid() OR teams.co_leader_id = auth.uid())
  )
);

-- Only service role can insert gift codes (via API after payment)
-- No INSERT policy for users

-- Team leaders can update gift codes (mark as used)
CREATE POLICY "Team leaders can update gift codes"
ON gift_codes FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = gift_codes.team_id
    AND (teams.owner_id = auth.uid() OR teams.co_leader_id = auth.uid())
  )
);

-- Team leaders can delete used gift codes
CREATE POLICY "Team leaders can delete gift codes"
ON gift_codes FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM teams
    WHERE teams.id = gift_codes.team_id
    AND (teams.owner_id = auth.uid() OR teams.co_leader_id = auth.uid())
  )
  AND used_at IS NOT NULL
);

-- ============================================
-- REFLECTIONS TABLE
-- ============================================

-- Enable RLS
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;

-- Users can only read their own reflections
CREATE POLICY "Users can read own reflections"
ON reflections FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own reflections
CREATE POLICY "Users can insert own reflections"
ON reflections FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own reflections
CREATE POLICY "Users can update own reflections"
ON reflections FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================
-- PENDING QUIZ DATA TABLE
-- ============================================

-- This table is managed by service role only (no user policies needed)
-- It stores temporary quiz data before user account is created
ALTER TABLE pending_quiz_data ENABLE ROW LEVEL SECURITY;

-- No user policies - only service role access

-- ============================================
-- EMAIL CAPTURES TABLE (if using)
-- ============================================

-- Enable RLS
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;

-- Only service role can manage email captures
-- No user policies needed
