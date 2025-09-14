# 📚 API Reference - Français Pro

This document provides comprehensive information about the APIs and data structures used in Français Pro.

## 📋 Table of Contents

- [Authentication API](#authentication-api)
- [User Progress API](#user-progress-api)
- [Content Data Structures](#content-data-structures)
- [Firebase Configuration](#firebase-configuration)
- [Audio API](#audio-api)
- [Search API](#search-api)

## 🔐 Authentication API

### Firebase Authentication

Français Pro uses Firebase Authentication for user management.

#### Sign Up with Email/Password

```typescript
// Sign up new user
const signUpUser = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};
```

#### Sign In with Email/Password

```typescript
// Sign in existing user
const signInUser = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};
```

#### Google Sign-In

```typescript
// Sign in with Google
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  return user;
};
```

#### Sign Out

```typescript
// Sign out user
const signOutUser = async () => {
  await signOut(auth);
};
```

#### Update User Profile

```typescript
// Update user display name
const updateUserProfile = async (displayName: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, { displayName });
  }
};
```

## 📊 User Progress API

### User Progress Structure

```typescript
interface UserProgress {
  userId: string;
  displayName: string;
  streak: number;
  totalLessonsCompleted: number;
  lastActiveDate: string;
  completedLessons: {
    [moduleId: string]: {
      [lessonId: string]: {
        completed: boolean;
        completedAt: string;
        score?: number;
      };
    };
  };
  achievements: string[];
  preferences: {
    language: string;
    difficulty: string;
    notifications: boolean;
  };
}
```

### Initialize User Progress

```typescript
// Initialize new user progress
const initializeUserProgress = async (userId: string, displayName: string) => {
  const userProgress: UserProgress = {
    userId,
    displayName,
    streak: 0,
    totalLessonsCompleted: 0,
    lastActiveDate: new Date().toISOString(),
    completedLessons: {},
    achievements: [],
    preferences: {
      language: 'en',
      difficulty: 'beginner',
      notifications: true
    }
  };
  
  await setDoc(doc(db, 'userProgress', userId), userProgress);
  return userProgress;
};
```

### Update Lesson Progress

```typescript
// Update lesson completion
const updateLessonProgress = async (
  userId: string, 
  moduleId: string, 
  lessonId: string,
  score?: number
) => {
  const userProgressRef = doc(db, 'userProgress', userId);
  const lessonPath = `completedLessons.${moduleId}.${lessonId}`;
  
  await updateDoc(userProgressRef, {
    [lessonPath]: {
      completed: true,
      completedAt: new Date().toISOString(),
      ...(score && { score })
    },
    totalLessonsCompleted: increment(1),
    lastActiveDate: new Date().toISOString()
  });
};
```

### Calculate Streak

```typescript
// Calculate user learning streak
const calculateStreak = (lastActiveDate: string): number => {
  const lastActive = new Date(lastActiveDate);
  const today = new Date();
  const diffTime = today.getTime() - lastActive.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1 ? 1 : 0; // Simple streak calculation
};
```

## 📚 Content Data Structures

### Learning Module Structure

```typescript
interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent[];
  estimatedDuration: string;
  prerequisites?: string[];
}

interface LessonContent {
  type: 'text' | 'audio' | 'quiz' | 'vocabulary';
  data: any;
}
```

### Vocabulary Structure

```typescript
interface VocabularyItem {
  french: string;
  english: string;
  pronunciation: string;
  audioUrl?: string;
  category?: string;
  difficulty?: string;
}
```

### Cultural Content Structure

```typescript
interface CulturalContent {
  title: string;
  description: string;
  content: {
    [section: string]: any[];
  };
  vocabulary?: VocabularyItem[];
  audioContent?: AudioContent[];
}
```

### Arts Data Structure

```typescript
interface ArtsData {
  artMovements: ArtMovement[];
  famousArtists: Artist[];
  museums: Museum[];
  artTerms: ArtTerm[];
}

interface ArtMovement {
  name: string;
  period: string;
  description: string;
  characteristics: string[];
  famousWorks: Artwork[];
}

interface Artist {
  name: string;
  dates: string;
  movement: string;
  famousWorks: string[];
  vocabulary: VocabularyItem[];
}
```

## 🔥 Firebase Configuration

### Firestore Collections

```typescript
// Collection structure
const collections = {
  userProgress: 'userProgress',
  userProfiles: 'userProfiles',
  leaderboard: 'leaderboard',
  achievements: 'achievements'
};
```

### Security Rules

```javascript
// Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User progress - users can read/write their own data
    match /userProgress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access for leaderboard
    match /userProfiles/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎵 Audio API

### Text-to-Speech

```typescript
// Web Speech API implementation
class AudioService {
  private synth = window.speechSynthesis;
  
  speak(text: string, language: string = 'fr-FR'): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    this.synth.speak(utterance);
  }
  
  stop(): void {
    this.synth.cancel();
  }
  
  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}
```

### Audio Button Component

```typescript
interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  language?: string;
  className?: string;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  language = 'fr-FR',
  className
}) => {
  const handlePlay = () => {
    const audioService = new AudioService();
    audioService.speak(text, language);
  };
  
  return (
    <button
      onClick={handlePlay}
      className={`audio-button ${size} ${className}`}
      aria-label={`Play pronunciation of ${text}`}
    >
      <Volume2 className="h-4 w-4" />
    </button>
  );
};
```

## 🔍 Search API

### Search Context

```typescript
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  performSearch: (query: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'vocabulary' | 'cultural' | 'grammar';
  url: string;
  relevanceScore: number;
}
```

### Search Implementation

```typescript
const performSearch = async (query: string): Promise<SearchResult[]> => {
  const results: SearchResult[] = [];
  
  // Search in learning modules
  const moduleResults = searchInModules(query);
  results.push(...moduleResults);
  
  // Search in vocabulary
  const vocabResults = searchInVocabulary(query);
  results.push(...vocabResults);
  
  // Search in cultural content
  const culturalResults = searchInCulturalContent(query);
  results.push(...culturalResults);
  
  // Sort by relevance score
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};
```

## 📱 Mobile Detection API

### Mobile Detection Utility

```typescript
// Detect mobile devices
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const isMobileWidth = window.innerWidth < 768;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return isMobileWidth || (isTouchDevice && isMobileUA);
}

// React hook for mobile detection
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsMobile(isMobileDevice());
    
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
}
```

## 🎯 TEF Preparation API

### TEF Data Structure

```typescript
interface TEFData {
  studyPlan: {
    [level: string]: {
      phases: TEFPhase[];
      duration: string;
      description: string;
    };
  };
  practiceTests: TEFTest[];
  vocabulary: VocabularyItem[];
  grammar: GrammarRule[];
}

interface TEFPhase {
  name: string;
  duration: string;
  description: string;
  tasks: TEFTask[];
  goals: string[];
}

interface TEFTask {
  id: string;
  title: string;
  description: string;
  type: 'reading' | 'writing' | 'listening' | 'speaking';
  difficulty: string;
  estimatedTime: string;
}
```

## 🔧 Error Handling

### API Error Types

```typescript
interface APIError {
  code: string;
  message: string;
  details?: any;
}

class APIErrorHandler {
  static handle(error: any): APIError {
    if (error.code) {
      return {
        code: error.code,
        message: error.message,
        details: error.details
      };
    }
    
    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
      details: error
    };
  }
}
```

## 📊 Analytics API

### User Analytics

```typescript
interface UserAnalytics {
  userId: string;
  sessionData: {
    startTime: string;
    endTime: string;
    pagesVisited: string[];
    actionsPerformed: string[];
  };
  learningProgress: {
    lessonsCompleted: number;
    timeSpent: number;
    streakDays: number;
  };
  performanceMetrics: {
    averageScore: number;
    improvementRate: number;
    weakAreas: string[];
  };
}
```

---

**Need more specific API information?** 

[Check the source code →](../src/lib/) | [View examples →](../src/components/) | [Report API issues →](../.github/ISSUE_TEMPLATE/bug_report.md)
