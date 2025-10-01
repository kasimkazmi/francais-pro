# Lesson Section Color Scheme

## Overview
Each lesson section type has a unique color scheme for better visual organization and user experience.

## Color Palette

### 📚 Introduction (Blue)
- **Border**: `border-l-blue-500`
- **Background**: `bg-blue-50/50 dark:bg-blue-950/20`
- **Text**: `text-blue-600 dark:text-blue-400`
- **Example Cards**: 
  - Border: `border-blue-200 dark:border-blue-900`
  - Hover: `hover:border-blue-400 dark:hover:border-blue-700`
  - Background: `hover:bg-blue-50/50 dark:hover:bg-blue-950/30`

**Usage**: Welcome, overview, learning objectives

---

### 🎓 Learning Content (Purple)
- **Border**: `border-l-purple-500`
- **Background**: `bg-purple-50/50 dark:bg-purple-950/20`
- **Text**: `text-purple-600 dark:text-purple-400`
- **Example Cards**:
  - Border: `border-purple-200 dark:border-purple-900`
  - Hover: `hover:border-purple-400 dark:hover:border-purple-700`
  - Background: `hover:bg-purple-50/50 dark:hover:bg-purple-950/30`

**Usage**: Main content, vocabulary, grammar rules, examples

---

### 💪 Practice Exercises (Green)
- **Border**: `border-l-green-500`
- **Background**: `bg-green-50/50 dark:bg-green-950/20`
- **Text**: `text-green-600 dark:text-green-400`
- **Example Cards**:
  - Border: `border-green-200 dark:border-green-900`
  - Hover: `hover:border-green-400 dark:hover:border-green-700`
  - Background: `hover:bg-green-50/50 dark:hover:bg-green-950/30`

**Usage**: Interactive exercises, quizzes, practice activities

---

### 📝 Review & Summary (Orange)
- **Border**: `border-l-orange-500`
- **Background**: `bg-orange-50/50 dark:bg-orange-950/20`
- **Text**: `text-orange-600 dark:text-orange-400`
- **Example Cards**:
  - Border: `border-orange-200 dark:border-orange-900`
  - Hover: `hover:border-orange-400 dark:hover:border-orange-700`
  - Background: `hover:bg-orange-50/50 dark:hover:bg-orange-950/30`

**Usage**: Summary, key takeaways, completion message

---

## Design Principles

### 1. **Consistency**
- All sections follow the same pattern: left border + subtle background tint
- Example cards inherit the section color with lighter tones

### 2. **Accessibility**
- High contrast ratios for readability
- Dark mode variations included
- Color is not the only differentiator (emojis + labels)

### 3. **Visual Hierarchy**
```
Section Card (Main)
  ├─ 4px left border (vibrant)
  ├─ Subtle background tint (50% opacity light / 20% opacity dark)
  └─ Example Cards (Nested)
      ├─ 2px border (lighter shade)
      ├─ Hover effects (border darkens, background appears)
      └─ Scale animation (1.02x on hover)
```

### 4. **Progressive Disclosure**
- Introduction: Blue (calm, welcoming)
- Learning: Purple (focus, wisdom)
- Practice: Green (action, growth)
- Review: Orange (achievement, completion)

## Benefits

✅ **Visual Navigation**: Users instantly know which section they're in
✅ **Mental Model**: Colors create a learning journey metaphor
✅ **Reduced Cognitive Load**: Consistent patterns reduce mental effort
✅ **Engagement**: Colorful UI is more engaging than monochrome
✅ **Feedback**: Section type is immediately apparent

## Usage in Code

```tsx
// Section Card
<Card className={`border-l-4 ${
  type === 'introduction' 
    ? 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20'
    : type === 'learning'
    ? 'border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20'
    : type === 'practice'
    ? 'border-l-green-500 bg-green-50/50 dark:bg-green-950/20'
    : 'border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20'
}`}>

// Section Description
<CardDescription className={`${
  type === 'introduction'
    ? 'text-blue-600 dark:text-blue-400'
    : type === 'learning'
    ? 'text-purple-600 dark:text-purple-400'
    : type === 'practice'
    ? 'text-green-600 dark:text-green-400'
    : 'text-orange-600 dark:text-orange-400'
}`}>

// Example Cards
<div className={`border-2 ${
  type === 'introduction'
    ? 'border-blue-200 dark:border-blue-900 hover:border-blue-400'
    : // ... similar pattern
}`}>
```

## Future Enhancements
- [ ] Add section-specific animations
- [ ] Progress indicators with matching colors
- [ ] Confetti effects using section colors
- [ ] Achievement badges with section colors

