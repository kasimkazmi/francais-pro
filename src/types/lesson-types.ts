/**
 * Lesson-related type definitions
 */

// ============================================
// Example Types
// ============================================

export interface Example {
  french: string;
  english: string;
  pronunciation?: string;
  description?: string;
  audio?: string;
}

// ============================================
// Exercise Types
// ============================================

export interface ExercisePair {
  french: string;
  pronunciations: string[];
}

export interface Exercise {
  type: string;
  question: string;
  options?: string[];
  correct?: number | number[];
  correctAnswer?: number | string;
  sentence?: string;
  alternatives?: string[];
  pairs?: ExercisePair[];
  explanation?: string;
}

export type ExerciseType = 
  | 'multiple-choice'
  | 'translation'
  | 'pronunciation'
  | 'scenario'
  | 'fill-blank'
  | 'matching';

// ============================================
// Lesson Section Types
// ============================================

export type SectionType = 'introduction' | 'learning' | 'practice' | 'review';

export interface LessonSection {
  title: string;
  type: SectionType;
  duration: number;
  content: string;
  examples?: Example[];
  exercises?: Exercise[];
}

// ============================================
// Detailed Lesson Types
// ============================================

export interface DetailedLesson {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  sections: LessonSection[];
}

// ============================================
// Exercise Result Types (for review)
// ============================================

export interface ExerciseResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  type: string;
}

// ============================================
// Difficulty Types
// ============================================

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  label: string;
  color: string;
  badgeClass: string;
  dotClass: string;
  icon: string;
}

