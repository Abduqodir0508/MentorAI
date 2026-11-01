'use client';

import React from 'react';
import { Flame, Award, BookCheck, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsOverviewProps {
  streakDays?: number;
  totalXp?: number;
  completedLessonsCount?: number;
  weeklyHoursStudied?: number;
  targetWeeklyHours?: number;
}

export function StatsOverview({
  streakDays = 5,
  totalXp = 340,
  completedLessonsCount = 4,
  weeklyHoursStudied = 9.5,
  targetWeeklyHours = 14,
}: StatsOverviewProps) {
  const stats = [
    {
      label: 'Day Streak',
      value: `${streakDays} Days`,
      subtext: 'Consecutive study',
      icon: Flame,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    },
    {
      label: 'Total XP Earned',
      value: `${totalXp} XP`,
      subtext: 'Level: Exam Contender',
      icon: Award,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-600/10 dark:bg-indigo-600/20',
    },
    {
      label: 'Lessons Mastered',
      value: `${completedLessonsCount}`,
      subtext: 'Foundations & Algebra',
      icon: BookCheck,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    },
    {
      label: 'Weekly Study Time',
      value: `${weeklyHoursStudied}h / ${targetWeeklyHours}h`,
      subtext: `${Math.round((weeklyHoursStudied / (targetWeeklyHours || 1)) * 100)}% of weekly goal`,
      icon: Clock,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10 dark:bg-violet-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="p-4 md:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
              <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{stat.subtext}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
