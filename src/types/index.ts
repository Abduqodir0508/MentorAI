export type Language = 'uz' | 'ru' | 'en';

export type UserRole = 'student' | 'admin';

export type SubscriptionStatus = 'active' | 'inactive' | 'canceled' | 'expired' | 'trial';

export type TrackType =
  | 'it'
  | 'exact-sciences'
  | 'medicine'
  | 'law'
  | 'languages'
  | 'math'
  | 'english'
  | 'it-basics';

export interface Subject {
  id: string;
  name: string;
  name_uz: string;
  name_ru: string;
  track_id: TrackType;
  description: string;
  description_uz: string;
  description_ru: string;
  icon: string;
  topicsCount: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  target_lyceum?: 'inha' | 'academic_lyceum' | 'wiut' | 'presidential' | 'al-khwarizmi' | string;
  target_direction?: TrackType | string;
  target_exam_date?: string | null;
  available_months?: number;
  weekly_study_hours?: number;
  daily_study_hours?: number;
  current_level_math?: string;
  current_level_english?: string;
  selected_track?: TrackType;
  onboarding_completed: boolean;
  avatar_url?: string | null;
  streak_days?: number;
  total_xp?: number;
  preferred_language?: Language;
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
  options_uz?: string[];
  options_ru?: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanation_uz?: string;
  explanation_ru?: string;
  hint?: string;
  hint_uz?: string;
  hint_ru?: string;
  xp: number;
}

export interface LessonContent {
  introduction: string;
  introduction_uz?: string;
  introduction_ru?: string;
  conceptSummary: string[];
  conceptSummary_uz?: string[];
  conceptSummary_ru?: string[];
  formulaOrRules?: {
    label: string;
    label_uz?: string;
    label_ru?: string;
    formula: string;
    explanation: string;
    explanation_uz?: string;
    explanation_ru?: string;
  }[];
  stepByStepExamples: {
    title: string;
    title_uz?: string;
    title_ru?: string;
    steps: string[];
    steps_uz?: string[];
    steps_ru?: string[];
    solution: string;
    solution_uz?: string;
    solution_ru?: string;
  }[];
  keyTakeaway: string;
  keyTakeaway_uz?: string;
  keyTakeaway_ru?: string;
}

export interface Lesson {
  id: string;
  track_id: TrackType;
  subject_id?: string;
  title: string;
  title_uz?: string;
  title_ru?: string;
  description: string;
  description_uz?: string;
  description_ru?: string;
  grade_level: string; // e.g. 'Grade 4-5', 'Grade 6-7', 'Grade 8-9 (Inha Prep)'
  topic: string;
  topic_uz?: string;
  topic_ru?: string;
  content: LessonContent;
  practice_problems: PracticeProblem[];
  xp_reward: number;
  order_index: number;
  duration_minutes: number;
  is_free_preview: boolean;
}

export interface Track {
  id: TrackType;
  slug: string;
  title: string;
  title_uz: string;
  title_ru: string;
  description: string;
  description_uz: string;
  description_ru: string;
  icon: string;
  level: string;
  level_uz?: string;
  level_ru?: string;
  color: string;
  order_index: number;
  subjects?: Subject[];
  targetSchools: string[];
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

export interface DiagnosticQuestion {
  id: string;
  track_id: TrackType | 'general';
  subject: string;
  difficulty: 'foundation' | 'elementary' | 'intermediate' | 'exam';
  question: string;
  question_uz: string;
  question_ru: string;
  correctAnswer: string;
  expectedConcept: string;
  gapIdentifiedIfWrong: string;
  gapIdentifiedIfWrong_uz: string;
  gapIdentifiedIfWrong_ru: string;
}

export interface DiagnosticAssessment {
  id?: string;
  user_id: string;
  track_id?: TrackType;
  math_score?: number;
  english_score?: number;
  track_score?: number;
  math_level?: string;
  english_level?: string;
  overall_level?: string;
  identified_gaps: string[];
  identified_gaps_uz?: string[];
  identified_gaps_ru?: string[];
  recommendations: {
    recommendedDailyHours: number;
    recommendedWeeklyHours: number;
    intensity: 'standard' | 'intensive' | 'crash_course';
    focusAreas: string[];
    studyPlanSummary: string;
    adviceUz?: string;
    adviceRu?: string;
    adviceEn?: string;
  };
  full_transcript?: { sender: 'ai' | 'user'; text: string; category?: string }[];
  completed_at?: string;
}

export interface StudentRoadmap {
  track_id: TrackType;
  targetLyceum: string;
  currentLevel: string;
  availableMonths: number;
  recommendedDailyHours: number;
  recommendedWeeklyHours: number;
  intensity: 'standard' | 'intensive' | 'crash_course';
  gaps: string[];
  milestones: {
    title: string;
    title_uz: string;
    title_ru: string;
    targetWeek: number;
    completed: boolean;
  }[];
}

export interface TutorMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  track_id?: TrackType | string;
  language?: Language;
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
