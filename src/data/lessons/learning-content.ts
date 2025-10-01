import { Module } from '@/types';
import { alphabetLessons } from './alphabet-lessons';
import { greetingsLessons } from './greetings-lessons';
import { numbersLessons } from './numbers-lessons';
import { vocabularyLessons } from './vocabulary-lessons';
import { grammarLessons } from './grammar-lessons';

// Type for detailed lesson
type DetailedLesson = {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  sections?: Array<{
    title: string;
    type: string;
    duration: number;
    content: string;
    examples?: unknown[];
    exercises?: unknown[];
  }>;
};

// Export detailed lessons for direct access
export const detailedLessons = {
  ...alphabetLessons,
  ...greetingsLessons,
  ...numbersLessons,
  ...vocabularyLessons,
  ...grammarLessons
};

// Generate lesson metadata from detailed lessons
const generateLessonMetadata = (detailedLesson: DetailedLesson, type: 'vocabulary' | 'grammar' | 'pronunciation' | 'writing' | 'listening') => ({
  id: detailedLesson.id,
  title: detailedLesson.title,
  description: detailedLesson.description,
  content: detailedLesson.sections?.[1]?.content || detailedLesson.description,
  duration: detailedLesson.duration,
  difficulty: detailedLesson.difficulty,
  type,
  completed: false,
  xpReward: detailedLesson.xpReward
});

export const learningModules: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Start your French journey with the basics',
    color: 'bg-blue-500',
    icon: 'BookOpen',
    progress: 0,
    lessons: [
      generateLessonMetadata(alphabetLessons['french-alphabet'], 'pronunciation'),
      generateLessonMetadata(greetingsLessons['basic-greetings'], 'vocabulary'),
      generateLessonMetadata(numbersLessons['numbers-1-20'], 'vocabulary'),
      generateLessonMetadata(vocabularyLessons['colors-family'], 'vocabulary')
    ]
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master French grammar fundamentals',
    color: 'bg-green-500',
    icon: 'BookOpen',
    progress: 0,
    lessons: [
      generateLessonMetadata(grammarLessons['articles'], 'grammar'),
      generateLessonMetadata(grammarLessons['present-tense'], 'grammar'),
      generateLessonMetadata(grammarLessons['gender-agreement'], 'grammar')
    ]
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Expand your French vocabulary',
    color: 'bg-purple-500',
    icon: 'BookOpen',
    progress: 0,
    lessons: [
      generateLessonMetadata(vocabularyLessons['food-drinks'], 'vocabulary'),
      generateLessonMetadata(vocabularyLessons['work-professions'], 'vocabulary'),
      {
        id: 'travel-transport',
        title: 'Travel & Transportation',
        description: 'Essential vocabulary for traveling in French-speaking countries',
        content: 'Planning a trip to France? Learn the essential travel vocabulary...',
        duration: 25,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 100
      }
    ]
  },

  
  {
    id: 'practice',
    title: 'Practice',
    description: 'Apply what you\'ve learned',
    color: 'bg-orange-500',
    icon: 'Play',
    progress: 0,
    lessons: [
      {
        id: 'speaking-exercises',
        title: 'Speaking Exercises',
        description: 'Practice pronunciation and speaking skills',
        content: 'Improve your French speaking skills with interactive exercises...',
        duration: 20,
        difficulty: 'medium',
        type: 'pronunciation',
        completed: false,
        xpReward: 100
      },
      {
        id: 'writing-prompts',
        title: 'Writing Prompts',
        description: 'Practice writing in French with guided prompts',
        content: 'Develop your French writing skills with structured exercises...',
        duration: 25,
        difficulty: 'hard',
        type: 'writing',
        completed: false,
        xpReward: 125
      },
      {
        id: 'listening-comprehension',
        title: 'Listening Comprehension',
        description: 'Improve your listening skills with audio exercises',
        content: 'Train your ear to understand spoken French...',
        duration: 30,
        difficulty: 'hard',
        type: 'listening',
        completed: false,
        xpReward: 150
      }
    ]
  }
];


