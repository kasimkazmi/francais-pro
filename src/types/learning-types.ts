// Enhanced Learning System Types

export type LessonType = 'vocabulary' | 'grammar' | 'conversation' | 'pronunciation' | 'listening' | 'reading';
export type ActivityType = 'flashcard' | 'fill-blank' | 'word-order' | 'speaking' | 'listening' | 'multiple-choice' | 'drag-drop' | 'audio-match';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';
export type SkillType = 'vocabulary' | 'grammar' | 'pronunciation' | 'listening' | 'speaking' | 'reading' | 'writing';

// Base lesson structure
export interface BaseLesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  difficulty: DifficultyLevel;
  estimatedTime: number; // in minutes
  xpReward: number;
  prerequisites: string[];
  skills: SkillType[];
  completed: boolean;
  unlocked: boolean;
}

// Step content for interactive lessons
export interface LessonStep {
  id: string;
  type: 'introduction' | 'learning' | 'practice' | 'assessment' | 'review';
  title: string;
  content: string;
  duration: number; // in seconds
  interactive: boolean;
  media?: {
    type: 'image' | 'audio' | 'video';
    url: string;
    alt?: string;
  };
}

// Activity content
export interface ActivityContent {
  id: string;
  type: ActivityType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  audioUrl?: string;
  imageUrl?: string;
  hints?: string[];
  difficulty: DifficultyLevel;
  xpReward: number;
}

// Assessment structure
export interface Assessment {
  id: string;
  questions: ActivityContent[];
  passingScore: number; // percentage
  timeLimit?: number; // in seconds
  retryAllowed: boolean;
  maxRetries: number;
}

// Enhanced lesson with interactive elements
export interface InteractiveLesson extends BaseLesson {
  steps: LessonStep[];
  activities: ActivityContent[];
  assessment: Assessment;
  reviewSchedule: ReviewItem[];
}

// Spaced repetition system
export interface ReviewItem {
  lessonId: string;
  nextReview: Date;
  interval: number; // days
  easeFactor: number;
  repetitions: number;
  lastReviewed: Date;
}

// Learning progress tracking
export interface LearningProgress {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  completedLessons: string[];
  currentLesson?: string;
  skillLevels: Record<SkillType, number>;
  weakAreas: SkillType[];
  reviewQueue: ReviewItem[];
  achievements: Achievement[];
  dailyGoal: number;
  weeklyGoal: number;
  lastActiveDate: Date;
}

// Achievement system
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'xp' | 'lessons' | 'skills' | 'special';
  requirement: {
    type: string;
    value: number;
  };
  unlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
}

// Learning module with enhanced structure
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  progress: number;
  unlocked: boolean;
  prerequisites: string[];
  lessons: InteractiveLesson[];
  totalXP: number;
  estimatedTime: number; // total time for all lessons
  skills: SkillType[];
}

// Learning path structure
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: DifficultyLevel;
  modules: string[]; // module IDs in order
  totalXP: number;
  estimatedTime: number;
  unlocked: boolean;
  progress: number;
}

// User learning statistics
export interface LearningStats {
  totalLessonsCompleted: number;
  totalTimeSpent: number; // in minutes
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  favoriteSkill: SkillType;
  weakestSkill: SkillType;
  weeklyProgress: {
    date: string;
    lessonsCompleted: number;
    xpEarned: number;
    timeSpent: number;
  }[];
}

// Activity result tracking
export interface ActivityResult {
  activityId: string;
  lessonId: string;
  correct: boolean;
  timeSpent: number; // in seconds
  attempts: number;
  xpEarned: number;
  completedAt: Date;
}

// Learning session tracking
export interface LearningSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  lessonsCompleted: string[];
  activitiesCompleted: ActivityResult[];
  totalXP: number;
  totalTime: number;
  streakMaintained: boolean;
}
