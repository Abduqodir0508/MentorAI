'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Bot,
  CreditCard,
  Code,
  Atom,
  HeartPulse,
  Scale,
  Languages as LanguagesIcon,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { WeeklyGoalsCard } from '@/components/dashboard/WeeklyGoalsCard';
import { RecommendedLessons } from '@/components/dashboard/RecommendedLessons';
import { TrackProgressBar } from '@/components/roadmap/TrackProgressBar';
import { ALL_TRACKS } from '@/lib/curriculum';
import { useLanguage } from '@/context/LanguageContext';

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [userName, setUserName] = useState('Azizbek');

  useEffect(() => {
    const savedRole = localStorage.getItem('mentorai_role') as 'student' | 'admin';
    if (savedRole) setRole(savedRole);

    const savedName = localStorage.getItem('mentorai_user_name');
    if (savedName) setUserName(savedName.split(' ')[0]);
  }, []);

  const trackIcons = {
    it: Code,
    'exact-sciences': Atom,
    medicine: HeartPulse,
    law: Scale,
    languages: LanguagesIcon,
    math: Code,
    english: LanguagesIcon,
    'it-basics': Code,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {t.dashboard.greeting}, {userName}! 👋
            </h1>
            {role === 'admin' && (
              <Badge variant="primary" className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                {t.nav.adminMode}
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.dashboard.targetLabel}: <strong>Inha Academic Lyceum (IUT)</strong> · 5 {t.dashboard.monthsRemaining}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/tutor">
            <Button size="md" className="gap-2 shadow-md shadow-indigo-600/20 font-bold">
              <Bot className="w-4 h-4" />
              <span>{t.dashboard.talkToTutor}</span>
            </Button>
          </Link>
          <Link href="/billing">
            <Button size="md" variant="outline" className="gap-1.5 text-xs font-semibold">
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t.dashboard.passStatus}</span>
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
          targetDirection="it"
          availableMonths={5}
          weeklyHoursStudied={9.5}
          targetWeeklyHours={15}
          dailyHoursTarget={2.5}
        />
        <StreakCard streakDays={5} longestStreak={14} />
      </div>

      {/* Recommended Lessons */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.dashboard.personalizedPathTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.dashboard.personalizedPathSub}
          </p>
        </div>

        <RecommendedLessons />
      </div>

      {/* All 5 Tracks Progress Overview */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            {t.dashboard.curriculumByTrackTitle}
          </h3>
          <span className="text-xs text-slate-400">5 {language === 'uz' ? 'ta yo\'nalish' : language === 'ru' ? 'направлений' : 'tracks'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_TRACKS.map((track, idx) => {
            const Icon = trackIcons[track.id] || Code;
            const title = language === 'uz' ? track.title_uz : language === 'ru' ? track.title_ru : track.title;
            const mockCompleted = idx === 0 ? 2 : idx === 1 ? 1 : 0;

            return (
              <div
                key={track.id}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{title}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {track.level}
                    </Badge>
                  </div>

                  <TrackProgressBar
                    completedLessons={mockCompleted}
                    totalLessons={3}
                    color="indigo"
                    label={t.tracks.trackProgress}
                  />
                </div>

                <Link
                  href={`/tracks/${track.slug}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>{t.dashboard.resumeLessons}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
