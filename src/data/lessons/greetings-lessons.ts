export const greetingsLessons = {
  'basic-greetings': {
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
        content: `Greetings are the foundation of any conversation! In French culture, greetings are very important and show respect.

In this lesson, you'll learn:
• How to say hello and goodbye in French
• Formal vs. informal greetings
• Time-specific greetings (morning, afternoon, evening)
• Polite expressions for daily interactions

Mastering these basics will help you start conversations with confidence!`,
        examples: []
      },
      {
        title: 'Essential Greetings',
        type: 'learning' as const,
        duration: 10,
        content: `Let's learn the most common French greetings you'll use every day:`,
        examples: [
          {
            french: 'Bonjour',
            english: 'Hello / Good day',
            pronunciation: 'bon-zhoor',
            audio: 'Bonjour'
          },
          {
            french: 'Bonsoir',
            english: 'Good evening',
            pronunciation: 'bon-swahr',
            audio: 'Bonsoir'
          },
          {
            french: 'Salut',
            english: 'Hi (informal)',
            pronunciation: 'sah-loo',
            audio: 'Salut'
          },
          {
            french: 'Au revoir',
            english: 'Goodbye',
            pronunciation: 'oh ruh-vwahr',
            audio: 'Au revoir'
          },
          {
            french: 'Bonne nuit',
            english: 'Good night',
            pronunciation: 'bun nwee',
            audio: 'Bonne nuit'
          },
          {
            french: 'Comment allez-vous?',
            english: 'How are you? (formal)',
            pronunciation: 'koh-mahn tah-lay voo',
            audio: 'Comment allez-vous'
          },
          {
            french: 'Ça va?',
            english: 'How are you? (informal)',
            pronunciation: 'sah vah',
            audio: 'Ça va'
          },
          {
            french: 'Merci',
            english: 'Thank you',
            pronunciation: 'mehr-see',
            audio: 'Merci'
          },
          {
            french: 'De rien',
            english: 'You\'re welcome',
            pronunciation: 'duh ree-an',
            audio: 'De rien'
          },
          {
            french: 'S\'il vous plaît',
            english: 'Please (formal)',
            pronunciation: 'seel voo play',
            audio: 'S\'il vous plaît'
          }
        ]
      },
      {
        title: 'Practice: Greetings',
        type: 'practice' as const,
        duration: 5,
        content: 'Test your knowledge of French greetings!',
        exercises: [
          {
            type: 'multiple-choice',
            question: 'How do you say "Good evening" in French?',
            options: ['Bonjour', 'Bonsoir', 'Bonne nuit', 'Salut'],
            correctAnswer: 1,
            explanation: 'Bonsoir is used to greet someone in the evening, starting from around 6 PM.'
          },
          {
            type: 'multiple-choice',
            question: 'Which greeting is INFORMAL?',
            options: ['Comment allez-vous?', 'Bonjour', 'Salut', 'Bonsoir'],
            correctAnswer: 2,
            explanation: 'Salut is an informal way to say "hi" - use it with friends and family, not in formal situations.'
          },
          {
            type: 'fill-blank',
            question: 'Fill in the blank: "___ merci!" (Thank you very much)',
            sentence: '___ merci!',
            correctAnswer: 'Merci beaucoup',
            alternatives: ['Beaucoup'],
            explanation: '"Merci beaucoup" means "thank you very much" and is commonly used to show extra gratitude.'
          },
          {
            type: 'multiple-choice',
            question: 'What does "Ça va?" mean?',
            options: ['Goodbye', 'How are you?', 'Please', 'Thank you'],
            correctAnswer: 1,
            explanation: '"Ça va?" is an informal way to ask "How are you?" - literally it means "It goes?"'
          }
        ]
      },
      {
        title: 'Review & Summary',
        type: 'review' as const,
        duration: 2,
        content: `Bravo! You've completed the Basic Greetings lesson.

**What You've Learned:**
✓ Essential French greetings (Bonjour, Bonsoir, Salut)
✓ How to say goodbye (Au revoir, Bonne nuit)
✓ Asking "How are you?" (Comment allez-vous? / Ça va?)
✓ Polite expressions (Merci, De rien, S'il vous plaît)

**Formal vs. Informal:**
• Formal: Use "vous" (Bonjour, Comment allez-vous?)
• Informal: Use "tu" (Salut, Ça va?)

**Cultural Tip:**
In France, it's polite to always greet shopkeepers and service workers with "Bonjour" when entering!

Keep practicing these greetings daily - they're the foundation of French conversation!`,
        examples: []
      }
    ]
  }
};

