'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  LayoutDashboard,
  Calculator,
  Languages,
  Code,
  Bot,
  CreditCard,
  ShieldCheck,
  Flame,
  Award,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState<'student' | 'admin'>('student');

  useEffect(() => {
    // Check local storage for dark mode or admin role
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
    window.location.reload();
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/learn/math', label: 'Math', icon: Calculator },
    { href: '/learn/english', label: 'English', icon: Languages },
    { href: '/learn/it-basics', label: 'IT Basics', icon: Code },
    { href: '/tutor', label: 'AI Voice Tutor', icon: Bot, highlight: true },
    { href: '/billing', label: 'Pass (150K)', icon: CreditCard },
  ];

  if (role === 'admin') {
    navLinks.push({ href: '/admin', label: 'Creator Admin', icon: ShieldCheck, highlight: false });
  }

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
                Lyceum Prep
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">Inha & Academic Lyceums</p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                  item.highlight && !isActive && "text-indigo-600 dark:text-indigo-400 font-bold"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Streak Widget */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>5d Streak</span>
          </div>

          {/* Quick XP Widget */}
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>340 XP</span>
          </div>

          {/* Switch Role Pill (Demo / Admin superuser simulation) */}
          <button
            type="button"
            onClick={toggleRole}
            className={cn(
              "hidden sm:flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors",
              role === 'admin'
                ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300"
                : "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300"
            )}
            title="Toggle between Student view and Admin superuser bypass"
          >
            {role === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin View (Bypass ON)</span>
              </>
            ) : (
              <span>Student View</span>
            )}
          </button>

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
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Current Role Mode:</span>
            <Button size="sm" variant="outline" onClick={toggleRole}>
              Switch to {role === 'student' ? 'Admin' : 'Student'}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
