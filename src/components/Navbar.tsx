'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  LayoutDashboard,
  Code,
  Compass,
  ChevronDown,
  Bot,
  CreditCard,
  ShieldCheck,
  Flame,
  Award,
  Sun,
  Moon,
  Menu,
  X,
  Atom,
  HeartPulse,
  Scale,
  Languages as LanguagesIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTracksDropdownOpen, setIsTracksDropdownOpen] = useState(false);
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const tracksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('mentorai_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    const savedRole = localStorage.getItem('mentorai_role') as 'student' | 'admin';
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tracksRef.current && !tracksRef.current.contains(event.target as Node)) {
        setIsTracksDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mentorai_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mentorai_theme', 'light');
    }
  };

  const toggleRole = () => {
    const nextRole = role === 'student' ? 'admin' : 'student';
    setRole(nextRole);
    localStorage.setItem('mentorai_role', nextRole);
    document.cookie = `mentorai_session=${nextRole === 'admin' ? 'admin' : 'active'}; path=/; max-age=2592000; SameSite=Lax`;
    window.location.reload();
  };

  const tracksList = [
    { href: '/tracks/it', label: t.nav.itTrack, icon: Code, color: 'text-indigo-600' },
    { href: '/tracks/exact-sciences', label: t.nav.exactTrack, icon: Atom, color: 'text-blue-600' },
    { href: '/tracks/medicine', label: t.nav.medicineTrack, icon: HeartPulse, color: 'text-emerald-600' },
    { href: '/tracks/law', label: t.nav.lawTrack, icon: Scale, color: 'text-purple-600' },
    { href: '/tracks/languages', label: t.nav.languagesTrack, icon: LanguagesIcon, color: 'text-amber-600' },
  ];

  const isTrackActive = pathname.startsWith('/tracks') || pathname.startsWith('/learn');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Mentor<span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {t.nav.lyceumPrepBadge}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">{t.nav.brandSub}</p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
              pathname === '/dashboard'
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.nav.dashboard}</span>
          </Link>

          {/* 5 Tracks Dropdown */}
          <div className="relative" ref={tracksRef}>
            <button
              type="button"
              onClick={() => setIsTracksDropdownOpen(!isTracksDropdownOpen)}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                isTrackActive
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Compass className="w-4 h-4" />
              <span>{t.nav.tracks}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 ml-0.5 transition-transform duration-200", isTracksDropdownOpen && "rotate-180")} />
            </button>

            {isTracksDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                  {t.nav.allTracks} (5)
                </div>
                {tracksList.map((tr) => {
                  const Icon = tr.icon;
                  const isCur = pathname === tr.href;
                  return (
                    <Link
                      key={tr.href}
                      href={tr.href}
                      onClick={() => setIsTracksDropdownOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                        isCur
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", tr.color)} />
                      <span>{tr.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Voice Tutor */}
          <Link
            href="/tutor"
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all",
              pathname === '/tutor'
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40"
            )}
          >
            <Bot className="w-4 h-4" />
            <span>{t.nav.aiVoiceTutor}</span>
          </Link>

          {/* Pass / Billing */}
          <Link
            href="/billing"
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
              pathname === '/billing'
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
          >
            <CreditCard className="w-4 h-4" />
            <span>{t.nav.pass}</span>
          </Link>

          {/* Creator Admin */}
          {role === 'admin' && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all",
                pathname === '/admin'
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                  : "text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.nav.adminDashboard}</span>
            </Link>
          )}
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Streak Widget */}
          <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>5 {t.nav.streakDays}</span>
          </div>

          {/* Switch Role Pill */}
          <button
            type="button"
            onClick={toggleRole}
            className={cn(
              "hidden sm:flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-colors",
              role === 'admin'
                ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300"
                : "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300"
            )}
            title="Toggle between Student view and Admin superuser bypass"
          >
            {role === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>{t.nav.adminMode}</span>
              </>
            ) : (
              <span>{t.nav.studentMode}</span>
            )}
          </button>

          {/* Global Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <Link
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.nav.dashboard}</span>
          </Link>

          <div className="pt-1 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              {t.nav.tracks} (5)
            </span>
            {tracksList.map((tr) => (
              <Link
                key={tr.href}
                href={tr.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <tr.icon className={cn("w-4 h-4", tr.color)} />
                <span>{tr.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/tutor"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bot className="w-4 h-4" />
            <span>{t.nav.aiVoiceTutor}</span>
          </Link>

          <Link
            href="/billing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <CreditCard className="w-4 h-4" />
            <span>{t.nav.pass}</span>
          </Link>

          {role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-purple-600 dark:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.nav.adminDashboard}</span>
            </Link>
          )}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Role Mode:</span>
            <Button size="sm" variant="outline" onClick={toggleRole}>
              {role === 'student' ? t.nav.switchToAdmin : t.nav.switchToStudent}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
