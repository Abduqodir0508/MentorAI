# MentorAI 🎓
> **Adaptive AI-Powered Educational Platform for Competitive Lyceum Entrance Exams**  
> *Tailored for Inha Academic Lyceum (IUT), ALWIUT, specialized tech schools (Al-Khwarizmi), and Academic Lyceums.*

---

## 🌟 Overview & Core Capabilities

**MentorAI** is an adaptive learning platform that solves the #1 problem middle school students face when taking competitive entrance exams: **invisible foundation gaps originating from elementary grades (grades 4–6)**.

Key capabilities include:
1. **Interactive Onboarding & AI Diagnostic Assessment**:
   - Dynamic entrance target survey (Inha Lyceum, ALWIUT, Academic Lyceums) and target direction (IT/Exact Sciences, Economics, Social Sciences).
   - **Smart Pacing Engine**: Automatically detects remaining prep time. If $< 6$ months remain, schedules intensive 2.5–3.5 hours/day blocks.
   - **Conversational Level Test**: Dynamic dialogue assessing Math (fractions, linear equations, geometry) and English (tenses, passive voice), pinpointing root conceptual gaps.
2. **Core Adaptive Learning Tracks**:
   - **Lyceum Math Track**: Progressive journey starting from 4th-grade elementary fractions to 9th-grade quadratic Vieta shortcuts, systems of equations, and plane geometry.
   - **Entrance Exam English Track**: High-frequency exam grammar traps (Past Simple vs. Present Perfect, Conditionals, Passive Voice) and timed reading comprehension strategies.
   - **IT & Web Foundations Track**: Internet architecture (Clients, Servers, DNS), Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`), forms, and computational logic.
3. **Conversational AI Voice Tutor**:
   - Voice input and natural text-to-speech powered by the browser-native **Web Speech API**.
   - **Multilingual switching**: Fluent responses in **Uzbek (O'zbek tili)**, **Russian (Русский)**, and **English**.
   - **Socratic Guidance**: Guides students step-by-step with intuitive hints rather than spoiling final answers.
4. **User Management & Business Logic (RBAC & Paywall)**:
   - **Supabase Auth** & PostgreSQL schema with Row Level Security (RLS).
   - **Role-Based Access Control**:
     - `admin`: Superuser role (creator bypass) with zero subscription checks and an exclusive Admin Dashboard for telemetry, student gap inspection, and pass management.
     - `student`: Standard learner requiring an active **150,000 UZS / month** subscription pass to access full tracks beyond the diagnostic test.
   - **Local & International Payment Simulation**: Support hooks for **Payme**, **Click**, and **Stripe** with instant receipt generation.

---

## 📁 Architectural Structure

```text
mentor-ai/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx             # Login page with 1-click Demo toggles
│   │   │   └── register/page.tsx          # Registration page routing to onboarding
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx         # Main student dashboard & progress trackers
│   │   │   ├── onboarding/page.tsx        # Goal setting & conversational diagnostic test
│   │   │   ├── learn/
│   │   │   │   ├── math/page.tsx          # Math track (from 4th grade to lyceum prep)
│   │   │   │   ├── english/page.tsx       # English conversational & exam prep
│   │   │   │   └── it-basics/page.tsx     # Web & HTML foundations
│   │   │   ├── tutor/page.tsx             # Real-time AI interactive chat & voice tutor
│   │   │   ├── billing/page.tsx           # Subscription status (150,000 UZS/mo) & checkout
│   │   │   └── admin/page.tsx             # Creator-only dashboard (free bypass & telemetry)
│   │   ├── api/
│   │   │   ├── chat/route.ts              # AI streaming chat endpoint (Gemini/fallback)
│   │   │   ├── diagnostic/route.ts        # Skill level evaluation & gap detector
│   │   │   └── subscription/route.ts      # Subscription check and webhook handler
│   │   ├── layout.tsx                     # Global layout with theme and navigation
│   │   └── page.tsx                       # High-converting landing page
│   │
│   ├── components/
│   │   ├── ui/                            # Buttons, inputs, modals, cards, badges, progress
│   │   ├── tutor/                         # Chat bubble, speech-to-text mic, voice toggle
│   │   ├── roadmap/                       # Interactive curriculum roadmap & lesson modal
│   │   ├── dashboard/                     # Stats widgets, study streaks, weekly goals
│   │   └── admin/                         # Admin analytics, student diagnostic gap manager
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                  # Client-side Supabase instance
│   │   │   ├── server.ts                  # Server-side Supabase instance
│   │   │   └── middleware.ts              # Route protection & role enforcement
│   │   ├── ai/
│   │   │   ├── prompts.ts                 # Pedagogical prompts for math/english tutors
│   │   │   └── voice.ts                   # Web Speech API recognition & synthesis helpers
│   │   ├── curriculum.ts                  # Multi-grade lessons, formulas, and practice problems
│   │   └── utils.ts                       # Currency in UZS (150 000 UZS), date & study planners
│   │
│   ├── types/
│   │   ├── index.ts                       # Shared user, track, and lesson interfaces
│   │   └── database.types.ts              # Supabase generated database types
│   │
│   └── middleware.ts                      # Route guards (admin check, subscription guard)
│
├── supabase/
│   └── migrations/
│       └── 0001_initial_schema.sql        # Tables: profiles, subscriptions, progress, lessons
│
├── .env.example                           # Required environment variables
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v24)
- npm or pnpm

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your keys:
- `GEMINI_API_KEY`: Google Gemini API key (optional: intelligent pedagogical fallback is built-in if absent).
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase database credentials.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Database Setup (Supabase)

Execute `supabase/migrations/0001_initial_schema.sql` in your Supabase SQL editor:
1. Creates `profiles`, `subscriptions`, `tracks`, `lessons`, `user_progress`, `diagnostic_assessments`, and `tutor_sessions` tables.
2. Automatically provisions `admin` privileges and lifetime passes for creator emails (`creator@mentorai.uz`, `admin@mentorai.uz`).
3. Configures Row Level Security (RLS) policies for student data isolation.

---

## 👥 Demo Personas & Quick Evaluation

To test all user flows without configuring external services:
- **Student Persona**: Click **"Student Mode"** on `/login` or enter any email. Complete the onboarding diagnostic on `/onboarding` to receive a personalized study prescription.
- **Creator Admin Bypass**: Click **"Creator Admin"** on `/login` (or toggle the role switch in the top navigation bar). This unlocks unrestricted access to `/admin`, bypasses all paywalls, and opens platform telemetry and student gap inspector.
- **Voice AI Demo**: Visit `/tutor`, click the microphone icon, or toggle **"Voice: ON"** to test Web Speech audio synthesis.

