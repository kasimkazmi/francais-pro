// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  streak: number;
  totalXP: number;
  createdAt: Date;
  updatedAt: Date;
}

// Learning content types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'writing' | 'listening';
  completed: boolean;
  xpReward: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  color: string;
  icon: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'pronunciation';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

// Progress tracking types
export interface Progress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  completedAt: Date;
}

export interface UserStats {
  userId: string;
  totalLessonsCompleted: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  timeSpent: number;
  lastActiveAt: Date;
}

// UI types
export interface NavigationItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
}
