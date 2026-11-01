'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  CreditCard,
  Calculator,
  Languages,
  Code,
  Sparkles,
  ArrowRight,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { UserRoleManager } from '@/components/admin/UserRoleManager';
import { TRACKS_DATA, LESSONS_DATA } from '@/lib/curriculum';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'curriculum'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Creator Superuser Dashboard
            </Badge>
            <span className="text-xs text-slate-400">Zero subscription checks · Full platform bypass</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            MentorAI Platform Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time telemetry, student diagnostic gap monitoring, and subscription pass administration.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Analytics & MRR
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'users'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Students & Roles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'curriculum'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Curriculum Oversight
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AdminAnalytics />
          <UserRoleManager />
        </div>
      )}

      {/* Tab 2: User Role Manager */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <UserRoleManager />
        </div>
      )}

      {/* Tab 3: Curriculum Oversight */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRACKS_DATA.map((track) => {
              const lessons = LESSONS_DATA.filter((l) => l.track_id === track.id);
              const freeCount = lessons.filter((l) => l.is_free_preview).length;

              return (
                <Card key={track.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-slate-900 dark:text-slate-100">
                      {track.title}
                    </span>
                    <Badge variant="outline">{lessons.length} Lessons</Badge>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {track.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Free Diagnostic Previews:</span>
                      <strong className="text-emerald-600 font-semibold">{freeCount}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Locked (150K Pass):</span>
                      <strong className="text-indigo-600 font-semibold">{lessons.length - freeCount}</strong>
                    </div>
                  </div>

                  <Link href={`/learn/${track.id}`} className="block pt-2">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      Inspect Track Curriculum
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
