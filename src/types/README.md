# Type Definitions

This directory contains all TypeScript type definitions organized by category.

## File Structure

### Core Types
- **`index.ts`** - Main types (User, Module, Lesson, Quiz, Progress, etc.)
- **`data-types.ts`** - JSON data structure types (Alphabet, Numbers, Grammar, etc.)

### Learning System
- **`lesson-types.ts`** - Lesson structure types
  - Example, Exercise, ExerciseResult
  - LessonSection, SectionType
  - DetailedLesson, DifficultyLevel

- **`component-props.ts`** - Learning component props
  - LearnHeaderProps, LearnSidebarProps
  - LessonSectionProps, ExerciseQuizProps
  - LessonReviewProps, ExampleListProps

### UI Components
- **`ui-props.ts`** - UI component props
  - Modal props (Auth, Confirm, Profile, etc.)
  - Interactive components (Audio, Avatar, Tooltip)
  - Loading & Skeleton props
  - Search, Tabs, Cards

### Layout & Themes
- **`layout-props.ts`** - Layout component props
  - MainLayoutProps, AdminLayoutProps, LearnLayoutProps

- **`seasonal-props.ts`** - Seasonal theme component props
  - SeasonalCard, ThemeAwareButton
  - DraggableLearningPath

- **`halloween-props.ts`** - Halloween theme component props
  - HalloweenMusicManager, PageWrapper
  - Decorative elements (Bat, Ghost, Pumpkin, etc.)

### Utilities
- **`search-types.ts`** - Search functionality types
  - SearchResult, SearchContextType

## Best Practices

### ✅ DO:
- Import types from these centralized files
- Add new types to the appropriate category file
- Use explicit types instead of `any`
- Export types that are used across multiple files

### ❌ DON'T:
- Define duplicate interfaces in components
- Use `any` type
- Create component-specific type files (use these centralized ones)

## Usage Example

```typescript
// ✅ Good - Import from centralized types
import { LessonSectionProps } from '@/types/component-props';
import { Example, Exercise } from '@/types/lesson-types';

// ❌ Bad - Defining types inline
interface LessonSectionProps {
  // ...
}
```

## Type Categories

### 1. **Data Types** (`data-types.ts`)
JSON structure definitions - what data looks like

### 2. **Domain Types** (`lesson-types.ts`)
Business logic types - lesson structure, exercises

### 3. **Component Props** (`component-props.ts`, `ui-props.ts`)
React component interface definitions

### 4. **Context Types** (in context files)
Context API types - kept with their contexts

### 5. **Library Types** (`lib/firebase/*`)
Firebase-specific types - kept with Firebase code

## Migration Status

### ✅ Completed:
- Learning components
- Lesson system
- Exercise components
- Layout components
- Seasonal theme components
- Halloween components
- UI components
- Search functionality

### 📋 Centralized Files:
- `component-props.ts` - 15 interfaces
- `lesson-types.ts` - 10 types/interfaces
- `ui-props.ts` - 25+ interfaces
- `layout-props.ts` - 3 interfaces
- `seasonal-props.ts` - 10 interfaces
- `halloween-props.ts` - 7 interfaces
- `search-types.ts` - 2 interfaces

## Next Steps

To use these types in your components:
1. Remove local interface definitions
2. Import from appropriate type file
3. Update imports across the component

Example:
```typescript
// Before
interface MyProps {
  title: string;
}

// After
import { MyProps } from '@/types/component-props';
```

