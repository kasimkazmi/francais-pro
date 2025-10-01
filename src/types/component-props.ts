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
  totalTime: string;
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

export interface MultipleChoiceExerciseProps {
  question: string;
  options: string[];
  userAnswer: number | null;
  correctAnswer: number;
  isSubmitted: boolean;
  onAnswerSelect: (answer: number) => void;
  explanation?: string;
}

export interface FillBlankExerciseProps {
  question: string;
  sentence: string;
  alternatives: string[];
  correctAnswer: string;
  userAnswer: string | null;
  isSubmitted: boolean;
  onAnswerSelect: (answer: string) => void;
  explanation?: string;
}

// ============================================
// Exercise Renderer (if still needed)
// ============================================

export interface BaseExercise {
  id: string;
  type: string;
  question: string;
  explanation?: string;
}

export interface MultipleChoiceExerciseData extends BaseExercise {
  type: 'multiple-choice' | 'translation' | 'pronunciation';
  options: string[];
  correctAnswer: number;
}

export interface FillBlankExerciseData extends BaseExercise {
  type: 'fill-blank';
  sentence: string;
  correctAnswer: string;
  alternatives: string[];
}

export type ExerciseData = MultipleChoiceExerciseData | FillBlankExerciseData;

export interface ExerciseRendererProps {
  exercise: ExerciseData;
  userAnswer: number | string | null;
  isSubmitted: boolean;
  onAnswerSelect: (answer: number | string) => void;
}

