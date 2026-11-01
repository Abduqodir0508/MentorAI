'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  Calculator,
  Languages,
  Code,
  ArrowRight,
  Target,
  Clock,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { WeeklyGoalsCard } from '@/components/dashboard/WeeklyGoalsCard';
import { RecommendedLessons } from '@/components/dashboard/RecommendedLessons';
import { TRACKS_DATA, LESSONS_DATA } from '@/lib/curriculum';
import { TrackProgressBar } from '@/components/roadmap/TrackProgressBar';

export default function DashboardPage() {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [userName, setUserName] = useState('Azizbek');
  const [hasSubscription, setHasSubscription] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('mentorai_role') as 'student' | 'admin';
    if (savedRole) setRole(savedRole);

    const savedName = localStorage.getItem('mentorai_user_name');
    if (savedName) setUserName(savedName.split(' ')[0]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              Assalomu alaykum, {userName}! 👋
            </h1>
            {role === 'admin' && (
              <Badge variant="primary" className="gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Bypass Active
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Targeting <strong>Inha Academic Lyceum (IUT)</strong> · 5 months remaining
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/tutor">
            <Button size="md" className="gap-2 shadow-md shadow-indigo-600/20 font-bold">
              <Bot className="w-4 h-4" />
              <span>Talk to AI Tutor</span>
            </Button>
          </Link>
          <Link href="/billing">
            <Button size="md" variant="outline" className="gap-1.5 text-xs">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pass Status</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <StatsOverview
        streakDays={5}
        totalXp={340}
        completedLessonsCount={4}
        weeklyHoursStudied={9.5}
        targetWeeklyHours={15}
      />

      {/* Middle Grid: Weekly Goals + Streak Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyGoalsCard
          targetLyceum="inha"
          targetDirection="it_math"
          availableMonths={5}
          weeklyHoursStudied={9.5}
          targetWeeklyHours={15}
          dailyHoursTarget={2.5}
        />
        <StreakCard streakDays={5} longestStreak={14} />
      </div>

      {/* Recommended Lessons & Track Explorers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Personalized Learning Path
            </h3>
            <p className="text-xs text-slate-500">
              Adaptive curriculum calibrated from your initial diagnostic assessment.
            </p>
          </div>
        </div>

        <RecommendedLessons />
      </div>

      {/* Tracks Progress Overview */}
      <Card className="p-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-4">
          Curriculum Completion by Track
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-indigo-600" /> Math Track
              </span>
              <Badge variant="primary">Grade 4-9</Badge>
            </div>
            <TrackProgressBar completedLessons={2} totalLessons={4} color="indigo" label="Progress" />
            <Link href="/learn/math" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-block pt-1">
              Resume Math Lessons →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-emerald-600" /> English Track
              </span>
              <Badge variant="success">A1 to B2</Badge>
            </div>
            <TrackProgressBar completedLessons={1} totalLessons={3} color="emerald" label="Progress" />
            <Link href="/learn/english" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-block pt-1">
              Resume English Lessons →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-amber-600" /> IT Foundations
              </span>
              <Badge variant="warning">Web HTML5</Badge>
            </div>
            <TrackProgressBar completedLessons={1} totalLessons={3} color="amber" label="Progress" />
            <Link href="/learn/it-basics" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline inline-block pt-1">
              Resume IT Lessons →
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
