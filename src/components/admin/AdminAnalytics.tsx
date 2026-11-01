'use client';

import React from 'react';
import { Users, CreditCard, DollarSign, Award, School, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatUZS } from '@/lib/utils';

export function AdminAnalytics() {
  const metrics = {
    totalStudents: 1248,
    activeSubscribers: 894,
    monthlyRevenueUZS: 134100000, // 894 * 150,000 UZS
    completedLessons: 18450,
    averageDiagnosticScore: '68%',
    topTargetSchools: [
      { name: 'Inha Academic Lyceum (IUT)', count: 580, percentage: '46%' },
      { name: 'Westminster Lyceum (ALWIUT)', count: 340, percentage: '27%' },
      { name: 'Al-Khwarizmi Specialized School', count: 185, percentage: '15%' },
      { name: 'Presidential & State Lyceums', count: 143, percentage: '12%' },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {metrics.totalStudents.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% this month</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Pass Holders</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {metrics.activeSubscribers.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">150 000 UZS / month</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly MRR</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-2">
            {formatUZS(metrics.monthlyRevenueUZS)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Payme / Click / Stripe</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lessons Solved</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            {metrics.completedLessons.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Avg diagnostic: {metrics.averageDiagnosticScore}</div>
        </Card>
      </div>

      {/* Target Schools Distribution */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <School className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Top Student Target Lyceums in Uzbekistan
          </h3>
        </div>

        <div className="space-y-4">
          {metrics.topTargetSchools.map((school, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">{school.name}</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {school.count} students ({school.percentage})
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: school.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
