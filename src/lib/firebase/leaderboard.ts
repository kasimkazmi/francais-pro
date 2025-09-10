import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  doc,
  getDoc,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  email: string;
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
}

export interface ModuleLeaderboard {
  moduleId: string;
  moduleName: string;
  rankings: Array<{
    uid: string;
    displayName: string;
    progress: number;
    lessonsCompleted: number;
    totalLessons: number;
    completed: boolean;
    completedAt?: Timestamp;
  }>;
}

// Get overall leaderboard (top users by total progress)
export async function getOverallLeaderboard(limitCount: number = 10): Promise<LeaderboardEntry[]> {
  try {
    const usersRef = collection(db, 'userProgress');
    const q = query(
      usersRef,
      orderBy('totalLessonsCompleted', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const leaderboard: LeaderboardEntry[] = [];
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      const userProfile = await getUserProfile(docSnap.id);
      
      if (userProfile) {
        leaderboard.push({
          uid: docSnap.id,
          displayName: userProfile.displayName || 'Anonymous',
          email: userProfile.email || '',
          totalLessonsCompleted: data.totalLessonsCompleted || 0,
          totalTimeSpent: data.totalTimeSpent || 0,
          currentStreak: data.currentStreak || 0,
          longestStreak: data.longestStreak || 0,
          level: data.level || 'beginner',
          wordsLearned: data.wordsLearned || 0,
          overallProgress: data.totalLessonsCompleted ? Math.round((data.totalLessonsCompleted / 13) * 100) : 0,
          lastActiveDate: data.lastActiveDate || Timestamp.now(),
          modules: data.modules || {}
        });
      }
    }
    
    return leaderboard;
  } catch (error) {
    console.error('Error getting overall leaderboard:', error);
    return [];
  }
}

// Get module-specific leaderboard
export async function getModuleLeaderboard(moduleId: string, limitCount: number = 10): Promise<ModuleLeaderboard | null> {
  try {
    const usersRef = collection(db, 'userProgress');
    const q = query(usersRef);
    
    const querySnapshot = await getDocs(q);
    const moduleRankings: Array<{
      uid: string;
      displayName: string;
      progress: number;
      lessonsCompleted: number;
      totalLessons: number;
      completed: boolean;
      completedAt?: Timestamp;
    }> = [];
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      const moduleData = data.modules?.[moduleId];
      
      if (moduleData) {
        const userProfile = await getUserProfile(docSnap.id);
        
        if (userProfile) {
          moduleRankings.push({
            uid: docSnap.id,
            displayName: userProfile.displayName || 'Anonymous',
            progress: moduleData.progress || 0,
            lessonsCompleted: moduleData.lessonsCompleted || 0,
            totalLessons: moduleData.totalLessons || 0,
            completed: moduleData.completed || false,
            completedAt: moduleData.completedAt
          });
        }
      }
    }
    
    // Sort by progress (descending)
    moduleRankings.sort((a, b) => b.progress - a.progress);
    
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
    console.error('Error getting module leaderboard:', error);
    return null;
  }
}

// Get user's rank in overall leaderboard
export async function getUserOverallRank(uid: string): Promise<number> {
  try {
    const usersRef = collection(db, 'userProgress');
    const q = query(usersRef, orderBy('totalLessonsCompleted', 'desc'));
    
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
    const moduleLeaderboard = await getModuleLeaderboard(moduleId, 1000); // Get all users
    
    if (!moduleLeaderboard) return -1;
    
    const userIndex = moduleLeaderboard.rankings.findIndex(entry => entry.uid === uid);
    return userIndex >= 0 ? userIndex + 1 : -1;
  } catch (error) {
    console.error('Error getting user module rank:', error);
    return -1;
  }
}

// Get user profile data
async function getUserProfile(uid: string): Promise<{ displayName: string | null; email: string | null } | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        displayName: data.displayName || null,
        email: data.email || null
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

// Get leaderboard statistics
export async function getLeaderboardStats(): Promise<{
  totalUsers: number;
  totalLessonsCompleted: number;
  averageProgress: number;
  topStreak: number;
}> {
  try {
    const usersRef = collection(db, 'userProgress');
    const querySnapshot = await getDocs(usersRef);
    
    let totalUsers = 0;
    let totalLessonsCompleted = 0;
    let totalProgress = 0;
    let topStreak = 0;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalUsers++;
      totalLessonsCompleted += data.totalLessonsCompleted || 0;
      totalProgress += data.totalLessonsCompleted ? Math.round((data.totalLessonsCompleted / 13) * 100) : 0;
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
