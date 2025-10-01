export const numbersLessons = {
  'numbers-1-20': {
    id: 'numbers-1-20',
    uniqueId: `lesson_${Date.now()}_003`,
    title: 'Numbers 1-20',
    description: 'Master French numbers from 1 to 20',
    duration: 25,
    difficulty: 'medium' as const,
    xpReward: 100,
    sections: [
      {
        title: 'Introduction to French Numbers',
        type: 'introduction' as const,
        duration: 3,
        content: `Numbers are essential for everyday conversations! You'll use them for shopping, telling time, giving phone numbers, and much more.

In this lesson, you'll learn:
• Numbers from 1 to 20 in French
• Correct pronunciation for each number
• How to use numbers in sentences
• Practice counting and number recognition

French numbers follow specific patterns that make them logical once you understand the system!`,
        examples: []
      },
      {
        title: 'Numbers 1-10',
        type: 'learning' as const,
        duration: 8,
        content: `Let's start with the first ten numbers. These are fundamental and you'll use them constantly:`,
        examples: [
          {
            french: 'un',
            english: '1 (one)',
            pronunciation: 'uhn',
            audio: 'un'
          },
          {
            french: 'deux',
            english: '2 (two)',
            pronunciation: 'duh',
            audio: 'deux'
          },
          {
            french: 'trois',
            english: '3 (three)',
            pronunciation: 'twah',
            audio: 'trois'
          },
          {
            french: 'quatre',
            english: '4 (four)',
            pronunciation: 'katr',
            audio: 'quatre'
          },
          {
            french: 'cinq',
            english: '5 (five)',
            pronunciation: 'sank',
            audio: 'cinq'
          },
          {
            french: 'six',
            english: '6 (six)',
            pronunciation: 'seess',
            audio: 'six'
          },
          {
            french: 'sept',
            english: '7 (seven)',
            pronunciation: 'set',
            audio: 'sept'
          },
          {
            french: 'huit',
            english: '8 (eight)',
            pronunciation: 'wheet',
            audio: 'huit'
          },
          {
            french: 'neuf',
            english: '9 (nine)',
            pronunciation: 'nuhf',
            audio: 'neuf'
          },
          {
            french: 'dix',
            english: '10 (ten)',
            pronunciation: 'deess',
            audio: 'dix'
          }
        ]
      },
      {
        title: 'Numbers 11-20',
        type: 'learning' as const,
        duration: 8,
        content: `Now let's learn numbers 11 through 20. Notice the patterns - especially 17, 18, 19!`,
        examples: [
          {
            french: 'onze',
            english: '11 (eleven)',
            pronunciation: 'onz',
            audio: 'onze'
          },
          {
            french: 'douze',
            english: '12 (twelve)',
            pronunciation: 'dooz',
            audio: 'douze'
          },
          {
            french: 'treize',
            english: '13 (thirteen)',
            pronunciation: 'trez',
            audio: 'treize'
          },
          {
            french: 'quatorze',
            english: '14 (fourteen)',
            pronunciation: 'kah-torz',
            audio: 'quatorze'
          },
          {
            french: 'quinze',
            english: '15 (fifteen)',
            pronunciation: 'kanz',
            audio: 'quinze'
          },
          {
            french: 'seize',
            english: '16 (sixteen)',
            pronunciation: 'sez',
            audio: 'seize'
          },
          {
            french: 'dix-sept',
            english: '17 (seventeen) - literally "ten-seven"',
            pronunciation: 'dee-set',
            audio: 'dix-sept'
          },
          {
            french: 'dix-huit',
            english: '18 (eighteen) - literally "ten-eight"',
            pronunciation: 'dee-zwheet',
            audio: 'dix-huit'
          },
          {
            french: 'dix-neuf',
            english: '19 (nineteen) - literally "ten-nine"',
            pronunciation: 'deez-nuhf',
            audio: 'dix-neuf'
          },
          {
            french: 'vingt',
            english: '20 (twenty)',
            pronunciation: 'van',
            audio: 'vingt'
          }
        ]
      },
      {
        title: 'Practice: Numbers Quiz',
        type: 'practice' as const,
        duration: 4,
        content: 'Test your knowledge of French numbers!',
        exercises: [
          {
            type: 'multiple-choice',
            question: 'What is "5" in French?',
            options: ['cinq', 'six', 'sept', 'huit'],
            correctAnswer: 0,
            explanation: 'Five in French is "cinq", pronounced like "sank".'
          },
          {
            type: 'multiple-choice',
            question: 'How do you say "18" in French?',
            options: ['dix-sept', 'dix-huit', 'dix-neuf', 'vingt'],
            correctAnswer: 1,
            explanation: 'Eighteen is "dix-huit" (ten-eight) in French.'
          },
          {
            type: 'fill-blank',
            question: 'Fill in: trois, quatre, ___, six',
            sentence: 'trois, quatre, ___, six',
            correctAnswer: 'cinq',
            alternatives: ['5'],
            explanation: 'The number between 4 and 6 is "cinq" (5).'
          },
          {
            type: 'multiple-choice',
            question: 'What does "vingt" mean?',
            options: ['10', '15', '20', '25'],
            correctAnswer: 2,
            explanation: '"Vingt" is the French word for twenty.'
          }
        ]
      },
      {
        title: 'Review & Summary',
        type: 'review' as const,
        duration: 2,
        content: `Fantastique! You've mastered numbers 1-20 in French!

**What You've Learned:**
✓ Numbers 1-10 (un, deux, trois...)
✓ Numbers 11-20 (onze, douze, treize...)
✓ The "ten + number" pattern (17, 18, 19)

**Important Patterns:**
• 11-16 are unique words
• 17-19 follow the pattern "dix + number"
• 20 is "vingt" - a base for higher numbers

**Pronunciation Tips:**
• "six" = seess (but "seez" before a vowel)
• "dix" = deess (but "deez" before a vowel)
• "vingt" = van (the "gt" is silent)

**Next Steps:**
Practice counting every day! Try counting objects around you in French to reinforce your learning.`,
        examples: []
      }
    ]
  }
};

