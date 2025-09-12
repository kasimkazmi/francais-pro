import { 
  collection, 
  query, 
  orderBy, 
  limit,
  getDocs,
  doc,
  setDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface PublicLeaderboardEntry {
  uid: string;
  displayName: string;
  totalLessonsCompleted: number;
  totalTimeSpent: number;
  currentStreak: number;
  longestStreak: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  wordsLearned: number;
  overallProgress: number;
  lastActiveDate: Timestamp;
  modules: Record<string, {
    moduleId: string;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
    completed: boolean;
  }>;
  rank?: number;
}

export interface ModuleLeaderboardEntry {
  uid: string;
  displayName: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  completed: boolean;
  completedAt?: Timestamp;
  rank?: number;
}

export interface ModuleLeaderboard {
  moduleId: string;
  moduleName: string;
  rankings: ModuleLeaderboardEntry[];
}

// Get overall leaderboard from public collection
export async function getPublicOverallLeaderboard(limitCount: number = 10): Promise<PublicLeaderboardEntry[]> {
  try {
    // Read from userProgress collection instead of leaderboard collection
    const progressRef = collection(db, 'userProgress');
    const q = query(
      progressRef,
      orderBy('totalLessonsCompleted', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const leaderboard: PublicLeaderboardEntry[] = [];
    
    querySnapshot.forEach((docSnap, index) => {
      const data = docSnap.data();
      
      // Calculate overall progress percentage
      const overallProgress = data.totalLessonsCompleted ? Math.round((data.totalLessonsCompleted / 13) * 100) : 0;
      
      leaderboard.push({
        uid: docSnap.id,
        displayName: data.displayName || 'Anonymous',
        totalLessonsCompleted: data.totalLessonsCompleted || 0,
        totalTimeSpent: data.totalTimeSpent || 0,
        currentStreak: data.currentStreak || 0,
        longestStreak: data.longestStreak || 0,
        level: data.level || 'beginner',
        wordsLearned: data.wordsLearned || 0,
        overallProgress: overallProgress,
        lastActiveDate: data.lastActiveDate || Timestamp.now(),
        modules: data.modules || {},
        rank: index + 1
      });
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error getting public overall leaderboard:', error);
    return [];
  }
}

// Get module-specific leaderboard from public collection
export async function getPublicModuleLeaderboard(moduleId: string, limitCount: number = 10): Promise<ModuleLeaderboard | null> {
  try {
    // Read from userProgress collection instead of leaderboard collection
    const progressRef = collection(db, 'userProgress');
    const q = query(progressRef);
    
    const querySnapshot = await getDocs(q);
    const moduleRankings: ModuleLeaderboardEntry[] = [];
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const moduleData = data.modules?.[moduleId];
      
      if (moduleData) {
        moduleRankings.push({
          uid: docSnap.id,
          displayName: data.displayName || 'Anonymous',
          progress: moduleData.progress || 0,
          lessonsCompleted: moduleData.lessonsCompleted || 0,
          totalLessons: moduleData.totalLessons || 0,
          completed: moduleData.completed || false,
          completedAt: moduleData.completedAt
        });
      }
    });
    
    // Sort by progress (descending)
    moduleRankings.sort((a, b) => b.progress - a.progress);
    
    // Add ranks
    moduleRankings.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    
    const moduleNames: Record<string, string> = {
      'foundations': 'Foundations',
      'grammar': 'Grammar',
      'vocabulary': 'Vocabulary',
      'practice': 'Practice'
    };
    
    return {
      moduleId,
      moduleName: moduleNames[moduleId] || moduleId,
      rankings: moduleRankings.slice(0, limitCount)
    };
  } catch (error) {
    console.error('Error getting public module leaderboard:', error);
    return null;
  }
}

// Get user's rank in overall leaderboard
export async function getUserOverallRank(uid: string): Promise<number> {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(leaderboardRef, orderBy('totalLessonsCompleted', 'desc'));
    
    const querySnapshot = await getDocs(q);
    let rank = 1;
    
    for (const docSnap of querySnapshot.docs) {
      if (docSnap.id === uid) {
        return rank;
      }
      rank++;
    }
    
    return -1; // User not found
  } catch (error) {
    console.error('Error getting user rank:', error);
    return -1;
  }
}

// Get user's rank in module leaderboard
export async function getUserModuleRank(uid: string, moduleId: string): Promise<number> {
  try {
    const moduleLeaderboard = await getPublicModuleLeaderboard(moduleId, 1000); // Get all users
    
    if (!moduleLeaderboard) return -1;
    
    const userIndex = moduleLeaderboard.rankings.findIndex(entry => entry.uid === uid);
    return userIndex >= 0 ? userIndex + 1 : -1;
  } catch (error) {
    console.error('Error getting user module rank:', error);
    return -1;
  }
}

// Get leaderboard statistics
export async function getPublicLeaderboardStats(): Promise<{
  totalUsers: number;
  totalLessonsCompleted: number;
  averageProgress: number;
  topStreak: number;
}> {
  try {
    // Read from userProgress collection instead of leaderboard collection
    const progressRef = collection(db, 'userProgress');
    const querySnapshot = await getDocs(progressRef);
    
    let totalUsers = 0;
    let totalLessonsCompleted = 0;
    let totalProgress = 0;
    let topStreak = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalUsers++;
      totalLessonsCompleted += data.totalLessonsCompleted || 0;
      
      // Calculate progress percentage based on lessons completed
      const progressPercentage = data.totalLessonsCompleted ? Math.round((data.totalLessonsCompleted / 13) * 100) : 0;
      totalProgress += progressPercentage;
      
      topStreak = Math.max(topStreak, data.longestStreak || 0);
    });
    
    return {
      totalUsers,
      totalLessonsCompleted,
      averageProgress: totalUsers > 0 ? Math.round(totalProgress / totalUsers) : 0,
      topStreak
    };
  } catch (error) {
    console.error('Error getting leaderboard stats:', error);
    return {
      totalUsers: 0,
      totalLessonsCompleted: 0,
      averageProgress: 0,
      topStreak: 0
    };
  }
}

// Sync user progress to public leaderboard (called when user progress updates)
export async function syncUserToLeaderboard(uid: string, userData: Record<string, unknown>): Promise<void> {
  try {
    const leaderboardRef = doc(db, 'leaderboard', uid);
    
    // Only sync public data, not sensitive information
    const publicData = {
      displayName: userData.displayName || 'Anonymous',
      totalLessonsCompleted: userData.totalLessonsCompleted || 0,
      totalTimeSpent: userData.totalTimeSpent || 0,
      currentStreak: userData.currentStreak || 0,
      longestStreak: userData.longestStreak || 0,
      level: userData.level || 'beginner',
      wordsLearned: userData.wordsLearned || 0,
      overallProgress: userData.totalLessonsCompleted ? Math.round((userData.totalLessonsCompleted / 13) * 100) : 0,
      lastActiveDate: userData.lastActiveDate || Timestamp.now(),
      modules: userData.modules || {}
    };
    
    await setDoc(leaderboardRef, publicData, { merge: true });
  } catch (error) {
    console.error('Error syncing user to leaderboard:', error);
  }
}
