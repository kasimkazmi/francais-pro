import { 
  collection, 
  query, 
  getDocs, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

export interface AppStats {
  activeUsers: number;
  totalUsers: number;
  lessonsCompleted: number;
  totalLessonsStarted: number;
  countries: number;
  completionRate: number;
  averageSessionTime: number;
  lastUpdated: Date;
}

export async function getAppStats(): Promise<AppStats> {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get active users (logged in within last 30 days)
    const activeUsersQuery = query(
      collection(db, 'userProfiles'),
      where('lastActiveAt', '>=', Timestamp.fromDate(thirtyDaysAgo))
    );
    const activeUsersSnapshot = await getDocs(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.size;

    // Get total users
    const totalUsersQuery = query(collection(db, 'userProfiles'));
    const totalUsersSnapshot = await getDocs(totalUsersQuery);
    const totalUsers = totalUsersSnapshot.size;

    // Get user progress data
    const progressQuery = query(collection(db, 'userProgress'));
    const progressSnapshot = await getDocs(progressQuery);
    
    let lessonsCompleted = 0;
    let totalLessonsStarted = 0;
    const uniqueCountries = new Set<string>();
    let totalSessionTime = 0;
    let sessionCount = 0;

    progressSnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Count completed lessons
      if (data.lessons) {
        const completedLessons = Object.values(data.lessons).filter((lesson: unknown) => (lesson as { completed?: boolean })?.completed === true);
        lessonsCompleted += completedLessons.length;
      }
      
      // Count started lessons (any lesson with progress > 0)
      if (data.lessons) {
        totalLessonsStarted += Object.keys(data.lessons).length;
      }
      
      // Collect countries - this field might not exist in current structure
      // We'll skip this for now since it's not in the UserProgress interface
      
      // Calculate average session time
      if (data.totalTimeSpent) {
        totalSessionTime += data.totalTimeSpent;
        sessionCount += 1; // Each user progress doc represents one user
      }
    });

    // Calculate completion rate
    const completionRate = totalLessonsStarted > 0 
      ? Math.round((lessonsCompleted / totalLessonsStarted) * 100) 
      : 0;

    // Calculate average session time
    const averageSessionTime = sessionCount > 0 
      ? Math.round(totalSessionTime / sessionCount) 
      : 0;

    return {
      activeUsers,
      totalUsers,
      lessonsCompleted,
      totalLessonsStarted,
      countries: uniqueCountries.size,
      completionRate,
      averageSessionTime,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error fetching app stats:', error);
    throw error;
  }
}

export async function getUserStats(userId: string) {
  try {
    const userProgressQuery = query(
      collection(db, 'userProgress'),
      where('uid', '==', userId)
    );
    const snapshot = await getDocs(userProgressQuery);
    
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Count completed lessons from the lessons object
    const completedLessons = data.lessons ? 
      Object.values(data.lessons).filter((lesson: unknown) => (lesson as { completed?: boolean })?.completed === true).length : 0;

    return {
      lessonsCompleted: completedLessons,
      totalStudyTime: data.totalTimeSpent || 0,
      currentStreak: data.currentStreak || 0,
      longestStreak: data.longestStreak || 0,
      level: data.level || 'beginner',
      country: 'Unknown' // This field doesn't exist in current structure
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
}

export async function getLeaderboardStats(limitCount: number = 10) {
  try {
    const leaderboardQuery = query(
      collection(db, 'userProgress'),
      orderBy('totalLessonsCompleted', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(leaderboardQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      const completedLessons = data.lessons ? 
        Object.values(data.lessons).filter((lesson: unknown) => (lesson as { completed?: boolean })?.completed === true).length : 0;
      
      return {
        id: doc.id,
        ...data,
        lessonsCompleted: completedLessons
      };
    });
  } catch (error) {
    console.error('Error fetching leaderboard stats:', error);
    throw error;
  }
}
