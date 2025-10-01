import numbersData from '@/data/numbers.json';

// Generate numbers lesson from JSON
function createNumbersLesson() {
  const numbers = numbersData.numbers1to20;

  return {
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
        content: 'Numbers are fundamental for everyday communication. French numbers have some unique patterns, especially after 10. Let\'s master them!',
        examples: []
      },
      {
        title: 'Numbers 1-10',
        type: 'learning' as const,
        duration: 8,
        content: 'These are the foundation. Memorize these first!',
        examples: numbers.slice(0, 10).map(item => ({
          french: `${item.num} - ${item.french}`,
          english: `${item.num}`,
          pronunciation: item.pronunciation,
          description: `Number ${item.num} in French`
        }))
      },
      {
        title: 'Numbers 11-20',
        type: 'learning' as const,
        duration: 8,
        content: 'Numbers 11-16 are unique words. Notice the pattern for 17-19: dix + number.',
        examples: numbers.slice(10).map(item => ({
          french: `${item.num} - ${item.french}`,
          english: `${item.num}`,
          pronunciation: item.pronunciation,
          description: item.num >= 17 ? 'Literally "ten-seven", "ten-eight", "ten-nine"' : 'Unique word to memorize'
        }))
      },
      {
        title: 'Practice: Numbers Quiz',
        type: 'practice' as const,
        duration: 4,
        content: 'Test your knowledge of French numbers!',
        exercises: [
          {
            type: 'multiple-choice' as const,
            question: 'What is "5" in French?',
            options: ['quatre', 'cinq', 'six', 'sept'],
            correctAnswer: 1,
            explanation: 'Five is "cinq" (pronounced "sank") in French.'
          },
          {
            type: 'multiple-choice' as const,
            question: 'How do you say "12" in French?',
            options: ['onze', 'douze', 'treize', 'quatorze'],
            correctAnswer: 1,
            explanation: 'Twelve is "douze" (pronounced "dooz") in French.'
          },
          {
            type: 'multiple-choice' as const,
            question: 'How do you say "18" in French?',
            options: ['dix-sept', 'dix-huit', 'dix-neuf', 'vingt'],
            correctAnswer: 1,
            explanation: 'Eighteen is "dix-huit" (ten-eight) in French.'
          },
          {
            type: 'fill-blank' as const,
            question: 'Fill in: trois, quatre, ___, six',
            sentence: 'trois, quatre, ___, six',
            correctAnswer: 'cinq',
            alternatives: ['cinq', 'quatre', 'sept', 'trois'],
            explanation: 'The number between 4 and 6 is "cinq" (5).'
          },
          {
            type: 'multiple-choice' as const,
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
  };
}

export const numbersLessons = {
  'numbers-1-20': createNumbersLesson()
};
