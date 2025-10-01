import alphabetData from '@/data/alphabet.json';

// Generate alphabet lesson from JSON
function createAlphabetLesson() {
  const letters = alphabetData.alphabet;

  return {
    id: 'french-alphabet',
    uniqueId: `lesson_${Date.now()}_001`,
    title: 'French Alphabet & Pronunciation',
    description: 'Master the French alphabet and learn how each letter sounds',
    duration: 15,
    difficulty: 'easy' as const,
    xpReward: 50,
    sections: [
      {
        title: 'Introduction to French Alphabet',
        type: 'introduction' as const,
        duration: 3,
        content: 'The French alphabet has 26 letters, just like English, but the pronunciation is different. Learning the alphabet will help you spell words and understand pronunciation patterns.',
        examples: []
      },
      {
        title: 'The Letters A-M',
        type: 'learning' as const,
        duration: 4,
        content: 'Let\'s start with the first half of the alphabet. Pay attention to how each letter sounds.',
        examples: letters.slice(0, 13).map(item => ({
          french: item.letter,
          english: item.pronunciation,
          pronunciation: item.pronunciation,
          description: `Example: ${item.example}`
        }))
      },
      {
        title: 'The Letters N-Z',
        type: 'learning' as const,
        duration: 4,
        content: 'Now let\'s continue with the second half of the alphabet.',
        examples: letters.slice(13).map(item => ({
          french: item.letter,
          english: item.pronunciation,
          pronunciation: item.pronunciation,
          description: `Example: ${item.example}`
        }))
      },
      {
        title: 'Practice: Alphabet Quiz',
        type: 'practice' as const,
        duration: 3,
        content: 'Test your knowledge of French letter pronunciation!',
        exercises: [
          {
            type: 'multiple-choice' as const,
            question: 'How is the letter "H" pronounced in French?',
            options: ['ahsh', 'aych', 'hah', 'ash'],
            correctAnswer: 0,
            explanation: 'H in French is pronounced "ahsh", and it\'s often silent in words.'
          },
          {
            type: 'multiple-choice' as const,
            question: 'Which letter is pronounced "ee"?',
            options: ['E', 'I', 'Y', 'A'],
            correctAnswer: 1,
            explanation: 'The letter I is pronounced "ee" in French, similar to the English word "see".'
          },
          {
            type: 'fill-blank' as const,
            question: 'Complete: The French letter H is pronounced ___',
            sentence: 'The letter H sounds like ___',
            correctAnswer: 'ahsh',
            alternatives: ['ahsh', 'ash', 'aych', 'hah'],
            explanation: 'H in French is pronounced "ahsh", and it\'s often silent in words.'
          }
        ]
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 1,
        content: `Great job! You've learned the French alphabet!

**Key Points:**
✓ French alphabet has 26 letters like English
✓ Many pronunciations are different from English
✓ Some letters like H are often silent in words

**Special Letters:**
• É, È, Ê (E with accents)
• Ç (C with cedilla)
• Letters like J, R, U sound very different from English

**Practice Tips:**
Practice spelling your name in French! Say each letter out loud using the French pronunciation.`,
        examples: []
      }
    ]
  };
}

export const alphabetLessons = {
  'french-alphabet': createAlphabetLesson()
};

