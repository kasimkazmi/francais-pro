/**
 * Component Props Type Definitions
 * Centralized props interfaces for all learning components
 */

import { Module, Lesson } from './index';
import { Example, Exercise, ExerciseResult, SectionType } from './lesson-types';

// ============================================
// Learn Layout Components
// ============================================

export interface LearnHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  isLearnHome: boolean;
  currentModule?: Module | null;
  currentLesson?: Lesson | null;
  currentModuleId: string | null;
  currentLessonId: string | null;
  previousLesson?: Lesson | null;
  nextLesson?: Lesson | null;
}

export interface LearnSidebarProps {
  sidebarOpen: boolean;
  overallProgress: number;
  completedCount: number;
  totalTime: { value: string; unit: string };
  currentModule?: Module | null;
  currentModuleId: string | null;
  currentLessonId: string | null;
  progress: Record<string, number> | null;
}

// ============================================
// Lesson Components
// ============================================

export interface LessonSectionProps {
  title: string;
  type: SectionType;
  content: string;
  sectionNumber: number;
  totalSections: number;
  timeSpent: number;
  examples?: Example[];
  exercises?: Exercise[];
  onPlayAudio?: (text: string) => void;
  onExerciseComplete?: (answers: Record<number, number | number[]>) => void;
  onExerciseFinish?: () => void;
  onTrackWrongAnswer?: (result: ExerciseResult) => void;
  wrongAnswers?: ExerciseResult[];
  correctAnswers?: number;
  totalExercises?: number;
  score?: number;
  difficulty?: string;
}

export interface LessonCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  score: number;
  timeSpent: number;
  xpEarned: number;
  onNextLesson?: () => void;
  onReview: () => void;
  hasNextLesson: boolean;
}

export interface LessonReviewProps {
  totalExercises: number;
  correctAnswers: number;
  wrongAnswers: ExerciseResult[];
  score: number;
  timeSpent: number;
  difficulty: string;
}

// ============================================
// Exercise Components
// ============================================

export interface ExerciseQuizProps {
  exercises: Exercise[];
  onComplete: (answers: Record<number, number | number[]>) => void;
  onFinish?: () => void;
  onTrackWrongAnswer?: (result: ExerciseResult) => void;
}

export interface ExampleListProps {
  examples: Example[];
  sectionType: SectionType;
  onPlayAudio?: (text: string) => void;
}

// Old exercise component props removed - using ExerciseQuiz instead

