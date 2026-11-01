'use client';

import React from 'react';
import { Target, Zap, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getLyceumLabel, getDirectionLabel } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface WeeklyGoalsCardProps {
  targetLyceum?: string;
  targetDirection?: string;
  availableMonths?: number;
  weeklyHoursStudied?: number;
  targetWeeklyHours?: number;
  dailyHoursTarget?: number;
}

export function WeeklyGoalsCard({
  targetLyceum = 'inha',
  targetDirection = 'it',
  availableMonths = 5,
  weeklyHoursStudied = 9.5,
  targetWeeklyHours = 15,
  dailyHoursTarget = 2.5,
}: WeeklyGoalsCardProps) {
  const { t, language } = useLanguage();
  const isIntensive = availableMonths < 6;
  const progressPercent = Math.min(100, Math.round((weeklyHoursStudied / targetWeeklyHours) * 100));

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{t.dashboard.entranceTargetTitle}</h4>
              <p className="text-xs text-slate-500">{getLyceumLabel(targetLyceum)}</p>
            </div>
          </div>

          <Badge variant={isIntensive ? "warning" : "primary"} className="gap-1">
            {isIntensive ? <Zap className="w-3 h-3 text-amber-500" /> : <Clock className="w-3 h-3" />}
            {isIntensive ? t.dashboard.intensiveTrackBadge : t.dashboard.standardTrackBadge}
          </Badge>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300 mb-3">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{getDirectionLabel(targetDirection)}</span>
          <span className="mx-1.5">·</span>
          <span>{availableMonths} {t.dashboard.monthsRemaining}</span>
        </div>

        {/* Progress */}
        <div className="space-y-1.5 my-3">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-500">{t.dashboard.weeklyProgressLabel}</span>
            <span className="text-indigo-600 dark:text-indigo-400">
              {weeklyHoursStudied}h / {targetWeeklyHours}h ({progressPercent}%)
            </span>
          </div>
          <Progress value={progressPercent} color={isIntensive ? "amber" : "indigo"} />
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300 mt-2 flex items-start gap-2">
        {isIntensive ? (
          <>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>{t.dashboard.smartScheduleTip}</span>
          </>
        ) : (
          <>
            <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <span>{t.dashboard.steadyPaceTip}</span>
          </>
        )}
      </div>
    </Card>
  );
}
