// Lesson Service - Abstraction layer for data fetching
// Easy to switch between local data and API calls

import { detailedLessons, learningModules } from '@/data/lessons/learning-content';

// Configuration - set to true to use API instead of local data
const USE_API = false;
const API_BASE_URL = '/api/lessons';

/**
 * Fetch all learning modules
 * @returns Array of modules with lesson metadata
 */
export async function getModules() {
  if (USE_API) {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching modules from API:', error);
      throw error;
    }
  }
  
  // Return local data
  return Promise.resolve(learningModules);
}

/**
 * Fetch detailed lesson content by ID
 * @param lessonId - The lesson identifier
 * @returns Detailed lesson with sections and exercises
 */
export async function getLesson(lessonId: string) {
  if (USE_API) {
    try {
      const response = await fetch(`${API_BASE_URL}/${lessonId}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch lesson');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching lesson from API:', error);
      throw error;
    }
  }
  
  // Return local data
  const lesson = detailedLessons[lessonId as keyof typeof detailedLessons];
  if (!lesson) {
    throw new Error(`Lesson ${lessonId} not found`);
  }
  
  return Promise.resolve(lesson);
}

/**
 * Fetch lesson by module and lesson ID (with fallback)
 * @param moduleId - The module identifier
 * @param lessonId - The lesson identifier
 * @returns Detailed lesson or generated placeholder
 */
export async function getLessonByModule(moduleId: string, lessonId: string) {
  try {
    // Try to get detailed lesson first
    return await getLesson(lessonId);
  } catch {
    // Fallback: Generate from module metadata
    const foundModule = learningModules.find(m => m.id === moduleId);
    if (!foundModule) return null;
    
    const lessonMeta = foundModule.lessons.find(l => l.id === lessonId);
    if (!lessonMeta) return null;
    
    // Return basic lesson structure
    return {
      id: lessonMeta.id,
      title: lessonMeta.title,
      description: lessonMeta.description || '',
      duration: lessonMeta.duration,
      difficulty: lessonMeta.difficulty,
      xpReward: lessonMeta.xpReward || 50,
      sections: [
        {
          title: "Introduction",
          duration: Math.floor(lessonMeta.duration * 0.2),
          content: lessonMeta.description,
          type: "introduction" as const,
          examples: []
        },
        {
          title: "Learning Content",
          duration: Math.floor(lessonMeta.duration * 0.5),
          content: lessonMeta.content,
          type: "learning" as const,
          examples: []
        },
        {
          title: "Practice",
          duration: Math.floor(lessonMeta.duration * 0.2),
          content: "Practice what you've learned.",
          type: "practice" as const,
          exercises: []
        },
        {
          title: "Review",
          duration: Math.floor(lessonMeta.duration * 0.1),
          content: `Great job completing ${lessonMeta.title}!`,
          type: "review" as const,
          examples: []
        }
      ]
    };
  }
}
    
// Future: Add more API methods
// export async function submitExercise(lessonId: string, exerciseId: string, answer: any) { ... }
// export async function trackProgress(userId: string, lessonId: string, progress: number) { ... }

