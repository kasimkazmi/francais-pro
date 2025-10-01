import vocabularyData from '@/data/vocabulary.json';

// Helper function to create vocabulary lessons from JSON
function createVocabLesson(
  id: string,
  category: keyof typeof vocabularyData,
  title: string,
  description: string,
  difficulty: 'easy' | 'medium' | 'hard'
) {
  const items = vocabularyData[category] as Array<{
    french: string;
    english: string;
    pronunciation: string;
    example: string;
  }>;

  const duration = Math.max(20, Math.ceil(items.length * 1.5));
  const xpReward = difficulty === 'easy' ? 75 : difficulty === 'medium' ? 100 : 125;

  return {
    id,
    uniqueId: `lesson_${Date.now()}_${id}`,
    title,
    description,
    duration,
    difficulty,
    xpReward,
    sections: [
      {
        title: 'Introduction',
        type: 'introduction' as const,
        duration: 3,
        content: description,
        examples: []
      },
      {
        title: `Learning ${title}`,
        type: 'learning' as const,
        duration: Math.ceil(duration * 0.6),
        content: `Master these essential French words and phrases. Pay attention to pronunciation and usage in context.`,
        examples: items.map(item => ({
          french: item.french,
          english: item.english,
          pronunciation: item.pronunciation,
          description: item.example
        }))
      },
      {
        title: 'Practice Exercises',
        type: 'practice' as const,
        duration: Math.ceil(duration * 0.25),
        content: 'Test your knowledge with these translation exercises!',
        exercises: items.slice(0, Math.min(10, items.length)).map((item, index) => {
          // Get 3 random wrong answers
          const wrongAnswers = items
            .filter(i => i.french !== item.french)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(i => i.french);
          
          const allOptions = [item.french, ...wrongAnswers].sort(() => Math.random() - 0.5);
          const correctIndex = allOptions.indexOf(item.french);

          return {
            type: 'translation' as const,
            question: `How do you say "${item.english}" in French?`,
            options: allOptions,
            correctAnswer: correctIndex,
            explanation: `"${item.french}" means "${item.english}". Example: ${item.example}`
          };
        })
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: Math.ceil(duration * 0.15),
        content: `Congratulations! You've learned ${items.length} new vocabulary words. Keep practicing to master them!`,
        examples: []
      }
    ]
  };
}

export const vocabularyLessons = {
  'colors-family': createVocabLesson(
    'colors-family',
    'colors',
    'Colors & Family',
    'Learn essential French vocabulary for colors and family members',
    'medium'
  ),
  'food-drinks': createVocabLesson(
    'food-drinks',
    'food',
    'Food & Drinks',
    'Discover French vocabulary for food, beverages, and dining',
    'medium'
  ),
  'work-professions': createVocabLesson(
    'work-professions',
    'professions',
    'Work & Professions',
    'Master professional vocabulary and job-related terms in French',
    'hard'
  ),
};

