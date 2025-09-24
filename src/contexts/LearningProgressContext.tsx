'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  LearningProgress, 
  Achievement, 
  ReviewItem, 
  ActivityResult,
  LearningSession,
  SkillType
} from '@/types/learning-types';
import { enhancedLearningModules, achievements } from '@/data/enhanced-learning-content';

interface LearningProgressContextType {
  // Progress data
  progress: LearningProgress | null;
  loading: boolean;
  error: string | null;
  
  // Lesson management
  completeLesson: (lessonId: string, xpEarned: number) => Promise<void>;
  startLesson: (lessonId: string) => Promise<void>;
  unlockLesson: (lessonId: string) => Promise<void>;
  
  // Activity management
  completeActivity: (activityId: string, lessonId: string, correct: boolean, timeSpent: number) => Promise<void>;
  
  // XP and leveling
  addXP: (xp: number) => Promise<void>;
  getCurrentLevel: () => number;
  getXPForNextLevel: () => number;
  
  // Streak management
  updateStreak: () => Promise<void>;
  getStreakStatus: () => { current: number; longest: number; daysUntilReset: number };
  
  // Achievements
  checkAchievements: () => Promise<Achievement[]>;
  getUnlockedAchievements: () => Achievement[];
  
  // Review system
  getReviewQueue: () => ReviewItem[];
  addToReviewQueue: (lessonId: string) => Promise<void>;
  completeReview: (lessonId: string, correct: boolean) => Promise<void>;
  
  // Statistics
  getLearningStats: () => {
    totalLessonsCompleted: number;
    totalTimeSpent: number;
    averageAccuracy: number;
    currentStreak: number;
    longestStreak: number;
    favoriteSkill: SkillType;
    weakestSkill: SkillType;
  };
  
  // Session management
  startSession: () => Promise<void>;
  endSession: () => Promise<void>;
  getCurrentSession: () => LearningSession | null;
}

const LearningProgressContext = createContext<LearningProgressContextType | undefined>(undefined);

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null);

  // Initialize progress for new users
  const initializeProgress = useCallback(async (uid: string) => {
    const initialProgress: LearningProgress = {
      userId: uid,
      currentStreak: 0,
      longestStreak: 0,
      totalXP: 0,
      level: 1,
      completedLessons: [],
      skillLevels: {
        vocabulary: 0,
        grammar: 0,
        pronunciation: 0,
        listening: 0,
        speaking: 0,
        reading: 0,
        writing: 0
      },
      weakAreas: [],
      reviewQueue: [],
      achievements: achievements.map(achievement => ({ ...achievement, unlocked: false })),
      dailyGoal: 100,
      weeklyGoal: 500,
      lastActiveDate: new Date()
    };

    setProgress(initialProgress);
    return initialProgress;
  }, []);

  // Load user progress
  const loadProgress = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // In a real app, this would load from Firebase
      // For now, we'll use localStorage
      const savedProgress = localStorage.getItem(`learning-progress-${user.uid}`);
      
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setProgress(parsedProgress);
      } else {
        await initializeProgress(user.uid);
      }
    } catch (err) {
      setError('Failed to load learning progress');
      console.error('Error loading progress:', err);
    } finally {
      setLoading(false);
    }
  }, [user, initializeProgress]);

  // Save progress to localStorage (in real app, this would be Firebase)
  const saveProgress = useCallback(async (newProgress: LearningProgress) => {
    if (!user) return;

    try {
      localStorage.setItem(`learning-progress-${user.uid}`, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  }, [user]);

  // Complete a lesson
  const completeLesson = useCallback(async (lessonId: string, xpEarned: number) => {
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonId],
      totalXP: progress.totalXP + xpEarned,
      lastActiveDate: new Date()
    };

    await saveProgress(updatedProgress);
    await checkAchievements();
  }, [progress, saveProgress]);

  // Start a lesson
  const startLesson = useCallback(async (lessonId: string) => {
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      currentLesson: lessonId
    };

    await saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  // Unlock a lesson
  const unlockLesson = useCallback(async (lessonId: string) => {
    if (!progress) return;

    // Find the lesson and unlock it
    const module = enhancedLearningModules.find(m => 
      m.lessons.some(l => l.id === lessonId)
    );
    
    if (module) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        lesson.unlocked = true;
        await saveProgress(progress);
      }
    }
  }, [progress, saveProgress]);

  // Complete an activity
  const completeActivity = useCallback(async (
    activityId: string, 
    lessonId: string, 
    correct: boolean, 
    timeSpent: number
  ) => {
    if (!progress) return;

    const activityResult: ActivityResult = {
      activityId,
      lessonId,
      correct,
      timeSpent,
      attempts: 1,
      xpEarned: correct ? 20 : 0,
      completedAt: new Date()
    };

    // Update skill levels based on activity type
    const lesson = enhancedLearningModules
      .flatMap(m => m.lessons)
      .find(l => l.id === lessonId);

    if (lesson) {
      const updatedSkillLevels = { ...progress.skillLevels };
      lesson.skills.forEach(skill => {
        if (correct) {
          updatedSkillLevels[skill] = Math.min(updatedSkillLevels[skill] + 1, 10);
        }
      });

      const updatedProgress = {
        ...progress,
        skillLevels: updatedSkillLevels,
        totalXP: progress.totalXP + activityResult.xpEarned
      };

      await saveProgress(updatedProgress);
    }
  }, [progress, saveProgress]);

  // Add XP
  const addXP = useCallback(async (xp: number) => {
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      totalXP: progress.totalXP + xp
    };

    await saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  // Get current level
  const getCurrentLevel = useCallback(() => {
    if (!progress) return 1;
    return Math.floor(progress.totalXP / 1000) + 1;
  }, [progress]);

  // Get XP needed for next level
  const getXPForNextLevel = useCallback(() => {
    if (!progress) return 1000;
    const currentLevel = getCurrentLevel();
    const nextLevelXP = currentLevel * 1000;
    return nextLevelXP - progress.totalXP;
  }, [progress, getCurrentLevel]);

  // Update streak
  const updateStreak = useCallback(async () => {
    if (!progress) return;

    const today = new Date();
    const lastActive = new Date(progress.lastActiveDate);
    const daysDifference = Math.floor(
      (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak = progress.currentStreak;
    let newLongestStreak = progress.longestStreak;

    if (daysDifference === 1) {
      // Consecutive day - increment streak
      newStreak = progress.currentStreak + 1;
      newLongestStreak = Math.max(newLongestStreak, newStreak);
    } else if (daysDifference > 1) {
      // More than 1 day gap - reset streak
      newStreak = 1;
    }

    const updatedProgress = {
      ...progress,
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActiveDate: today
    };

    await saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  // Get streak status
  const getStreakStatus = useCallback(() => {
    if (!progress) return { current: 0, longest: 0, daysUntilReset: 0 };

    const today = new Date();
    const lastActive = new Date(progress.lastActiveDate);
    const daysDifference = Math.floor(
      (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      current: progress.currentStreak,
      longest: progress.longestStreak,
      daysUntilReset: daysDifference === 0 ? 0 : 1
    };
  }, [progress]);

  // Check achievements
  const checkAchievements = useCallback(async (): Promise<Achievement[]> => {
    if (!progress) return [];

    const newAchievements: Achievement[] = [];

    for (const achievement of progress.achievements) {
      if (achievement.unlocked) continue;

      let shouldUnlock = false;

      switch (achievement.requirement.type) {
        case 'lessons_completed':
          shouldUnlock = progress.completedLessons.length >= achievement.requirement.value;
          break;
        case 'streak':
          shouldUnlock = progress.currentStreak >= achievement.requirement.value;
          break;
        case 'xp':
          shouldUnlock = progress.totalXP >= achievement.requirement.value;
          break;
        case 'skill_level':
          shouldUnlock = Object.values(progress.skillLevels).some(level => level >= achievement.requirement.value);
          break;
      }

      if (shouldUnlock) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
        newAchievements.push(achievement);
      }
    }

    if (newAchievements.length > 0) {
      await saveProgress(progress);
    }

    return newAchievements;
  }, [progress, saveProgress]);

  // Get unlocked achievements
  const getUnlockedAchievements = useCallback(() => {
    if (!progress) return [];
    return progress.achievements.filter(a => a.unlocked);
  }, [progress]);

  // Get review queue
  const getReviewQueue = useCallback(() => {
    if (!progress) return [];
    return progress.reviewQueue.filter(item => new Date(item.nextReview) <= new Date());
  }, [progress]);

  // Add to review queue
  const addToReviewQueue = useCallback(async (lessonId: string) => {
    if (!progress) return;

    const reviewItem: ReviewItem = {
      lessonId,
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
      interval: 1,
      easeFactor: 2.5,
      repetitions: 0,
      lastReviewed: new Date()
    };

    const updatedProgress = {
      ...progress,
      reviewQueue: [...progress.reviewQueue, reviewItem]
    };

    await saveProgress(updatedProgress);
  }, [progress, saveProgress]);

  // Complete review
  const completeReview = useCallback(async (lessonId: string, correct: boolean) => {
    if (!progress) return;

    const reviewItem = progress.reviewQueue.find(item => item.lessonId === lessonId);
    if (!reviewItem) return;

    // Update review item based on spaced repetition algorithm
    if (correct) {
      reviewItem.repetitions += 1;
      if (reviewItem.repetitions === 1) {
        reviewItem.interval = 1;
      } else if (reviewItem.repetitions === 2) {
        reviewItem.interval = 6;
      } else {
        reviewItem.interval = Math.round(reviewItem.interval * reviewItem.easeFactor);
      }
      reviewItem.easeFactor = Math.max(1.3, reviewItem.easeFactor + 0.1);
    } else {
      reviewItem.repetitions = 0;
      reviewItem.interval = 1;
      reviewItem.easeFactor = Math.max(1.3, reviewItem.easeFactor - 0.2);
    }

    reviewItem.nextReview = new Date(Date.now() + reviewItem.interval * 24 * 60 * 60 * 1000);
    reviewItem.lastReviewed = new Date();

    await saveProgress(progress);
  }, [progress, saveProgress]);

  // Get learning statistics
  const getLearningStats = useCallback(() => {
    if (!progress) {
      return {
        totalLessonsCompleted: 0,
        totalTimeSpent: 0,
        averageAccuracy: 0,
        currentStreak: 0,
        longestStreak: 0,
        favoriteSkill: 'vocabulary' as SkillType,
        weakestSkill: 'vocabulary' as SkillType
      };
    }

    const favoriteSkill = Object.entries(progress.skillLevels)
      .reduce((a, b) => progress.skillLevels[a[0]] > progress.skillLevels[b[0]] ? a : b)[0] as SkillType;

    const weakestSkill = Object.entries(progress.skillLevels)
      .reduce((a, b) => progress.skillLevels[a[0]] < progress.skillLevels[b[0]] ? a : b)[0] as SkillType;

    return {
      totalLessonsCompleted: progress.completedLessons.length,
      totalTimeSpent: 0, // Would be calculated from activity results
      averageAccuracy: 0, // Would be calculated from activity results
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      favoriteSkill,
      weakestSkill
    };
  }, [progress]);

  // Start session
  const startSession = useCallback(async () => {
    if (!user) return;

    const session: LearningSession = {
      id: `session-${Date.now()}`,
      userId: user.uid,
      startTime: new Date(),
      lessonsCompleted: [],
      activitiesCompleted: [],
      totalXP: 0,
      totalTime: 0,
      streakMaintained: false
    };

    setCurrentSession(session);
  }, [user]);

  // End session
  const endSession = useCallback(async () => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      endTime: new Date(),
      totalTime: new Date().getTime() - currentSession.startTime.getTime()
    };

    setCurrentSession(null);
    return updatedSession;
  }, [currentSession]);

  // Get current session
  const getCurrentSession = useCallback(() => {
    return currentSession;
  }, [currentSession]);

  // Load progress when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProgress();
    } else {
      setProgress(null);
      setLoading(false);
    }
  }, [isAuthenticated, user, loadProgress]);

  const value: LearningProgressContextType = {
    progress,
    loading,
    error,
    completeLesson,
    startLesson,
    unlockLesson,
    completeActivity,
    addXP,
    getCurrentLevel,
    getXPForNextLevel,
    updateStreak,
    getStreakStatus,
    checkAchievements,
    getUnlockedAchievements,
    getReviewQueue,
    addToReviewQueue,
    completeReview,
    getLearningStats,
    startSession,
    endSession,
    getCurrentSession
  };

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
}

export function useLearningProgress() {
  const context = useContext(LearningProgressContext);
  if (context === undefined) {
    throw new Error('useLearningProgress must be used within a LearningProgressProvider');
  }
  return context;
}
