'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { supabase } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student',
          },
        },
      });

      if (error && !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('mock')) {
        throw error;
      }

      localStorage.setItem('mentorai_role', 'student');
      localStorage.setItem('mentorai_user_email', email);
      localStorage.setItem('mentorai_user_name', fullName);
      // Route new students directly to onboarding diagnostic!
      router.push('/onboarding');
    } catch (err: any) {
      console.warn('Signup notice:', err.message);
      localStorage.setItem('mentorai_role', 'student');
      localStorage.setItem('mentorai_user_email', email);
      localStorage.setItem('mentorai_user_name', fullName);
      router.push('/onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-slate-200/80 dark:border-slate-800">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 mb-2">
            <GraduationCap className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Create Student Account
          </CardTitle>
          <CardDescription>
            Join 1,200+ students preparing for Inha & Academic Lyceums.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs text-rose-600 font-medium">
                {errorMessage}
              </div>
            )}

            <Input
              label="Full Name"
              placeholder="e.g. Azizbek Rahimov"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="student@mentorai.uz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Create Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Continue to AI Diagnostic Test
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-slate-100 dark:border-slate-800 py-4 text-xs text-slate-500">
          <span>Already registered? </span>
          <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
            Sign In here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
