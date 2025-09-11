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
      collection(db, 'users'),
      where('lastLogin', '>=', Timestamp.fromDate(thirtyDaysAgo))
    );
    const activeUsersSnapshot = await getDocs(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.size;

    // Get total users
    const totalUsersQuery = query(collection(db, 'users'));
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
      if (data.completedLessons) {
        lessonsCompleted += Object.keys(data.completedLessons).length;
      }
      
      // Count started lessons (any lesson with progress > 0)
      if (data.lessonsProgress) {
        totalLessonsStarted += Object.keys(data.lessonsProgress).length;
      }
      
      // Collect countries
      if (data.country) {
        uniqueCountries.add(data.country);
      }
      
      // Calculate average session time
      if (data.totalStudyTime && data.sessionCount) {
        totalSessionTime += data.totalStudyTime;
        sessionCount += data.sessionCount;
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
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(userProgressQuery);
    
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
      lessonsCompleted: data.completedLessons ? Object.keys(data.completedLessons).length : 0,
      totalStudyTime: data.totalStudyTime || 0,
      currentStreak: data.currentStreak || 0,
      longestStreak: data.longestStreak || 0,
      level: data.level || 'Beginner',
      country: data.country || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
}

export async function getLeaderboardStats(limit: number = 10) {
  try {
    const leaderboardQuery = query(
      collection(db, 'userProgress'),
      orderBy('lessonsCompleted', 'desc'),
      limit(limit)
    );
    const snapshot = await getDocs(leaderboardQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lessonsCompleted: doc.data().completedLessons 
        ? Object.keys(doc.data().completedLessons).length 
        : 0
    }));
  } catch (error) {
    console.error('Error fetching leaderboard stats:', error);
    throw error;
  }
}
