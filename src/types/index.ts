export type UserRole = 'student' | 'admin';

export type SubscriptionStatus = 'active' | 'inactive' | 'canceled' | 'expired' | 'trial';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  target_lyceum?: 'inha' | 'academic_lyceum' | 'wiut' | 'presidential' | 'al-khwarizmi' | string;
  target_direction?: 'it_math' | 'exact_sciences' | 'economics' | 'social_sciences' | string;
  target_exam_date?: string | null;
  available_months?: number;
  weekly_study_hours?: number;
  daily_study_hours?: number;
  current_level_math?: string;
  current_level_english?: string;
  onboarding_completed: boolean;
  avatar_url?: string | null;
  streak_days?: number;
  total_xp?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  status: SubscriptionStatus;
  plan_name: string;
  amount_uzs: number;
  current_period_start: string;
  current_period_end: string;
  payment_method?: 'payme' | 'click' | 'stripe' | 'admin_override' | 'simulated';
  transaction_id?: string;
  created_at?: string;
}

export interface PracticeProblem {
  id: string;
  question: string;
  question_uz?: string;
  question_ru?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
  xp: number;
}

export interface LessonContent {
  introduction: string;
  introduction_uz?: string;
  introduction_ru?: string;
  conceptSummary: string[];
  formulaOrRules?: { label: string; formula: string; explanation: string }[];
  stepByStepExamples: { title: string; steps: string[]; solution: string }[];
  keyTakeaway: string;
}

export interface Lesson {
  id: string;
  track_id: 'math' | 'english' | 'it-basics';
  title: string;
  title_uz?: string;
  title_ru?: string;
  description: string;
  grade_level: string; // e.g. 'Grade 4-5', 'Grade 6-7', 'Grade 8-9 (Inha Prep)'
  topic: string;
  content: LessonContent;
  practice_problems: PracticeProblem[];
  xp_reward: number;
  order_index: number;
  duration_minutes: number;
  is_free_preview: boolean;
}

export interface Track {
  id: 'math' | 'english' | 'it-basics';
  title: string;
  title_uz: string;
  title_ru: string;
  description: string;
  icon: string;
  level: string;
  color: string;
  order_index: number;
  lessons?: Lesson[];
}

export interface UserProgress {
  id?: string;
  user_id: string;
  lesson_id: string;
  track_id: string;
  completed: boolean;
  score: number;
  attempts: number;
  completed_at?: string;
  notes?: string;
}

export interface DiagnosticAssessment {
  id?: string;
  user_id: string;
  math_score: number;
  english_score: number;
  math_level: string;
  english_level: string;
  identified_gaps: string[];
  recommendations: {
    recommendedDailyHours: number;
    intensity: 'standard' | 'intensive' | 'crash_course';
    focusAreas: string[];
    studyPlanSummary: string;
  };
  full_transcript?: { sender: 'ai' | 'user'; text: string; category?: string }[];
  completed_at?: string;
}

export interface TutorMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  track_id?: string;
  language?: 'uz' | 'ru' | 'en';
  timestamp: string;
  suggestions?: string[];
}

export interface PlatformMetrics {
  totalStudents: number;
  activeSubscriptions: number;
  revenueThisMonthUZS: number;
  completedLessons: number;
  passRateEstimate: number;
  topTargetSchools: { name: string; count: number }[];
}
