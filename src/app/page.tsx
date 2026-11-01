'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Calculator,
  Languages,
  Code,
  Bot,
  Mic,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Users,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatUZS } from '@/lib/utils';

export default function LandingPage() {
  const tracks = [
    {
      id: 'math',
      title: 'Lyceum Math Track',
      titleUz: 'Litsey Matematika Kursi',
      subtitle: 'From Grade 4 foundations to Inha exam problems',
      description:
        'Stuck on 8th grade algebra because of 5th grade fractions? Our adaptive diagnostic detects your exact elementary gaps and builds an unbreakable bridge to exam mastery.',
      icon: Calculator,
      color: 'indigo',
      badge: 'Grade 4 — Grade 9',
      features: ['Fractions & Common Denominator', 'Linear & Quadratic Equations', 'Vieta Formula Shortcuts', 'Plane Geometry & Triangle Theorems'],
      href: '/learn/math',
    },
    {
      id: 'english',
      title: 'Entrance Exam English',
      titleUz: 'Kirish Imtihoni Ingliz Tili',
      subtitle: 'Grammar drills, academic reading & timed strategy',
      description:
        'Conquer the most tested entrance grammar traps (Past Simple vs Present Perfect, Conditionals, Passive Voice) and master timed reading comprehension.',
      icon: Languages,
      color: 'emerald',
      badge: 'A1 to B2 Exam Level',
      features: ['Grammar Trap Drills', 'Timed Reading Comprehension', 'Academic Lyceum Vocabulary', 'Real Exam Mock Simulation'],
      href: '/learn/english',
    },
    {
      id: 'it-basics',
      title: 'IT & Web Foundations',
      titleUz: 'IT va Veb Asoslari',
      subtitle: 'Semantic HTML5, internet architecture & algorithms',
      description:
        'Designed specifically for IT directions at Inha Lyceum and technical specialized schools. Understand clients, servers, and code semantic web pages.',
      icon: Code,
      color: 'amber',
      badge: 'IT Lyceum Direction',
      features: ['How the Internet Works', 'Semantic HTML5 Layout', 'Forms & Inputs', 'Computational Logic Drills'],
      href: '/learn/it-basics',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Uzbekistan’s #1 AI Lyceum Entrance Exam Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Master Entrance Exams with{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Adaptive Conversational AI
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Targeting <strong>Inha Lyceum, ALWIUT, or Academic Lyceums</strong>? MentorAI evaluates your 
            knowledge from 4th grade basics, constructs a personalized study roadmap, and tutors you with voice in 
            <strong> Uzbek, Russian, and English</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-indigo-600/25">
                Take Free AI Diagnostic Test
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/tutor" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-3.5 gap-2">
                <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Try Voice AI Tutor Demo
              </Button>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>1,200+ Enrolled Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>94% Competitive Entrance Pass Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{formatUZS(150000)} / month (Affordable Access)</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MENTOR AI - 3 CORE PILLARS */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">How MentorAI Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Why Traditional Tutoring Falls Short for Lyceum Tests
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Middle school students fail competitive exams not because they are not smart, but because they have invisible foundation gaps from elementary grades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Diagnostic Gaps Detection
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our dynamic conversational test detects whether you struggle with common denominators, negative signs, or irregular tenses in under 5 minutes.
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Smart Time-Pacing Engine
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                If your exam is less than 6 months away, MentorAI automatically schedules intensive 2.5-hour daily modules to guarantee full coverage before test day.
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                24/7 Voice & Chat AI Tutor
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Speak directly into your microphone in Uzbek, Russian, or English. Socratic hints help you solve the problem yourself instead of just reading answers.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* TRACKS SECTION */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="secondary">Targeted Curricula</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Three Comprehensive Learning Tracks
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Each track is aligned directly with the entrance standards of Inha Academic Lyceum, ALWIUT, and top specialized colleges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <Card key={track.id} className="p-8 flex flex-col justify-between hover:shadow-xl transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="primary">{track.badge}</Badge>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{track.title}</h3>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                      🇺🇿 {track.titleUz}
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      {track.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {track.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={track.href}>
                    <Button variant="outline" className="w-full">
                      Explore Track
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING & SUBSCRIPTION PASS SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="success">Simple & Fair Pricing</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            One All-Inclusive Pass
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Traditional tutors in Tashkent charge $100+ per month. MentorAI provides 24/7 unlimited AI tutoring, diagnostic testing, and all 3 tracks for a fraction of that cost.
          </p>

          <Card className="max-w-lg mx-auto p-8 border-2 border-indigo-600 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Lyceum Entrance Prep Pass
            </div>

            <div className="flex items-baseline gap-2 my-4">
              <span className="text-4xl font-black text-slate-900 dark:text-slate-100">
                {formatUZS(150000)}
              </span>
              <span className="text-sm text-slate-500 font-medium">/ month</span>
            </div>

            <div className="space-y-3 py-4 border-y border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Full access to Math Track (Grade 4 to Grade 9)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Entrance Exam English (Grammar & Reading Drills)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>IT & Semantic HTML5 Foundations Course</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>24/7 Voice & Chat AI Tutor (Uzbek, Russian, English)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Personalized Adaptive Study Pacing & Roadmaps</span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Link href="/billing">
                <Button size="lg" className="w-full font-bold text-base shadow-lg shadow-indigo-600/30">
                  Activate Pass (150,000 UZS)
                </Button>
              </Link>
              <p className="text-[11px] text-center text-slate-400">
                Instant access via Payme, Click, or Stripe. Cancel anytime.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900 dark:text-slate-100">MentorAI</span>
            <span>— The AI Prep Platform for Inha & Academic Lyceums</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/onboarding" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Diagnostic Test
            </Link>
            <Link href="/tutor" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Voice Tutor
            </Link>
            <Link href="/billing" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing (150K)
            </Link>
            <Link href="/admin" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Creator Admin
            </Link>
          </div>

          <div>© 2026 MentorAI. Built for entrance exam excellence.</div>
        </div>
      </footer>
    </div>
  );
}
