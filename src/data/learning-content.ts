import { Module } from '@/types';

export const learningModules: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Start your French journey with the basics',
    color: 'bg-blue-500',
    icon: 'BookOpen',
    progress: 50,
    lessons: [
      {
        id: 'french-alphabet',
        title: 'French Alphabet & Pronunciation',
        description: 'Learn the French alphabet and basic pronunciation rules',
        content: 'The French alphabet has 26 letters, just like English, but with different pronunciations...',
        duration: 15,
        difficulty: 'easy',
        type: 'pronunciation',
        completed: true,
        xpReward: 50
      },
      {
        id: 'basic-greetings',
        title: 'Basic Greetings',
        description: 'Essential French greetings and polite expressions',
        content: 'Learn how to say hello, goodbye, and other common greetings in French...',
        duration: 20,
        difficulty: 'easy',
        type: 'vocabulary',
        completed: true,
        xpReward: 75
      },
      {
        id: 'numbers-1-20',
        title: 'Numbers 1-20',
        description: 'Master French numbers from 1 to 20',
        content: 'French numbers have some unique patterns. Let\'s learn them step by step...',
        duration: 25,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 100
      },
      {
        id: 'colors-family',
        title: 'Colors & Family',
        description: 'Learn colors and family member vocabulary',
        content: 'Expand your vocabulary with colors and family relationships...',
        duration: 30,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 125
      }
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
      {
        id: 'articles',
        title: 'Articles (le, la, les)',
        description: 'Learn about French definite and indefinite articles',
        content: 'French articles are essential for proper sentence structure...',
        duration: 20,
        difficulty: 'medium',
        type: 'grammar',
        completed: false,
        xpReward: 100
      },
      {
        id: 'present-tense',
        title: 'Present Tense Verbs',
        description: 'Master regular and irregular present tense verbs',
        content: 'French verbs have different conjugations based on the subject...',
        duration: 35,
        difficulty: 'hard',
        type: 'grammar',
        completed: false,
        xpReward: 150
      },
      {
        id: 'gender-agreement',
        title: 'Gender Agreement',
        description: 'Understand masculine and feminine noun agreement',
        content: 'French nouns have gender, and adjectives must agree...',
        duration: 25,
        difficulty: 'medium',
        type: 'grammar',
        completed: false,
        xpReward: 125
      }
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
      {
        id: 'food-drinks',
        title: 'Food & Drinks',
        description: 'Learn vocabulary related to food and beverages',
        content: 'French cuisine is world-famous. Let\'s learn the vocabulary...',
        duration: 30,
        difficulty: 'medium',
        type: 'vocabulary',
        completed: false,
        xpReward: 125
      },
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
      },
      {
        id: 'work-professions',
        title: 'Work & Professions',
        description: 'Learn job-related vocabulary and professional terms',
        content: 'Expand your professional French vocabulary...',
        duration: 35,
        difficulty: 'hard',
        type: 'vocabulary',
        completed: false,
        xpReward: 150
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

export const vocabularyWords = [
  {
    french: 'bonjour',
    english: 'hello',
    pronunciation: '/bɔ̃.ʒuʁ/',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    french: 'merci',
    english: 'thank you',
    pronunciation: '/mɛʁ.si/',
    category: 'greetings',
    difficulty: 'easy'
  },
  {
    french: 'pomme',
    english: 'apple',
    pronunciation: '/pɔm/',
    category: 'food',
    difficulty: 'easy'
  },
  {
    french: 'maison',
    english: 'house',
    pronunciation: '/mɛ.zɔ̃/',
    category: 'home',
    difficulty: 'medium'
  },
  {
    french: 'voyage',
    english: 'trip',
    pronunciation: '/vwa.jaʒ/',
    category: 'travel',
    difficulty: 'medium'
  }
];
