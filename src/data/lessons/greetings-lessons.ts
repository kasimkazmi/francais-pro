import greetingsData from '@/data/greetings.json';

// Generate greetings lesson from JSON
function createGreetingsLesson() {
  const greetings = greetingsData.basicGreetings;
  const polite = greetingsData.politeExpressions;

  return {
    id: 'basic-greetings',
    uniqueId: `lesson_${Date.now()}_002`,
    title: 'Basic Greetings',
    description: 'Learn essential French greetings and polite expressions',
    duration: 20,
    difficulty: 'easy' as const,
    xpReward: 75,
    sections: [
      {
        title: 'Introduction to French Greetings',
        type: 'introduction' as const,
        duration: 3,
        content: 'Greetings are essential for any conversation. French has both formal and informal ways to greet people. Choosing the right greeting shows respect and cultural awareness.',
        examples: []
      },
      {
        title: 'Common Greetings',
        type: 'learning' as const,
        duration: 6,
        content: 'Let\'s learn the most common French greetings. Notice the difference between formal and informal expressions.',
        examples: greetings.map(item => ({
          french: item.french,
          english: item.english,
          pronunciation: item.pronunciation,
          description: item.usage
        }))
      },
      {
        title: 'Polite Expressions',
        type: 'learning' as const,
        duration: 5,
        content: 'Politeness is very important in French culture. Here are essential polite expressions.',
        examples: polite.map(item => ({
          french: item.french,
          english: item.english,
          pronunciation: item.pronunciation,
          description: item.usage || `Used to say "${item.english.toLowerCase()}"`
        }))
      },
      {
        title: 'Practice: Greetings Quiz',
        type: 'practice' as const,
        duration: 4,
        content: 'Test your knowledge of French greetings!',
        exercises: [
          {
            type: 'multiple-choice' as const,
            question: 'How do you say "Hello" in French?',
            options: ['Bonjour', 'Bonsoir', 'Salut', 'Au revoir'],
            correctAnswer: 0,
            explanation: '"Bonjour" is the standard way to say hello in French, used from morning until evening.'
          },
          {
            type: 'multiple-choice' as const,
            question: 'What is the FORMAL way to ask "How are you?"',
            options: ['Comment allez-vous?', 'Ça va?', 'Salut', 'Quoi de neuf?'],
            correctAnswer: 0,
            explanation: '"Comment allez-vous?" is the formal way to ask "How are you?" Use this with people you don\'t know well or in professional settings.'
          },
          {
            type: 'multiple-choice' as const,
            question: 'Which greeting is INFORMAL?',
            options: ['Comment allez-vous?', 'Bonjour', 'Salut', 'Bonsoir'],
            correctAnswer: 2,
            explanation: '"Salut" is an informal way to say "hi" - use it with friends and family, not in formal situations.'
          },
          {
            type: 'fill-blank' as const,
            question: 'Complete the phrase: "___ merci!" (Thank you very much)',
            sentence: '___ merci!',
            correctAnswer: 'Merci beaucoup',
            alternatives: ['Merci beaucoup', 'Bonjour', 'Bonsoir', 'Au revoir'],
            explanation: '"Merci beaucoup" means "thank you very much" and is commonly used to show extra gratitude.'
          },
          {
            type: 'multiple-choice' as const,
            question: 'What does "Ça va?" mean?',
            options: ['Goodbye', 'How are you?', 'Please', 'Thank you'],
            correctAnswer: 1,
            explanation: '"Ça va?" is an informal way to ask "How are you?" or "How\'s it going?" You can also answer with "Ça va" (I\'m fine).'
          }
        ]
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 2,
        content: `Excellent! You've learned essential French greetings!

**What You've Learned:**
✓ Basic greetings (Bonjour, Bonsoir, Salut)
✓ Polite expressions (Merci, S'il vous plaît, Excusez-moi)
✓ Formal vs Informal greetings
✓ How to say goodbye (Au revoir, À bientôt)

**Important Tips:**
• Use "Bonjour" when entering shops or meeting people
• "Vous" = formal, "Tu" = informal
• Always say "Bonjour" before asking a question
• "Salut" is ONLY for friends/family

**Cultural Note:**
In France, it's considered rude to not greet someone before starting a conversation. Always start with "Bonjour!"

**Practice:**
Greet 3 people today using "Bonjour" - even if just in practice!`,
        examples: []
      }
    ]
  };
}

export const greetingsLessons = {
  'basic-greetings': createGreetingsLesson()
};
