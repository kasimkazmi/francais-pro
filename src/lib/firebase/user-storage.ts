import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { syncUserToLeaderboard } from './leaderboard-public';

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  country?: string | null;
  nativeLanguage?: string | null;
  learningGoals?: string[];
  preferredLearningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  timezone?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActiveAt: Timestamp;
  isEmailVerified: boolean;
  accountStatus: 'active' | 'suspended' | 'deleted';
  subscriptionTier?: 'free' | 'premium' | 'pro';
  totalStudyTime: number; // in minutes
  streakCount: number;
  longestStreak: number;
  level: number;
  xp: number;
  achievements: string[];
  badges: string[];
}

// User activity interface
export interface UserActivity {
  uid: string;
  activityType: 'login' | 'logout' | 'lesson_start' | 'lesson_complete' | 'quiz_attempt' | 'practice_session' | 'profile_update';
  activityData: {
    lessonId?: string;
    moduleId?: string;
    score?: number;
    timeSpent?: number;
    deviceInfo?: string;
    ipAddress?: string;
    userAgent?: string;
  };
  timestamp: Timestamp;
  sessionId: string;
}

// User preferences interface
export interface UserPreferences {
  uid: string;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'fr' | 'es' | 'de';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
    achievements: boolean;
    weeklyProgress: boolean;
  };
  privacy: {
    showProfile: boolean;
    showProgress: boolean;
    allowAnalytics: boolean;
  };
  learning: {
    dailyGoal: number; // minutes
    reminderTime: string; // HH:MM format
    difficulty: 'easy' | 'medium' | 'hard';
    autoPlayAudio: boolean;
    showHints: boolean;
  };
  updatedAt: Timestamp;
}

// User session interface
export interface UserSession {
  uid: string;
  sessionId: string;
  startTime: Timestamp;
  endTime?: Timestamp;
  deviceInfo: string;
  ipAddress: string;
  userAgent: string;
  activities: string[]; // activity IDs
  totalTimeSpent: number; // in minutes
  pagesVisited: string[];
  isActive: boolean;
}

// Create or update user profile
export async function createOrUpdateUserProfile(
  uid: string, 
  userData: Partial<UserProfile>
): Promise<void> {
  try {
    const userRef = doc(db, 'userProfiles', uid);
    const userSnap = await getDoc(userRef);
    
    const profileData: Partial<UserProfile> = {
      ...userData,
      updatedAt: serverTimestamp() as Timestamp,
      lastActiveAt: serverTimestamp() as Timestamp,
    };

    if (!userSnap.exists()) {
      // Create new profile
      const newProfile: UserProfile = {
        uid,
        email: userData.email || '',
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || null,
        phoneNumber: userData.phoneNumber || null,
        dateOfBirth: userData.dateOfBirth || null,
        country: userData.country || null,
        nativeLanguage: userData.nativeLanguage ?? 'en',
        learningGoals: userData.learningGoals || [],
        preferredLearningStyle: userData.preferredLearningStyle || 'visual',
        timezone: userData.timezone || null,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
        lastActiveAt: serverTimestamp() as Timestamp,
        isEmailVerified: userData.isEmailVerified || false,
        accountStatus: userData.accountStatus || 'active',
        subscriptionTier: userData.subscriptionTier || 'free',
        totalStudyTime: userData.totalStudyTime || 0,
        streakCount: userData.streakCount || 0,
        longestStreak: userData.longestStreak || 0,
        level: userData.level || 1,
        xp: userData.xp || 0,
        achievements: userData.achievements || [],
        badges: userData.badges || [],
      };
      
      await setDoc(userRef, newProfile);
      // console.log('User profile created:', uid);
      
      // Sync to leaderboard
      try {
        await syncUserToLeaderboard(uid, {
          displayName: newProfile.displayName,
          totalLessonsCompleted: 0,
          totalTimeSpent: 0,
          currentStreak: 0,
          longestStreak: 0,
          level: 'beginner',
          wordsLearned: 0,
          lastActiveDate: newProfile.lastActiveAt,
          modules: {}
        });
      } catch (syncError) {
        console.error('Error syncing new user to leaderboard:', syncError);
      }
    } else {
      // Update existing profile - filter out undefined values
      const cleanProfileData = Object.fromEntries(
        Object.entries(profileData).filter(([, value]) => value !== undefined)
      );
      await updateDoc(userRef, cleanProfileData);
      // console.log('User profile updated:', uid);
      
      // Sync to leaderboard
      try {
        await syncUserToLeaderboard(uid, {
          displayName: cleanProfileData.displayName || userData.displayName,
          totalLessonsCompleted: cleanProfileData.totalLessonsCompleted || 0,
          totalTimeSpent: cleanProfileData.totalTimeSpent || 0,
          currentStreak: cleanProfileData.currentStreak || 0,
          longestStreak: cleanProfileData.longestStreak || 0,
          level: cleanProfileData.level || 'beginner',
          wordsLearned: cleanProfileData.wordsLearned || 0,
          lastActiveDate: cleanProfileData.lastActiveAt || Timestamp.now(),
          modules: cleanProfileData.modules || {}
        });
      } catch (syncError) {
        console.error('Error syncing updated user to leaderboard:', syncError);
      }
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'userProfiles', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// Log user activity
export async function logUserActivity(
  uid: string,
  activityType: UserActivity['activityType'],
  activityData: UserActivity['activityData'],
  sessionId: string
): Promise<void> {
  try {
    const activityRef = doc(collection(db, 'userActivities'));
    const activity: UserActivity = {
      uid,
      activityType,
      activityData,
      timestamp: serverTimestamp() as Timestamp,
      sessionId,
    };
    
    await setDoc(activityRef, activity);
    // console.log('User activity logged:', activityType, uid);
  } catch (error) {
    console.error('Error logging user activity:', error);
    throw error;
  }
}

// Get user activities
export async function getUserActivities(
  uid: string, 
  limit: number = 50
): Promise<UserActivity[]> {
  try {
    const activitiesRef = collection(db, 'userActivities');
    const q = query(
      activitiesRef,
      where('uid', '==', uid)
    );
    
    const snapshot = await getDocs(q);
    const activities: UserActivity[] = [];
    
    snapshot.forEach((doc) => {
      activities.push(doc.data() as UserActivity);
    });
    
    // Sort by timestamp (newest first) and limit
    return activities
      .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting user activities:', error);
    throw error;
  }
}

// Create or update user preferences
export async function createOrUpdateUserPreferences(
  uid: string,
  preferences: Partial<UserPreferences>
): Promise<void> {
  try {
    const prefsRef = doc(db, 'userPreferences', uid);
    const prefsSnap = await getDoc(prefsRef);
    
    const prefsData: Partial<UserPreferences> = {
      ...preferences,
      uid,
      updatedAt: serverTimestamp() as Timestamp,
    };

    if (!prefsSnap.exists()) {
      // Create new preferences with defaults
      const defaultPreferences: UserPreferences = {
        uid,
        theme: preferences.theme || 'system',
        language: preferences.language || 'en',
        notifications: {
          email: preferences.notifications?.email ?? true,
          push: preferences.notifications?.push ?? true,
          reminders: preferences.notifications?.reminders ?? true,
          achievements: preferences.notifications?.achievements ?? true,
          weeklyProgress: preferences.notifications?.weeklyProgress ?? true,
        },
        privacy: {
          showProfile: preferences.privacy?.showProfile ?? true,
          showProgress: preferences.privacy?.showProgress ?? true,
          allowAnalytics: preferences.privacy?.allowAnalytics ?? true,
        },
        learning: {
          dailyGoal: preferences.learning?.dailyGoal || 30,
          reminderTime: preferences.learning?.reminderTime || '09:00',
          difficulty: preferences.learning?.difficulty || 'medium',
          autoPlayAudio: preferences.learning?.autoPlayAudio ?? true,
          showHints: preferences.learning?.showHints ?? true,
        },
        updatedAt: serverTimestamp() as Timestamp,
      };
      
      await setDoc(prefsRef, defaultPreferences);
      // console.log('User preferences created:', uid);
    } else {
      // Update existing preferences
      await updateDoc(prefsRef, prefsData);
      // console.log('User preferences updated:', uid);
    }
  } catch (error) {
    console.error('Error creating/updating user preferences:', error);
    throw error;
  }
}

// Get user preferences
export async function getUserPreferences(uid: string): Promise<UserPreferences | null> {
  try {
    const prefsRef = doc(db, 'userPreferences', uid);
    const prefsSnap = await getDoc(prefsRef);
    
    if (prefsSnap.exists()) {
      return prefsSnap.data() as UserPreferences;
    }
    return null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    throw error;
  }
}

// Create user session
export async function createUserSession(
  uid: string,
  sessionId: string,
  deviceInfo: string,
  ipAddress: string,
  userAgent: string
): Promise<void> {
  try {
    const sessionRef = doc(db, 'userSessions', sessionId);
    const session: UserSession = {
      uid,
      sessionId,
      startTime: serverTimestamp() as Timestamp,
      deviceInfo,
      ipAddress,
      userAgent,
      activities: [],
      totalTimeSpent: 0,
      pagesVisited: [],
      isActive: true,
    };
    
    await setDoc(sessionRef, session);
    // console.log('User session created:', sessionId);
  } catch (error) {
    console.error('Error creating user session:', error);
    throw error;
  }
}

// Update user session
export async function updateUserSession(
  sessionId: string,
  updates: Partial<UserSession>
): Promise<void> {
  try {
    const sessionRef = doc(db, 'userSessions', sessionId);
    await updateDoc(sessionRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    // console.log('User session updated:', sessionId);
  } catch (error) {
    console.error('Error updating user session:', error);
    throw error;
  }
}

// End user session
export async function endUserSession(sessionId: string): Promise<void> {
  try {
    const sessionRef = doc(db, 'userSessions', sessionId);
    await updateDoc(sessionRef, {
      endTime: serverTimestamp(),
      isActive: false,
      updatedAt: serverTimestamp(),
    });
    // console.log('User session ended:', sessionId);
  } catch (error) {
    console.error('Error ending user session:', error);
    throw error;
  }
}

// Get user sessions
export async function getUserSessions(
  uid: string,
  limit: number = 20
): Promise<UserSession[]> {
  try {
    const sessionsRef = collection(db, 'userSessions');
    const q = query(
      sessionsRef,
      where('uid', '==', uid)
    );
    
    const snapshot = await getDocs(q);
    const sessions: UserSession[] = [];
    
    snapshot.forEach((doc) => {
      sessions.push(doc.data() as UserSession);
    });
    
    // Sort by start time (newest first) and limit
    return sessions
      .sort((a, b) => b.startTime.toMillis() - a.startTime.toMillis())
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting user sessions:', error);
    throw error;
  }
}

// Update user last active time
export async function updateUserLastActive(uid: string): Promise<void> {
  try {
    const userRef = doc(db, 'userProfiles', uid);
    await updateDoc(userRef, {
      lastActiveAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user last active:', error);
    // Don't throw - this is not critical
  }
}

// Get all users (admin only)
export async function getAllUsers(limit: number = 100): Promise<UserProfile[]> {
  try {
    const usersRef = collection(db, 'userProfiles');
    const snapshot = await getDocs(usersRef);
    const users: UserProfile[] = [];
    
    snapshot.forEach((doc) => {
      users.push(doc.data() as UserProfile);
    });
    
    return users.slice(0, limit);
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}

// Search users (admin only)
export async function searchUsers(
  searchTerm: string,
  limit: number = 50
): Promise<UserProfile[]> {
  try {
    const usersRef = collection(db, 'userProfiles');
    const snapshot = await getDocs(usersRef);
    const users: UserProfile[] = [];
    
    snapshot.forEach((doc) => {
      const userData = doc.data() as UserProfile;
      const searchLower = searchTerm.toLowerCase();
      
      if (
        userData.displayName.toLowerCase().includes(searchLower) ||
        userData.email.toLowerCase().includes(searchLower) ||
        userData.uid.toLowerCase().includes(searchLower)
      ) {
        users.push(userData);
      }
    });
    
    return users.slice(0, limit);
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}
