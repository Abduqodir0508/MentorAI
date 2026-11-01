import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'MentorAI — Adaptive Entrance Exam Prep for Academic Lyceums & Inha',
  description:
    'AI-powered adaptive learning platform for middle and high school students in Uzbekistan preparing for Inha Lyceum, ALWIUT, and academic lyceum entrance exams. Math from Grade 4 foundations, Exam English, IT Basics, Medicine, Law, Exact Sciences, and conversational Voice AI.',
  keywords: [
    'MentorAI',
    'Inha Lyceum Prep',
    'Academic Lyceum',
    'ALWIUT',
    'Math from Grade 4',
    'Entrance Exams Uzbekistan',
    'AI Tutor',
    'Voice Tutor',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
