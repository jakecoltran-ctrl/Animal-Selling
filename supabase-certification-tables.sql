-- Supabase Certification System Tables
-- Run these in Supabase SQL Editor to create certification tables

-- ============================================
-- GAME PROGRESS TABLE
-- Tracks user's best performance per game
-- ============================================

CREATE TABLE game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL CHECK (game_type IN ('lion', 'penguin', 'retriever', 'beaver')),
  attempts INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  total_questions INTEGER NOT NULL,
  best_accuracy DECIMAL(5,2) DEFAULT 0,
  passed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, game_type)
);

-- Enable RLS
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

-- Users can read their own progress
CREATE POLICY "Users can read own game progress"
ON game_progress FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own game progress"
ON game_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own game progress"
ON game_progress FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================
-- GAME ATTEMPTS TABLE
-- Records each individual game attempt
-- ============================================

CREATE TABLE game_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL CHECK (game_type IN ('lion', 'penguin', 'retriever', 'beaver')),
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  time_taken_seconds INTEGER,
  answers JSONB,
  passed BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE game_attempts ENABLE ROW LEVEL SECURITY;

-- Users can read their own attempts
CREATE POLICY "Users can read own game attempts"
ON game_attempts FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own attempts
CREATE POLICY "Users can insert own game attempts"
ON game_attempts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- BADGES TABLE
-- Tracks badges earned by users
-- ============================================

CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL CHECK (badge_type IN (
    'lion_master',
    'penguin_master',
    'retriever_master',
    'beaver_master',
    'perfect_lion',
    'perfect_penguin',
    'perfect_retriever',
    'perfect_beaver',
    'perfection',
    'speed_demon',
    'certified'
  )),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- Users can read their own badges
CREATE POLICY "Users can read own badges"
ON badges FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own badges
CREATE POLICY "Users can insert own badges"
ON badges FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CERTIFICATES TABLE
-- Stores certificate data for verification
-- ============================================

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  user_name TEXT NOT NULL,
  primary_animal_type TEXT,
  average_accuracy DECIMAL(5,2) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Users can read their own certificate
CREATE POLICY "Users can read own certificate"
ON certificates FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own certificate
CREATE POLICY "Users can insert own certificate"
ON certificates FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Anyone can verify a certificate by its number (public access)
CREATE POLICY "Anyone can verify certificates"
ON certificates FOR SELECT
USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_game_progress_user ON game_progress(user_id);
CREATE INDEX idx_game_attempts_user ON game_attempts(user_id);
CREATE INDEX idx_game_attempts_user_game ON game_attempts(user_id, game_type);
CREATE INDEX idx_badges_user ON badges(user_id);
CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_certificates_number ON certificates(certificate_number);
