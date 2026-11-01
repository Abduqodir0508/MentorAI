'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TrackProgressBarProps {
  completedLessons: number;
  totalLessons: number;
  color?: 'indigo' | 'emerald' | 'amber';
  label?: string;
  className?: string;
}

export function TrackProgressBar({
  completedLessons,
  totalLessons,
  color = 'indigo',
  label,
  className,
}: TrackProgressBarProps) {
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const colorStyles = {
    indigo: {
      bar: 'bg-indigo-600',
      text: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    },
    emerald: {
      bar: 'bg-emerald-500',
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    amber: {
      bar: 'bg-amber-500',
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
    },
  };

  const style = colorStyles[color];

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-600 dark:text-slate-300">{label || "Track Progress"}</span>
        <span className={style.text}>
          {completedLessons}/{totalLessons} ({percent}%)
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", style.bar)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
