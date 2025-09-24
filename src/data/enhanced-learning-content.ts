import { LearningModule, InteractiveLesson, ActivityContent, Assessment, LessonStep } from '@/types/learning-types';

// Sample interactive lessons for the Foundations module
const foundationsLessons: InteractiveLesson[] = [
  {
    id: 'french-alphabet-interactive',
    title: 'French Alphabet & Pronunciation',
    description: 'Master the French alphabet with interactive pronunciation practice',
    type: 'pronunciation',
    difficulty: 'easy',
    estimatedTime: 15,
    xpReward: 100,
    prerequisites: [],
    skills: ['pronunciation', 'listening'],
    completed: false,
    unlocked: true,
    steps: [
      {
        id: 'intro-alphabet',
        type: 'introduction',
        title: 'Welcome to French Alphabet',
        content: 'Let\'s learn the French alphabet! French has 26 letters like English, but with unique pronunciations.',
        duration: 30,
        interactive: false,
        media: {
          type: 'image',
          url: '/images/french-alphabet.jpg',
          alt: 'French alphabet chart'
        }
      },
      {
        id: 'learn-alphabet',
        type: 'learning',
        title: 'Alphabet Pronunciation',
        content: 'Each letter has a specific sound. Listen carefully and repeat after the audio.',
        duration: 300,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/french-alphabet.mp3'
        }
      },
      {
        id: 'practice-alphabet',
        type: 'practice',
        title: 'Practice Pronunciation',
        content: 'Now let\'s practice! Click on each letter to hear its pronunciation.',
        duration: 180,
        interactive: true
      }
    ],
    activities: [
      {
        id: 'alphabet-audio-match',
        type: 'audio-match',
        question: 'Listen to the audio and select the correct letter',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        explanation: 'The letter A in French sounds like "ah"',
        audioUrl: '/audio/letter-a.mp3',
        difficulty: 'easy',
        xpReward: 20
      },
      {
        id: 'alphabet-pronunciation',
        type: 'speaking',
        question: 'Repeat the letter A after the audio',
        correctAnswer: 'A',
        explanation: 'Great! You pronounced the French A correctly',
        audioUrl: '/audio/letter-a.mp3',
        difficulty: 'easy',
        xpReward: 25
      }
    ],
    assessment: {
      id: 'alphabet-assessment',
      questions: [
        {
          id: 'alphabet-quiz-1',
          type: 'multiple-choice',
          question: 'How many letters are in the French alphabet?',
          options: ['25', '26', '27', '28'],
          correctAnswer: '26',
          explanation: 'French alphabet has 26 letters, same as English',
          difficulty: 'easy',
          xpReward: 15
        },
        {
          id: 'alphabet-quiz-2',
          type: 'audio-match',
          question: 'Listen and identify the letter',
          options: ['E', 'F', 'G', 'H'],
          correctAnswer: 'E',
          explanation: 'The letter E sounds like "uh" in French',
          audioUrl: '/audio/letter-e.mp3',
          difficulty: 'easy',
          xpReward: 20
        }
      ],
      passingScore: 70,
      timeLimit: 120,
      retryAllowed: true,
      maxRetries: 3
    },
    reviewSchedule: []
  },
  {
    id: 'basic-greetings-interactive',
    title: 'Essential Greetings',
    description: 'Learn common French greetings with interactive conversations',
    type: 'conversation',
    difficulty: 'easy',
    estimatedTime: 20,
    xpReward: 150,
    prerequisites: ['french-alphabet-interactive'],
    skills: ['vocabulary', 'conversation', 'pronunciation'],
    completed: false,
    unlocked: false,
    steps: [
      {
        id: 'intro-greetings',
        type: 'introduction',
        title: 'French Greetings',
        content: 'Greetings are the foundation of French conversation. Let\'s learn the most important ones!',
        duration: 30,
        interactive: false
      },
      {
        id: 'learn-greetings',
        type: 'learning',
        title: 'Common Greetings',
        content: 'Bonjour (Hello), Bonsoir (Good evening), Au revoir (Goodbye), Merci (Thank you)',
        duration: 240,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/greetings.mp3'
        }
      },
      {
        id: 'practice-greetings',
        type: 'practice',
        title: 'Practice Conversations',
        content: 'Practice using greetings in different situations',
        duration: 300,
        interactive: true
      }
    ],
    activities: [
      {
        id: 'greeting-flashcard',
        type: 'flashcard',
        question: 'What does "Bonjour" mean?',
        correctAnswer: 'Hello',
        explanation: 'Bonjour is the standard French greeting for "Hello"',
        difficulty: 'easy',
        xpReward: 20
      },
      {
        id: 'greeting-conversation',
        type: 'multiple-choice',
        question: 'How would you respond to "Bonjour"?',
        options: ['Bonjour', 'Merci', 'Au revoir', 'Oui'],
        correctAnswer: 'Bonjour',
        explanation: 'The appropriate response to "Bonjour" is also "Bonjour"',
        difficulty: 'easy',
        xpReward: 25
      },
      {
        id: 'greeting-pronunciation',
        type: 'speaking',
        question: 'Say "Bonjour" after the audio',
        correctAnswer: 'Bonjour',
        explanation: 'Excellent pronunciation!',
        audioUrl: '/audio/bonjour.mp3',
        difficulty: 'medium',
        xpReward: 30
      }
    ],
    assessment: {
      id: 'greetings-assessment',
      questions: [
        {
          id: 'greeting-quiz-1',
          type: 'fill-blank',
          question: 'Complete: "___" means hello in French',
          correctAnswer: 'Bonjour',
          explanation: 'Bonjour is the French word for hello',
          difficulty: 'easy',
          xpReward: 20
        },
        {
          id: 'greeting-quiz-2',
          type: 'multiple-choice',
          question: 'What time of day would you say "Bonsoir"?',
          options: ['Morning', 'Afternoon', 'Evening', 'Night'],
          correctAnswer: 'Evening',
          explanation: 'Bonsoir is used in the evening',
          difficulty: 'easy',
          xpReward: 20
        }
      ],
      passingScore: 75,
      timeLimit: 150,
      retryAllowed: true,
      maxRetries: 3
    },
    reviewSchedule: []
  },
  {
    id: 'numbers-1-20-interactive',
    title: 'Numbers 1-20',
    description: 'Master French numbers with interactive counting exercises',
    type: 'vocabulary',
    difficulty: 'medium',
    estimatedTime: 25,
    xpReward: 200,
    prerequisites: ['basic-greetings-interactive'],
    skills: ['vocabulary', 'pronunciation'],
    completed: false,
    unlocked: false,
    steps: [
      {
        id: 'intro-numbers',
        type: 'introduction',
        title: 'French Numbers',
        content: 'Numbers are essential for daily conversations. Let\'s learn 1-20!',
        duration: 30,
        interactive: false
      },
      {
        id: 'learn-numbers',
        type: 'learning',
        title: 'Numbers 1-20',
        content: 'Un (1), Deux (2), Trois (3), Quatre (4), Cinq (5)...',
        duration: 360,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/numbers-1-20.mp3'
        }
      },
      {
        id: 'practice-numbers',
        type: 'practice',
        title: 'Counting Practice',
        content: 'Practice counting and recognizing numbers',
        duration: 300,
        interactive: true
      }
    ],
    activities: [
      {
        id: 'number-flashcard',
        type: 'flashcard',
        question: 'What is "cinq" in English?',
        correctAnswer: '5',
        explanation: 'Cinq means five in French',
        difficulty: 'easy',
        xpReward: 20
      },
      {
        id: 'number-word-order',
        type: 'word-order',
        question: 'Arrange the numbers in order: cinq, un, trois, deux',
        correctAnswer: ['un', 'deux', 'trois', 'cinq'],
        explanation: 'The correct order is: un (1), deux (2), trois (3), cinq (5)',
        difficulty: 'medium',
        xpReward: 30
      },
      {
        id: 'number-listening',
        type: 'listening',
        question: 'Listen and select the number you hear',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
        explanation: 'You heard "douze" which means 12',
        audioUrl: '/audio/douze.mp3',
        difficulty: 'medium',
        xpReward: 25
      }
    ],
    assessment: {
      id: 'numbers-assessment',
      questions: [
        {
          id: 'number-quiz-1',
          type: 'fill-blank',
          question: 'Complete: "dix" means ___ in English',
          correctAnswer: '10',
          explanation: 'Dix is the French word for ten',
          difficulty: 'easy',
          xpReward: 20
        },
        {
          id: 'number-quiz-2',
          type: 'multiple-choice',
          question: 'What is the French word for 15?',
          options: ['quinze', 'seize', 'dix-sept', 'dix-huit'],
          correctAnswer: 'quinze',
          explanation: 'Quinze is the French word for 15',
          difficulty: 'medium',
          xpReward: 25
        }
      ],
      passingScore: 80,
      timeLimit: 180,
      retryAllowed: true,
      maxRetries: 3
    },
    reviewSchedule: []
  }
];

// Enhanced learning modules
export const enhancedLearningModules: LearningModule[] = [
  {
    id: 'foundations-enhanced',
    title: 'French Foundations',
    description: 'Build your French foundation with interactive lessons',
    color: 'bg-blue-500',
    icon: 'BookOpen',
    progress: 0,
    unlocked: true,
    prerequisites: [],
    lessons: foundationsLessons,
    totalXP: 450,
    estimatedTime: 60,
    skills: ['vocabulary', 'pronunciation', 'conversation']
  },
  {
    id: 'daily-life-enhanced',
    title: 'Daily Life French',
    description: 'Essential French for everyday situations',
    color: 'bg-green-500',
    icon: 'Home',
    progress: 0,
    unlocked: false,
    prerequisites: ['foundations-enhanced'],
    lessons: [], // Will be populated with more lessons
    totalXP: 600,
    estimatedTime: 90,
    skills: ['vocabulary', 'conversation', 'listening']
  },
  {
    id: 'grammar-essentials-enhanced',
    title: 'Grammar Essentials',
    description: 'Master French grammar with interactive exercises',
    color: 'bg-purple-500',
    icon: 'Book',
    progress: 0,
    unlocked: false,
    prerequisites: ['foundations-enhanced'],
    lessons: [], // Will be populated with more lessons
    totalXP: 800,
    estimatedTime: 120,
    skills: ['grammar', 'writing', 'reading']
  }
];

// Learning paths
export const learningPaths = [
  {
    id: 'beginner-path',
    title: 'Beginner Path',
    description: 'Perfect for complete beginners',
    level: 'easy' as const,
    modules: ['foundations-enhanced', 'daily-life-enhanced'],
    totalXP: 1050,
    estimatedTime: 150,
    unlocked: true,
    progress: 0
  },
  {
    id: 'intermediate-path',
    title: 'Intermediate Path',
    description: 'For those with basic French knowledge',
    level: 'medium' as const,
    modules: ['grammar-essentials-enhanced', 'daily-life-enhanced'],
    totalXP: 1400,
    estimatedTime: 210,
    unlocked: false,
    progress: 0
  }
];

// Achievement definitions
export const achievements = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'lessons' as const,
    requirement: { type: 'lessons_completed', value: 1 },
    unlocked: false,
    xpReward: 50
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak' as const,
    requirement: { type: 'streak', value: 7 },
    unlocked: false,
    xpReward: 100
  },
  {
    id: 'xp-1000',
    title: 'Knowledge Seeker',
    description: 'Earn 1000 XP points',
    icon: '⭐',
    category: 'xp' as const,
    requirement: { type: 'xp', value: 1000 },
    unlocked: false,
    xpReward: 200
  },
  {
    id: 'pronunciation-master',
    title: 'Pronunciation Master',
    description: 'Complete all pronunciation lessons',
    icon: '🎤',
    category: 'skills' as const,
    requirement: { type: 'skill_level', value: 5 },
    unlocked: false,
    xpReward: 150
  }
];
