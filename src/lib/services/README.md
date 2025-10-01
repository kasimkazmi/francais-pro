# Lesson Service API

## Overview
The lesson service provides an abstraction layer for fetching learning content. It's designed to easily switch between local data and API calls.

## Current Setup (Local Data)
```typescript
const USE_API = false; // in lesson-service.ts
```
Data is loaded from local files in `src/data/lessons/`.

## Switching to API

### Step 1: Enable API Mode
```typescript
// In src/lib/services/lesson-service.ts
const USE_API = true;
```

### Step 2: Update API Routes
The API routes are already created:
- `GET /api/lessons` - Returns all modules
- `GET /api/lessons/[lessonId]` - Returns detailed lesson content

### Step 3: Connect to Backend
Replace the local data with database queries:

```typescript
// In src/app/api/lessons/[lessonId]/route.ts
export async function GET(req, { params }) {
  const { lessonId } = params;
  
  // Replace this:
  const lesson = detailedLessons[lessonId];
  
  // With this:
  const lesson = await db.lessons.findOne({ id: lessonId });
  
  return NextResponse.json({ success: true, data: lesson });
}
```

## Data Structure

### Module Structure
```typescript
{
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}
```

### Lesson Structure
```typescript
{
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  sections: Section[];
}
```

### Section Structure
```typescript
{
  title: string;
  type: 'introduction' | 'learning' | 'practice' | 'review';
  duration: number;
  content: string;
  examples?: Example[];
  exercises?: Exercise[];
}
```

### Example Structure
```typescript
{
  french: string;
  english: string;
  pronunciation?: string;
  audio?: string;
}
```

### Exercise Structure
```typescript
{
  type: 'multiple-choice' | 'fill-blank' | 'matching';
  question: string;
  
  // Multiple choice
  options?: string[];
  correctAnswer?: number;
  
  // Fill in blank
  sentence?: string;
  correctAnswer?: string;
  alternatives?: string[];
  
  // Common
  explanation?: string;
}
```

## Future Enhancements

### Planned Features:
- [ ] Audio file URLs instead of text-to-speech
- [ ] Video lessons integration
- [ ] AI-generated exercises
- [ ] Adaptive difficulty
- [ ] Spaced repetition system
- [ ] Community-created content
- [ ] Real-time collaboration

### API Endpoints to Add:
- `POST /api/lessons/[lessonId]/exercises` - Submit exercise answers
- `GET /api/lessons/[lessonId]/hints` - Get hints for exercises
- `POST /api/progress` - Track lesson progress
- `GET /api/recommendations` - Get personalized lesson recommendations

