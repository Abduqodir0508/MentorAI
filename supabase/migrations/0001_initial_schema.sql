-- MentorAI Initial Database Schema
-- Supports Role-Based Access Control (Admin / Student)
-- Dynamic Onboarding, Adaptive Learning Tracks, Subscriptions (150,000 UZS/month)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    target_lyceum TEXT DEFAULT 'inha', -- 'inha', 'academic_lyceum', 'wiut', 'presidential', 'al-khwarizmi'
    target_direction TEXT DEFAULT 'it_math', -- 'it_math', 'exact_sciences', 'economics', 'social_sciences'
    target_exam_date DATE,
    available_months INT DEFAULT 6,
    weekly_study_hours INT DEFAULT 14,
    daily_study_hours NUMERIC DEFAULT 2.0,
    current_level_math TEXT DEFAULT 'diagnosing', -- 'grade4_elementary', 'grade6_foundations', 'grade8_intermediate', 'grade9_advanced'
    current_level_english TEXT DEFAULT 'diagnosing', -- 'a1_beginner', 'a2_elementary', 'b1_intermediate', 'b2_exam_ready'
    onboarding_completed BOOLEAN DEFAULT false,
    avatar_url TEXT,
    streak_days INT DEFAULT 1,
    total_xp INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'canceled', 'expired', 'trial')),
    plan_name TEXT NOT NULL DEFAULT 'Lyceum Prep Pass',
    amount_uzs BIGINT NOT NULL DEFAULT 150000,
    current_period_start TIMESTAMPTZ DEFAULT NOW(),
    current_period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    payment_method TEXT DEFAULT 'simulated', -- 'payme', 'click', 'stripe', 'admin_override', 'simulated'
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRACKS TABLE
CREATE TABLE IF NOT EXISTS public.tracks (
    id TEXT PRIMARY KEY, -- 'math', 'english', 'it-basics'
    title TEXT NOT NULL,
    title_uz TEXT NOT NULL,
    title_ru TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    level TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'indigo',
    order_index INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    track_id TEXT NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    title_uz TEXT,
    title_ru TEXT,
    description TEXT NOT NULL,
    grade_level TEXT NOT NULL, -- e.g. 'Grade 4-5', 'Grade 6-7', 'Grade 8-9 (Lyceum Exam)'
    topic TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    practice_problems JSONB NOT NULL DEFAULT '[]'::jsonb,
    xp_reward INT DEFAULT 50,
    order_index INT NOT NULL,
    duration_minutes INT DEFAULT 20,
    is_free_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    track_id TEXT NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    score INT DEFAULT 0,
    attempts INT DEFAULT 1,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- 6. DIAGNOSTIC ASSESSMENTS TABLE
CREATE TABLE IF NOT EXISTS public.diagnostic_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    math_score INT DEFAULT 0,
    english_score INT DEFAULT 0,
    math_level TEXT,
    english_level TEXT,
    identified_gaps JSONB DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    full_transcript JSONB DEFAULT '[]'::jsonb,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TUTOR SESSIONS & CHAT HISTORY
CREATE TABLE IF NOT EXISTS public.tutor_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    track_id TEXT REFERENCES public.tracks(id) ON DELETE SET NULL,
    title TEXT DEFAULT 'Learning Session',
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    language TEXT DEFAULT 'uz' CHECK (language IN ('uz', 'ru', 'en')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Tracks
INSERT INTO public.tracks (id, title, title_uz, title_ru, description, icon, level, color, order_index)
VALUES 
('math', 'Lyceum Math Track', 'Litsey Matematika Kursi', 'Математика для лицея', 'From 4th Grade fundamentals to Inha & Academic Lyceum competitive entrance exam mastery.', 'Calculator', 'Grade 4 - Grade 9', 'indigo', 1),
('english', 'Entrance Exam English', 'Kirish Imtihoni Ingliz Tili', 'Английский для вступительных', 'Grammar drills, academic reading, and conversational confidence for lyceum test takers.', 'Languages', 'A1 to B2 Exam Level', 'emerald', 2),
('it-basics', 'IT & Web Foundations', 'IT va Veb Asoslari', 'Основы IT и веб-разработки', 'Semantic HTML, computational thinking, and how the modern internet works for future tech students.', 'Code', 'Beginner to Intermediate', 'amber', 3)
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    title_uz = EXCLUDED.title_uz,
    title_ru = EXCLUDED.title_ru,
    description = EXCLUDED.description;

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_sessions ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Profiles: users read and update their own, admins read all
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Allow insert profile on auth signup" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Subscriptions: users view own, admins manage all
CREATE POLICY "Users view own subscriptions" 
ON public.subscriptions FOR SELECT 
USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins manage subscriptions" 
ON public.subscriptions FOR ALL 
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can create own subscription order" 
ON public.subscriptions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" 
ON public.subscriptions FOR UPDATE 
USING (auth.uid() = user_id);

-- Tracks: public read
CREATE POLICY "Anyone can view tracks" 
ON public.tracks FOR SELECT 
USING (true);

-- Lessons: public read
CREATE POLICY "Anyone can view lessons" 
ON public.lessons FOR SELECT 
USING (true);

-- Progress: users view & edit their own, admins view all
CREATE POLICY "Users manage own progress" 
ON public.user_progress FOR ALL 
USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Diagnostic: users view and insert their own
CREATE POLICY "Users manage own diagnostics" 
ON public.diagnostic_assessments FOR ALL 
USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Tutor sessions: users manage own sessions
CREATE POLICY "Users manage own tutor sessions" 
ON public.tutor_sessions FOR ALL 
USING (auth.uid() = user_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Function to handle new user signup automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    is_admin BOOLEAN;
BEGIN
    -- Check if email matches creator/admin pattern
    is_admin := (NEW.email IN ('creator@mentorai.uz', 'admin@mentorai.uz') OR NEW.raw_user_meta_data->>'role' = 'admin');
    
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        CASE WHEN is_admin THEN 'admin' ELSE 'student' END
    );
    
    -- If admin, automatically grant permanent active subscription
    IF is_admin THEN
        INSERT INTO public.subscriptions (user_id, status, plan_name, amount_uzs, current_period_end, payment_method)
        VALUES (
            NEW.id,
            'active',
            'Super Admin Lifetime Pass',
            0,
            NOW() + INTERVAL '100 years',
            'admin_override'
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

