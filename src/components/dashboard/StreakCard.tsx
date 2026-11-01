'use client';

import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

interface StreakCardProps {
  streakDays?: number;
  longestStreak?: number;
}

export function StreakCard({ streakDays = 5, longestStreak = 12 }: StreakCardProps) {
  const { t, language } = useLanguage();

  const daysUz = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
  const daysRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const days = language === 'uz' ? daysUz : language === 'ru' ? daysRu : daysEn;
  const activeDays = [true, true, true, true, true, false, false];

  return (
    <Card className="p-5 overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{t.dashboard.studyStreakTitle}</h4>
            <p className="text-xs text-slate-500">{streakDays} {t.dashboard.streakSub}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>{t.dashboard.record}: {longestStreak}d</span>
        </div>
      </div>

      {/* Days row */}
      <div className="grid grid-cols-7 gap-1.5 py-2">
        {days.map((day, idx) => {
          const isActive = activeDays[idx];
          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-medium">{day}</span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isActive ? '🔥' : '·'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>{t.dashboard.streakReminder}</span>
      </div>
    </Card>
  );
}
