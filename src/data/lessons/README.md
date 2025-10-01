# Lesson Data Structure

## Overview
This directory contains all lesson content for the Français Pro learning platform. We've transitioned from hardcoded lessons to a **JSON-driven approach** that leverages existing data files.

## Architecture

### Data Sources
All lesson content is generated from JSON files in `/src/data/`:
- `alphabet.json` → Alphabet lessons
- `greetings.json` → Greeting lessons  
- `numbers.json` → Number lessons
- `vocabulary.json` → Vocabulary lessons (food, colors, professions, etc.)
- `grammar.json` → Grammar lessons (articles, verbs, pronouns)
- `conversations.json` → Conversation practice
- `travel.json` → Travel vocabulary

### Lesson Files

#### Current Lesson Files:
1. **`alphabet-lessons.ts`** - French alphabet & pronunciation
2. **`greetings-lessons.ts`** - Basic greetings
3. **`numbers-lessons.ts`** - Numbers 1-20
4. **`vocabulary-lessons.ts`** ✨ NEW
   - Colors & Family
   - Food & Drinks
   - Work & Professions
5. **`grammar-lessons.ts`** ✨ NEW
   - Articles (le, la, les)
   - Present Tense (être, avoir)
   - Gender Agreement

#### Main Configuration:
- **`learning-content.ts`** - Consolidates all lessons into modules

## Lesson Structure

Each lesson follows this format:

```typescript
{
  id: 'lesson-id',
  uniqueId: 'lesson_timestamp_id',
  title: 'Lesson Title',
  description: 'What you'll learn',
  duration: 20, // minutes
  difficulty: 'easy' | 'medium' | 'hard',
  xpReward: 100,
  sections: [
    {
      title: 'Introduction',
      type: 'introduction',
      duration: 3,
      content: 'Overview...',
      examples: []
    },
    {
      title: 'Learning Content',
      type: 'learning',
      duration: 10,
      content: 'Main content...',
      examples: [
        {
          french: 'Bonjour',
          english: 'Hello',
          pronunciation: 'bon-zhoor',
          description: 'Example usage'
        }
      ]
    },
    {
      title: 'Practice',
      type: 'practice',
      duration: 5,
      content: 'Test your knowledge',
      exercises: [
        {
          type: 'translation',
          question: 'Question?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 0,
          explanation: 'Why this is correct'
        }
      ]
    },
    {
      title: 'Review',
      type: 'review',
      duration: 2,
      content: 'Summary...',
      examples: []
    }
  ]
}
```

## Learning Modules

### 1. Foundations (Beginners)
- French Alphabet & Pronunciation
- Basic Greetings
- Numbers 1-20
- Colors & Family

### 2. Grammar
- Articles (le, la, les)
- Present Tense Verbs (être, avoir)
- Gender Agreement

### 3. Vocabulary
- Food & Drinks
- Work & Professions
- Travel & Transportation (coming soon)

### 4. Practice
- Speaking Exercises
- Writing Prompts
- Listening Comprehension

## How It Works

### 1. JSON Data Files
Original data stored in `/src/data/*.json`:
```json
{
  "food": [
    {
      "french": "le pain",
      "english": "bread",
      "pronunciation": "luh pan",
      "example": "Je mange du pain"
    }
  ]
}
```

### 2. Lesson Generators
Functions in `*-lessons.ts` convert JSON to lesson format:
```typescript
function createVocabLesson(category, id, title, difficulty) {
  const items = vocabularyData[category];
  return {
    // ... structured lesson with sections & exercises
  };
}
```

### 3. Export & Use
All lessons exported via `learning-content.ts`:
```typescript
export const detailedLessons = {
  ...alphabetLessons,
  ...grammarLessons,
  ...vocabularyLessons
};
```

### 4. API Integration Ready
Can switch to API with one flag in `lesson-service.ts`:
```typescript
const USE_API = false; // Switch to true for backend
```

## Benefits

### ✅ **No Duplication**
- JSON files already exist
- No need to recreate content manually
- Single source of truth

### ✅ **Easy Updates**
- Update JSON → Lessons update automatically
- Add new vocabulary → New lessons generated
- Consistent structure across all lessons

### ✅ **Scalable**
- Add new modules by creating JSON files
- Reuse existing content in multiple ways
- Easy to add more languages later

### ✅ **Type-Safe**
- TypeScript ensures correct structure
- Compile-time error checking
- Auto-complete in IDE

## Adding New Lessons

### From Existing JSON:
```typescript
// 1. Create converter function
export const vocabularyLessons = {
  'new-topic': createVocabLesson(
    'category',
    'lesson-id',
    'Lesson Title',
    'medium'
  )
};

// 2. Import in learning-content.ts
import { vocabularyLessons } from './vocabulary-lessons';

// 3. Add to detailedLessons
export const detailedLessons = {
  ...vocabularyLessons
};

// 4. Add to module
generateLessonMetadata(vocabularyLessons['new-topic'], 'vocabulary')
```

### From New JSON File:
```typescript
// 1. Create /src/data/new-topic.json
// 2. Create /src/data/lessons/new-topic-lessons.ts
// 3. Import and export in learning-content.ts
```

## Future Enhancements

- [ ] Add conversation lessons from `conversations.json`
- [ ] Add travel lessons from `travel.json`
- [ ] Add culture lessons from `culture.json`
- [ ] Add TEF preparation from `tef-preparation.json`
- [ ] Backend API for dynamic content
- [ ] User-generated lessons
- [ ] Adaptive difficulty based on performance

## Related Files

- `/src/lib/services/lesson-service.ts` - Data fetching abstraction
- `/src/lib/utils/difficulty.ts` - Difficulty level utilities
- `/src/hooks/useProgress.ts` - Progress tracking
- `/src/types/index.ts` - Type definitions

