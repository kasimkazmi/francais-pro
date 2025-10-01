export const alphabetLessons = {
  "french-alphabet": {
    id: "french-alphabet",
    uniqueId: `lesson_${Date.now()}_001`,
    title: "French Alphabet & Pronunciation",
    description: "Master the French alphabet and learn how each letter sounds",
    duration: 15,
    difficulty: "easy" as const,
    xpReward: 50,
    sections: [
      {
        title: "Introduction to French Alphabet",
        type: "introduction" as const,
        duration: 3,
        content: `Welcome to your first lesson in French! The French alphabet has the same 26 letters as English, but many are pronounced differently.
In this lesson, you'll learn:
• How to pronounce each letter of the French alphabet
• Special French accents and their importance
• Common letter combinations and sounds
• Practice with real French words

Let's begin your journey to mastering French pronunciation!`,
        examples: [],
      },
      {
        title: "The French Alphabet",
        type: "learning" as const,
        duration: 7,
        content: `The French alphabet consists of 26 letters, just like English. However, the pronunciation is quite different. Let's learn each letter:`,
        examples: [
          {
            french: "A",
            english: "A (ah)",
            pronunciation: "ah",
            audio: "A",
          },
          {
            french: "B",
            english: "B (bay)",
            pronunciation: "bay",
            audio: "B",
          },
          {
            french: "C",
            english: "C (say)",
            pronunciation: "say",
            audio: "C",
          },
          {
            french: "D",
            english: "D (day)",
            pronunciation: "day",
            audio: "D",
          },
          {
            french: "E",
            english: "E (uh)",
            pronunciation: "uh",
            audio: "E",
          },
          {
            french: "F",
            english: "F (eff)",
            pronunciation: "eff",
            audio: "F",
          },
          {
            french: "G",
            english: "G (jhay)",
            pronunciation: "zhay",
            audio: "G",
          },
          {
            french: "H",
            english: "H (ahsh)",
            pronunciation: "ahsh",
            audio: "H",
          },
          {
            french: "I",
            english: "I (ee)",
            pronunciation: "ee",
            audio: "I",
          },
          {
            french: "J",
            english: "J (zhee)",
            pronunciation: "zhee",
            audio: "J",
          },
        ],
      },
      {
        title: "Practice: Letter Recognition",
        type: "practice" as const,
        duration: 4,
        content:
          "Now let's practice what you've learned! Answer these questions to test your knowledge.",
        exercises: [
          {
            type: "multiple-choice",
            question: 'How do you pronounce the French letter "G"?',
            options: ["gay", "zhay", "gee", "jee"],
            correctAnswer: 1,
            explanation:
              'In French, the letter G is pronounced "zhay" (like the "s" in "measure").',
          },
          {
            type: "multiple-choice",
            question: 'Which letter is pronounced "ee" in French?',
            options: ["E", "I", "Y", "A"],
            correctAnswer: 1,
            explanation:
              'The letter I is pronounced "ee" in French, similar to the English word "see".',
          },
          {
            type: "fill-blank",
            question: "Complete: The French letter H is pronounced ___",
            sentence: "The letter H sounds like ___",
            correctAnswer: "ahsh",
            alternatives: ["ash"],
            explanation:
              'H in French is pronounced "ahsh", and it\'s often silent in words.',
          },
        ],
      },
      {
        title: "Review & Summary",
        type: "review" as const,
        duration: 1,
        content: `Excellent work! You've completed the French Alphabet lesson.

**What You've Learned:**
✓ All 26 letters of the French alphabet
✓ Correct pronunciation for each letter
✓ The difference between French and English pronunciation

**Key Takeaways:**
• Many French letters sound different from English
• The letter "G" sounds like "zhay"
• The letter "J" sounds like "zhee"  
• The letter "I" sounds like "ee"

**Next Steps:**
Continue to the next lesson to learn basic French greetings and common phrases!`,
        examples: [],
      },
    ],
  },
};
