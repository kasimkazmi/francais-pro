'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getUserProgress, 
  updateLessonProgress, 
  getLessonProgress,
  getModuleProgress,
  type UserProgress,
  type ModuleProgress,
  type LessonProgress
} from '@/lib/firebase/progress';

export function useProgress() {
  const { user, isAuthenticated } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user progress
  const loadProgress = useCallback(async () => {
    console.log('🔄 useProgress: loadProgress called', {
      isAuthenticated,
      userId: user?.uid,
      userEmail: user?.email
    });

    if (!isAuthenticated || !user) {
      console.log('⚠️ useProgress: User not authenticated, skipping progress load');
      setProgress(null);
      setLoading(false);
      return;
    }

    try {
      console.log('⏳ useProgress: Loading progress for user:', user.uid);
      setLoading(true);
      setError(null);
      const userProgress = await getUserProgress(user.uid);
      console.log('✅ useProgress: Progress loaded successfully:', userProgress);
      setProgress(userProgress);
    } catch (err) {
      console.error('❌ useProgress: Error loading progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Update lesson progress
  const updateLesson = useCallback(async (
    moduleId: string, 
    lessonId: string, 
    completed: boolean, 
    score?: number, 
    timeSpent: number = 0
  ) => {
    if (!isAuthenticated || !user) {
      throw new Error('User must be authenticated');
    }

    try {
      await updateLessonProgress(user.uid, moduleId, lessonId, completed, score, timeSpent);
      // Reload progress to get updated data
      await loadProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lesson progress');
      throw err;
    }
  }, [isAuthenticated, user, loadProgress]);

  // Get module progress
  const getModule = useCallback(async (moduleId: string): Promise<ModuleProgress | null> => {
    if (!isAuthenticated || !user) return null;
    
    try {
      return await getModuleProgress(user.uid, moduleId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get module progress');
      return null;
    }
  }, [isAuthenticated, user]);

  // Get lesson progress
  const getLesson = useCallback(async (moduleId: string, lessonId: string): Promise<LessonProgress | null> => {
    if (!isAuthenticated || !user) return null;
    
    try {
      return await getLessonProgress(user.uid, moduleId, lessonId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get lesson progress');
      return null;
    }
  }, [isAuthenticated, user]);

  // Check if lesson is completed
  const isLessonCompleted = useCallback((moduleId: string, lessonId: string): boolean => {
    if (!progress) return false;
    const lessonKey = `${moduleId}_${lessonId}`;
    return progress.lessons[lessonKey]?.completed || false;
  }, [progress]);

  // Get module completion percentage
  const getModuleProgressPercentage = useCallback((moduleId: string): number => {
    if (!progress) return 0;
    return progress.modules[moduleId]?.progress || 0;
  }, [progress]);

  // Load progress on mount and when user changes
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return {
    progress,
    loading,
    error,
    updateLesson,
    getModule,
    getLesson,
    isLessonCompleted,
    getModuleProgress: getModuleProgressPercentage,
    refreshProgress: loadProgress
  };
}
