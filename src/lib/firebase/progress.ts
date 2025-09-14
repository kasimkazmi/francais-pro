import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';
import { db, auth } from './config';
import { syncUserToLeaderboard } from './leaderboard-public';
import { logUserActivity } from './user-storage';

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  completedAt?: Timestamp;
  attempts: number;
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  progress: number; // percentage 0-100
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: Timestamp;
}

export interface UserProgress {
  uid: string;
  displayName?: string;
  totalLessonsCompleted: number;
  totalTimeSpent: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: Timestamp;
  level: 'beginner' | 'intermediate' | 'advanced';
  wordsLearned: number;
  modules: Record<string, ModuleProgress>;
  lessons: Record<string, LessonProgress>;
}

// Helper function to calculate streak
export function calculateStreak(lastActiveDate: Timestamp, currentStreak: number): {
  currentStreak: number;
  isNewStreak: boolean;
} {
  const today = new Date();
  const lastActive = lastActiveDate.toDate();
  const daysDifference = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
  
  let newCurrentStreak = currentStreak;
  let isNewStreak = false;
  
  if (daysDifference === 0) {
    // Same day - maintain current streak
    newCurrentStreak = currentStreak;
  } else if (daysDifference === 1) {
    // Consecutive day - increment streak
    newCurrentStreak = currentStreak + 1;
    isNewStreak = true;
  } else {
    // More than 1 day gap - reset streak to 1 (starting fresh)
    newCurrentStreak = 1;
    isNewStreak = true;
  }
  
  return {
    currentStreak: newCurrentStreak,
    isNewStreak
  };
}

// Get user progress
export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  try {
    console.log('📊 Getting user progress for UID:', uid);
    console.log('🔐 Current auth state:', auth.currentUser?.uid);
    
    const docRef = doc(db, 'userProgress', uid);
    console.log('📄 Document reference:', docRef.path);
    
    const docSnap = await getDoc(docRef);
    console.log('📋 Document exists:', docSnap.exists());
    
    if (docSnap.exists()) {
      const data = docSnap.data() as UserProgress;
      console.log('✅ User progress data retrieved:', data);
      return data;
    }
    
    console.log('ℹ️ No progress data found for user');
    return null;
  } catch (error) {
    console.error('❌ Error getting user progress:', error);
    console.error('🔍 Error details:', {
      code: (error as Error)?.message,
      message: (error as Error)?.message,
      uid: uid,
      currentUser: auth.currentUser?.uid
    });
    return null;
  }
}

// Initialize user progress
export async function initializeUserProgress(uid: string, displayName?: string): Promise<UserProgress> {
  const initialProgress: UserProgress = {
    uid,
    displayName: displayName || 'Anonymous',
    totalLessonsCompleted: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: Timestamp.now(),
    level: 'beginner',
    wordsLearned: 0,
    modules: {},
    lessons: {}
  };

  try {
    await setDoc(doc(db, 'userProgress', uid), initialProgress);
    return initialProgress;
  } catch (error) {
    console.error('Error initializing user progress:', error);
    throw error;
  }
}

// Update lesson progress
export async function updateLessonProgress(
  uid: string, 
  moduleId: string, 
  lessonId: string, 
  completed: boolean, 
  score?: number, 
  timeSpent: number = 0
): Promise<void> {
  try {
    const userProgressRef = doc(db, 'userProgress', uid);
    
    // Check if document exists first
    const docSnap = await getDoc(userProgressRef);
    let userProgress: UserProgress;
    
    if (docSnap.exists()) {
      userProgress = docSnap.data() as UserProgress;
    } else {
      // Initialize if document doesn't exist
      userProgress = await initializeUserProgress(uid);
    }
    
    const lessonKey = `${moduleId}_${lessonId}`;
    const existingLesson = userProgress.lessons[lessonKey];
    
    const lessonProgress: LessonProgress = {
      lessonId,
      moduleId,
      completed,
      score,
      timeSpent: (existingLesson?.timeSpent || 0) + timeSpent,
      completedAt: completed ? Timestamp.now() : undefined,
      attempts: (existingLesson?.attempts || 0) + 1
    };

    // Update lesson progress
    const updatedLessons = {
      ...userProgress.lessons,
      [lessonKey]: lessonProgress
    };

    // Update module progress
    const moduleLessons = Object.values(updatedLessons).filter(l => l.moduleId === moduleId);
    const completedModuleLessons = moduleLessons.filter(l => l.completed).length;
    const totalModuleLessons = moduleLessons.length;
    
    const moduleProgress: ModuleProgress = {
      moduleId,
      completed: completedModuleLessons === totalModuleLessons,
      progress: totalModuleLessons > 0 ? Math.round((completedModuleLessons / totalModuleLessons) * 100) : 0,
      lessonsCompleted: completedModuleLessons,
      totalLessons: totalModuleLessons,
      lastAccessed: Timestamp.now()
    };

    const updatedModules = {
      ...userProgress.modules,
      [moduleId]: moduleProgress
    };

    // Calculate overall stats
    const totalLessonsCompleted = Object.values(updatedLessons).filter(l => l.completed).length;
    const totalTimeSpent = Object.values(updatedLessons).reduce((sum, l) => sum + l.timeSpent, 0);
    
    // Update streak with proper consecutive day validation
    const { currentStreak } = calculateStreak(userProgress.lastActiveDate, userProgress.currentStreak);
    
    // Determine level based on progress
    let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (totalLessonsCompleted >= 20) level = 'advanced';
    else if (totalLessonsCompleted >= 10) level = 'intermediate';

    const updatedProgress: Partial<UserProgress> = {
      totalLessonsCompleted,
      totalTimeSpent,
      currentStreak,
      longestStreak: Math.max(userProgress.longestStreak, currentStreak),
      lastActiveDate: Timestamp.now(),
      level,
      wordsLearned: totalLessonsCompleted * 5, // Estimate 5 words per lesson
      modules: updatedModules,
      lessons: updatedLessons
    };

    // Include display name if available from current user
    const userProfile = auth.currentUser;
    if (userProfile && userProfile.displayName) {
      updatedProgress.displayName = userProfile.displayName;
    }
    
    await updateDoc(userProgressRef, updatedProgress);
    
    // Log activity if lesson was completed
    if (completed) {
      try {
        // Generate a session ID for activity logging (simplified)
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await logUserActivity(uid, 'lesson_complete', {
          lessonId,
          moduleId,
          score,
          timeSpent,
          deviceInfo: navigator.platform,
          userAgent: navigator.userAgent,
        }, sessionId);
      } catch (activityError) {
        console.error('Error logging lesson completion activity:', activityError);
        // Don't throw - this is not critical
      }
    } else {
      // Log lesson start activity
      try {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        await logUserActivity(uid, 'lesson_start', {
          lessonId,
          moduleId,
          timeSpent,
          deviceInfo: navigator.platform,
          userAgent: navigator.userAgent,
        }, sessionId);
      } catch (activityError) {
        console.error('Error logging lesson start activity:', activityError);
        // Don't throw - this is not critical
      }
    }
    
    // Sync to public leaderboard
    try {
      if (userProfile) {
        await syncUserToLeaderboard(uid, {
          displayName: userProfile.displayName || 'Anonymous',
          ...updatedProgress
        });
      }
    } catch (syncError) {
      console.error('Error syncing to leaderboard:', syncError);
      // Don't throw - this is not critical
    }
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    throw error;
  }
}

// Get module progress
export async function getModuleProgress(uid: string, moduleId: string): Promise<ModuleProgress | null> {
  try {
    const userProgress = await getUserProgress(uid);
    return userProgress?.modules[moduleId] || null;
  } catch (error) {
    console.error('Error getting module progress:', error);
    return null;
  }
}

// Get lesson progress
export async function getLessonProgress(uid: string, moduleId: string, lessonId: string): Promise<LessonProgress | null> {
  try {
    const userProgress = await getUserProgress(uid);
    const lessonKey = `${moduleId}_${lessonId}`;
    return userProgress?.lessons[lessonKey] || null;
  } catch (error) {
    console.error('Error getting lesson progress:', error);
    return null;
  }
}

// Update user display name in progress
export async function updateUserDisplayName(uid: string, displayName: string): Promise<void> {
  try {
    const userProgressRef = doc(db, 'userProgress', uid);
    
    // Check if document exists first
    const docSnap = await getDoc(userProgressRef);
    
    if (docSnap.exists()) {
      await updateDoc(userProgressRef, {
        displayName: displayName
      });
    } else {
      // Initialize document with display name if it doesn't exist
      await initializeUserProgress(uid, displayName);
    }
  } catch (error) {
    console.error('Error updating user display name:', error);
    throw error;
  }
}
