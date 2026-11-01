export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'student' | 'admin'
          target_lyceum: string | null
          target_direction: string | null
          target_exam_date: string | null
          available_months: number
          weekly_study_hours: number
          daily_study_hours: number
          current_level_math: string
          current_level_english: string
          onboarding_completed: boolean
          avatar_url: string | null
          streak_days: number
          total_xp: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'student' | 'admin'
          target_lyceum?: string | null
          target_direction?: string | null
          target_exam_date?: string | null
          available_months?: number
          weekly_study_hours?: number
          daily_study_hours?: number
          current_level_math?: string
          current_level_english?: string
          onboarding_completed?: boolean
          avatar_url?: string | null
          streak_days?: number
          total_xp?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: 'active' | 'inactive' | 'canceled' | 'expired' | 'trial'
          plan_name: string
          amount_uzs: number
          current_period_start: string
          current_period_end: string
          payment_method: string | null
          transaction_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'active' | 'inactive' | 'canceled' | 'expired' | 'trial'
          plan_name?: string
          amount_uzs?: number
          current_period_start?: string
          current_period_end?: string
          payment_method?: string | null
          transaction_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
      tracks: {
        Row: {
          id: string
          title: string
          title_uz: string
          title_ru: string
          description: string
          icon: string
          level: string
          color: string
          order_index: number
          created_at: string
        }
        Insert: {
          id: string
          title: string
          title_uz: string
          title_ru: string
          description: string
          icon: string
          level: string
          color?: string
          order_index?: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['tracks']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          track_id: string
          title: string
          title_uz: string | null
          title_ru: string | null
          description: string
          grade_level: string
          topic: string
          content: Json
          practice_problems: Json
          xp_reward: number
          order_index: number
          duration_minutes: number
          is_free_preview: boolean
          created_at: string
        }
        Insert: {
          id: string
          track_id: string
          title: string
          title_uz?: string | null
          title_ru?: string | null
          description: string
          grade_level: string
          topic: string
          content?: Json
          practice_problems?: Json
          xp_reward?: number
          order_index: number
          duration_minutes?: number
          is_free_preview?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          track_id: string
          completed: boolean
          score: number
          attempts: number
          completed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          track_id: string
          completed?: boolean
          score?: number
          attempts?: number
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
      diagnostic_assessments: {
        Row: {
          id: string
          user_id: string
          math_score: number
          english_score: number
          math_level: string | null
          english_level: string | null
          identified_gaps: Json
          recommendations: Json
          full_transcript: Json
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          math_score?: number
          english_score?: number
          math_level?: string | null
          english_level?: string | null
          identified_gaps?: Json
          recommendations?: Json
          full_transcript?: Json
          completed_at?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['diagnostic_assessments']['Insert']>
      }
      tutor_sessions: {
        Row: {
          id: string
          user_id: string
          track_id: string | null
          title: string | null
          messages: Json
          language: 'uz' | 'ru' | 'en'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          track_id?: string | null
          title?: string | null
          messages?: Json
          language?: 'uz' | 'ru' | 'en'
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['tutor_sessions']['Insert']>
      }
    }
  }
}

