/**
 * Utility to convert existing JSON data files into lesson format
 */

import grammarData from '@/data/grammar.json';
import vocabularyData from '@/data/vocabulary.json';
import conversationsData from '@/data/conversations.json';
import travelData from '@/data/travel.json';

interface VocabItem {
  french: string;
  english: string;
  pronunciation: string;
  example: string;
}

interface GrammarItem {
  french: string;
  english: string;
  pronunciation?: string;
  example?: string;
  pronoun?: string;
}

interface VerbConjugation {
  infinitive: string;
  english: string;
  conjugations: GrammarItem[];
}

/**
 * Convert vocabulary JSON to lesson format
 */
export function createVocabularyLesson(
  category: keyof typeof vocabularyData,
  lessonId: string,
  title: string,
  difficulty: 'easy' | 'medium' | 'hard'
) {
  const items = vocabularyData[category] as VocabItem[];
  
  return {
    id: lessonId,
    uniqueId: `lesson_${Date.now()}_${lessonId}`,
    title,
    description: `Learn French vocabulary for ${category}`,
    duration: Math.max(15, Math.ceil(items.length * 1.5)),
    difficulty,
    xpReward: difficulty === 'easy' ? 75 : difficulty === 'medium' ? 100 : 125,
    sections: [
      {
        title: 'Introduction',
        type: 'introduction' as const,
        duration: 3,
        content: `In this lesson, you'll learn essential French vocabulary related to ${category}. Each word comes with pronunciation guides and example sentences to help you use them correctly.`,
        examples: []
      },
      {
        title: `${title} Vocabulary`,
        type: 'learning' as const,
        duration: Math.ceil(items.length * 1),
        content: `Let's explore the French words for ${category}. Pay attention to pronunciation and gender (le/la).`,
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
        duration: Math.ceil(items.length * 0.3),
        content: 'Test your knowledge with these exercises!',
        exercises: items.slice(0, Math.min(10, items.length)).map((item, index) => ({
          type: 'translation',
          question: `How do you say "${item.english}" in French?`,
          options: [
            item.french,
            ...getRandomOptions(items, item.french, 3)
          ].sort(() => Math.random() - 0.5),
          correctAnswer: 0, // Will need to find correct index after shuffle
          explanation: `"${item.french}" means "${item.english}". Example: ${item.example}`
        }))
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 2,
        content: `Great job! You've learned ${items.length} new words related to ${category}.`,
        examples: []
      }
    ]
  };
}

/**
 * Convert grammar JSON to lesson format
 */
export function createGrammarLesson(
  category: 'articles' | 'pronouns' | 'verbs',
  subcategory: string,
  lessonId: string,
  title: string,
  difficulty: 'easy' | 'medium' | 'hard'
) {
  let items: GrammarItem[] = [];
  let description = '';
  
  if (category === 'articles') {
    items = grammarData.articles[subcategory as 'definite' | 'indefinite'];
    description = `Learn how to use French ${subcategory} articles (the, a/an, some)`;
  } else if (category === 'pronouns') {
    items = grammarData.pronouns[subcategory as 'subject' | 'object'];
    description = `Master French ${subcategory} pronouns`;
  } else if (category === 'verbs') {
    const verbData = grammarData.verbs[subcategory as keyof typeof grammarData.verbs] as VerbConjugation;
    items = verbData.conjugations;
    description = `Learn to conjugate the verb "${verbData.infinitive}" (${verbData.english})`;
  }
  
  return {
    id: lessonId,
    uniqueId: `lesson_${Date.now()}_${lessonId}`,
    title,
    description,
    duration: 20,
    difficulty,
    xpReward: difficulty === 'easy' ? 75 : difficulty === 'medium' ? 100 : 150,
    sections: [
      {
        title: 'Introduction',
        type: 'introduction' as const,
        duration: 3,
        content: description,
        examples: []
      },
      {
        title: `${title} Rules`,
        type: 'learning' as const,
        duration: 10,
        content: `Let's learn the ${title.toLowerCase()} in French.`,
        examples: items.map((item: GrammarItem) => ({
          french: item.french,
          english: item.english,
          pronunciation: item.pronunciation || '',
          description: item.example || `${item.pronoun ? item.pronoun + ' ' : ''}${item.french} = ${item.english}`
        }))
      },
      {
        title: 'Practice',
        type: 'practice' as const,
        duration: 5,
        content: 'Test your understanding!',
        exercises: items.slice(0, 5).map((item: GrammarItem) => ({
          type: 'translation',
          question: `Translate: "${item.english}"`,
          options: [
            item.french,
            ...getRandomOptions(items.map((i: GrammarItem) => ({ french: i.french })), item.french, 3)
          ].sort(() => Math.random() - 0.5),
          correctAnswer: 0,
          explanation: `The correct answer is "${item.french}" which means "${item.english}".`
        }))
      },
      {
        title: 'Review',
        type: 'review' as const,
        duration: 2,
        content: `Excellent! You've mastered ${title.toLowerCase()}.`,
        examples: []
      }
    ]
  };
}

/**
 * Helper to get random options for multiple choice
 */
function getRandomOptions(items: Array<{ french: string }>, exclude: string, count: number): string[] {
  const filtered = items.filter((item) => item.french !== exclude);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((item) => item.french);
}

/**
 * Generate all vocabulary lessons from JSON
 */
export function generateAllVocabularyLessons() {
  return {
    'colors-family': createVocabularyLesson('colors', 'colors-family', 'Colors & Family', 'medium'),
    'food-drinks': createVocabularyLesson('food', 'food-drinks', 'Food & Drinks', 'medium'),
    'work-professions': createVocabularyLesson('professions', 'work-professions', 'Work & Professions', 'hard'),
  };
}

/**
 * Generate all grammar lessons from JSON
 */
export function generateAllGrammarLessons() {
  return {
    'articles': createGrammarLesson('articles', 'definite', 'articles', 'Articles (le, la, les)', 'medium'),
    'present-tense': createGrammarLesson('verbs', 'etre', 'present-tense', 'Present Tense: Être', 'hard'),
  };
}

