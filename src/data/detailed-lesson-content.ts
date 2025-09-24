import { InteractiveLesson } from '@/types/learning-types';

// Detailed lesson content with comprehensive step-by-step materials
export const detailedLessonContent: InteractiveLesson[] = [
  {
    id: 'french-alphabet-interactive',
    title: 'French Alphabet & Pronunciation',
    description: 'Master the French alphabet with interactive pronunciation practice and cultural context',
    type: 'pronunciation',
    difficulty: 'easy',
    estimatedTime: 25,
    xpReward: 100,
    prerequisites: [],
    skills: ['pronunciation', 'listening'],
    completed: false,
    unlocked: true,
    steps: [
      {
        id: 'intro-alphabet-overview',
        type: 'introduction',
        title: 'Welcome to French Alphabet',
        content: `
# Welcome to the French Alphabet! 🇫🇷

## What You'll Learn
- All 26 letters of the French alphabet
- Proper pronunciation for each letter
- Common pronunciation patterns
- Cultural context of French sounds

## Why This Matters
The French alphabet is your foundation for reading, writing, and speaking French correctly. Unlike English, French has consistent pronunciation rules that will help you sound more natural.

## Learning Objectives
By the end of this lesson, you will be able to:
- Pronounce all 26 French letters correctly
- Recognize French letter sounds in words
- Apply pronunciation rules to new vocabulary
- Build confidence in French pronunciation
        `,
        duration: 60,
        interactive: false,
        media: {
          type: 'image',
          url: '/images/french-alphabet-intro.jpg',
          alt: 'French alphabet introduction'
        }
      },
      {
        id: 'learn-alphabet-letters',
        type: 'learning',
        title: 'The French Alphabet A-Z',
        content: `
# The Complete French Alphabet

## Letters A-M
**A** (ah) - Like "ah" in "father"  
**B** (bay) - Like "bay" in English  
**C** (say) - Like "say" but softer  
**D** (day) - Like "day" in English  
**E** (uh) - Like "uh" in "the"  
**F** (eff) - Like "eff" in English  
**G** (zhay) - Like "zhay" (soft g sound)  
**H** (ahsh) - Like "ahsh" (often silent)  
**I** (ee) - Like "ee" in "see"  
**J** (zhee) - Like "zhee" (soft j sound)  
**K** (kah) - Like "kah" in English  
**L** (ell) - Like "ell" in English  
**M** (em) - Like "em" in English  

## Letters N-Z
**N** (en) - Like "en" in English  
**O** (oh) - Like "oh" in English  
**P** (pay) - Like "pay" in English  
**Q** (koo) - Like "koo" in English  
**R** (air) - Guttural "r" from throat  
**S** (ess) - Like "ess" in English  
**T** (tay) - Like "tay" in English  
**U** (oo) - Like "oo" in "moon"  
**V** (vay) - Like "vay" in English  
**W** (doo-bluh-vay) - "Double v"  
**X** (eeks) - Like "eeks" in English  
**Y** (ee-grek) - "Greek i"  
**Z** (zed) - Like "zed" in British English  

## Key Pronunciation Tips
- **Silent Letters**: Many letters are silent at word endings
- **Accent Marks**: Change pronunciation and meaning
- **Nasal Sounds**: Unique to French (an, en, in, on, un)
- **R Sound**: Guttural 'r' from the back of the throat
        `,
        duration: 300,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/french-alphabet-complete.mp3'
        }
      },
      {
        id: 'practice-alphabet-pronunciation',
        type: 'practice',
        title: 'Practice Pronunciation',
        content: `
# Practice Time! 🎯

## Interactive Pronunciation Practice

### Exercise 1: Letter Recognition
Listen to each letter and identify it:
- Audio: [Letter sound] → Choose: A, B, C, D
- Audio: [Letter sound] → Choose: E, F, G, H
- Audio: [Letter sound] → Choose: I, J, K, L

### Exercise 2: Word Building
Practice letters in context:
- **B** + **O** + **N** = **BON** (good)
- **M** + **E** + **R** + **C** + **I** = **MERCI** (thank you)
- **F** + **R** + **A** + **N** + **Ç** + **A** + **I** + **S** = **FRANÇAIS** (French)

### Exercise 3: Pronunciation Challenge
Try these common French words:
- **Bonjour** (bohn-ZHOOR) - Hello
- **Merci** (mer-SEE) - Thank you
- **Français** (frahn-SAY) - French
- **École** (ay-KOL) - School
- **Répéter** (ray-pay-TAY) - To repeat

## Tips for Success
- Listen carefully to each sound
- Practice slowly at first
- Record yourself and compare
- Don't worry about perfection - focus on improvement
        `,
        duration: 240,
        interactive: true
      },
      {
        id: 'assessment-alphabet-knowledge',
        type: 'assessment',
        title: 'Alphabet Knowledge Check',
        content: `
# Knowledge Check 📝

## Test Your Understanding

### Quick Quiz
Answer these questions to test your alphabet knowledge:

1. How many letters are in the French alphabet?
2. Which letter makes a guttural "r" sound?
3. What is the French word for "double v"?
4. Which letters are often silent at word endings?

### Pronunciation Test
Listen and identify the correct letter:
- Audio clip 1: [Sound] → A, B, C, D
- Audio clip 2: [Sound] → E, F, G, H
- Audio clip 3: [Sound] → I, J, K, L

### Word Recognition
Identify the French word from the audio:
- Audio: [Word sound] → Bonjour, Merci, Français, École

## Success Criteria
- Score 70% or higher to pass
- You can retry up to 3 times
- Take your time and listen carefully
        `,
        duration: 180,
        interactive: true
      }
    ],
    activities: [
      {
        id: 'alphabet-audio-match-1',
        type: 'audio-match',
        question: 'Listen to the audio and select the correct letter',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
        explanation: 'The letter A in French sounds like "ah" as in "father"',
        audioUrl: '/audio/letter-a.mp3',
        difficulty: 'easy',
        xpReward: 20
      },
      {
        id: 'alphabet-pronunciation-practice',
        type: 'speaking',
        question: 'Repeat the letter A after the audio',
        correctAnswer: 'A',
        explanation: 'Excellent! You pronounced the French A correctly. Remember, it sounds like "ah" in "father"',
        audioUrl: '/audio/letter-a.mp3',
        difficulty: 'easy',
        xpReward: 25
      },
      {
        id: 'alphabet-word-building',
        type: 'word-order',
        question: 'Arrange the letters to spell "BON" (good)',
        correctAnswer: ['B', 'O', 'N'],
        explanation: 'Perfect! B-O-N spells "BON" which means "good" in French',
        difficulty: 'easy',
        xpReward: 30
      }
    ],
    assessment: {
      id: 'alphabet-comprehensive-assessment',
      questions: [
        {
          id: 'alphabet-quiz-1',
          type: 'multiple-choice',
          question: 'How many letters are in the French alphabet?',
          options: ['25', '26', '27', '28'],
          correctAnswer: '26',
          explanation: 'French alphabet has 26 letters, same as English, but with different pronunciations',
          difficulty: 'easy',
          xpReward: 15
        },
        {
          id: 'alphabet-quiz-2',
          type: 'audio-match',
          question: 'Listen and identify the letter',
          options: ['E', 'F', 'G', 'H'],
          correctAnswer: 'E',
          explanation: 'The letter E sounds like "uh" in French, similar to "the" in English',
          audioUrl: '/audio/letter-e.mp3',
          difficulty: 'easy',
          xpReward: 20
        },
        {
          id: 'alphabet-quiz-3',
          type: 'fill-blank',
          question: 'Complete: The French letter R makes a ___ sound',
          correctAnswer: 'guttural',
          explanation: 'The French R is pronounced from the back of the throat, making a guttural sound',
          difficulty: 'medium',
          xpReward: 25
        }
      ],
      passingScore: 70,
      timeLimit: 180,
      retryAllowed: true,
      maxRetries: 3
    },
    reviewSchedule: []
  },
  {
    id: 'basic-greetings-interactive',
    title: 'Essential French Greetings',
    description: 'Master French greetings with cultural context and practical conversations',
    type: 'conversation',
    difficulty: 'easy',
    estimatedTime: 30,
    xpReward: 150,
    prerequisites: ['french-alphabet-interactive'],
    skills: ['vocabulary', 'pronunciation'],
    completed: false,
    unlocked: false,
    steps: [
      {
        id: 'intro-greetings-culture',
        type: 'introduction',
        title: 'French Greeting Culture',
        content: `
# French Greeting Culture 🇫🇷

## The Importance of Greetings
In French culture, greetings are not just polite - they're essential for social interaction. French people place great importance on proper greetings and consider them a sign of respect and good manners.

## What You'll Learn
- Formal and informal greetings
- Time-specific greetings
- Polite expressions
- Cultural context and etiquette
- Real conversation examples

## Cultural Insights
- **La bise**: French people often greet with cheek kisses
- **Always greet**: When entering shops, restaurants, or meeting people
- **Formality matters**: Choose the right greeting for the situation
- **Time awareness**: Use appropriate greetings for different times of day

## Learning Objectives
By the end of this lesson, you will be able to:
- Use appropriate greetings for different situations
- Understand French greeting etiquette
- Engage in basic French conversations
- Show respect through proper greetings
        `,
        duration: 90,
        interactive: false
      },
      {
        id: 'learn-greetings-vocabulary',
        type: 'learning',
        title: 'Greeting Vocabulary',
        content: `
# Essential French Greetings

## Formal Greetings
**Bonjour** (bohn-ZHOOR) - Hello/Good morning/Good afternoon
- Used from morning until evening (6 AM - 6 PM)
- Appropriate for all formal situations
- Always use when entering shops or restaurants

**Bonsoir** (bohn-SWAHR) - Good evening
- Used from evening until night (6 PM - midnight)
- More formal than "bonjour" in the evening
- Perfect for dinner parties or evening events

**Bonne nuit** (bohn NWEE) - Good night
- Used when going to bed or leaving late at night
- More intimate than "bonsoir"
- Often used with family and close friends

**Au revoir** (oh ruh-VWAHR) - Goodbye
- Standard way to say goodbye
- Appropriate for all situations
- Can be used formally or informally

## Informal Greetings
**Salut** (sah-LOO) - Hi/Bye (casual)
- Very casual greeting
- Only use with friends and family
- Can mean both "hi" and "bye"

**Coucou** (koo-KOO) - Hey (very casual)
- Very informal and playful
- Used with close friends and family
- Often used in text messages

**À bientôt** (ah bee-ahn-TOH) - See you soon
- Casual way to say goodbye
- Implies you'll see the person again soon
- Friendly and warm

**À plus tard** (ah ploo TAHR) - See you later
- Similar to "à bientôt"
- More casual than "au revoir"
- Used with friends and acquaintances

## Polite Expressions
**S'il vous plaît** (seel voo PLAY) - Please
- Essential for politeness
- Use in all formal situations
- Shows respect and good manners

**Merci** (mer-SEE) - Thank you
- Basic expression of gratitude
- Use frequently in French culture
- Essential for polite interaction

**Merci beaucoup** (mer-SEE boh-KOO) - Thank you very much
- Stronger expression of gratitude
- Use when someone goes out of their way
- Shows appreciation

**De rien** (duh ree-AHN) - You're welcome
- Standard response to "merci"
- Polite and friendly
- Shows good manners

**Excusez-moi** (eks-koo-zay MWAH) - Excuse me
- Use to get someone's attention
- Polite way to interrupt
- Essential for public interactions

**Pardon** (par-DOHN) - Sorry/Pardon
- Use when you make a mistake
- Polite way to apologize
- Less formal than "excusez-moi"
        `,
        duration: 360,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/greetings-complete.mp3'
        }
      },
      {
        id: 'practice-greetings-conversations',
        type: 'practice',
        title: 'Practice Conversations',
        content: `
# Practice Conversations 🗣️

## Scenario 1: Meeting Someone New
**A:** Bonjour! Comment allez-vous?  
**B:** Bonjour! Ça va bien, merci. Et vous?  
**A:** Très bien, merci!  

## Scenario 2: Casual Greeting with Friends
**A:** Salut! Ça va?  
**B:** Salut! Oui, ça va bien. Et toi?  
**A:** Ça va, merci!  

## Scenario 3: Formal Business Meeting
**A:** Bonjour, monsieur. Comment allez-vous?  
**B:** Bonjour, madame. Très bien, merci. Et vous?  
**A:** Parfait, merci beaucoup.  

## Scenario 4: Evening Social Event
**A:** Bonsoir! Comment allez-vous ce soir?  
**B:** Bonsoir! Très bien, merci. Et vous?  
**A:** Excellente soirée, merci!  

## Interactive Practice
### Role-Play Exercises
1. **Shop Interaction**: Practice greeting a shopkeeper
2. **Restaurant**: Greet the waiter and order politely
3. **Office Meeting**: Formal business greeting
4. **Friend Encounter**: Casual greeting with a friend

### Pronunciation Practice
- Record yourself saying each greeting
- Listen to native speaker examples
- Practice with different tones and emotions
- Focus on natural rhythm and flow

## Cultural Tips
- **Eye Contact**: Maintain appropriate eye contact
- **Smile**: A warm smile goes a long way
- **Handshake**: Firm but not too strong
- **Personal Space**: Respect French personal space norms
        `,
        duration: 300,
        interactive: true
      }
    ],
    activities: [
      {
        id: 'greeting-flashcard-1',
        type: 'flashcard',
        question: 'What does "Bonjour" mean?',
        correctAnswer: 'Hello',
        explanation: 'Bonjour is the standard French greeting for "Hello" and is used from morning until evening',
        difficulty: 'easy',
        xpReward: 20
      },
      {
        id: 'greeting-conversation-1',
        type: 'multiple-choice',
        question: 'How would you respond to "Bonjour"?',
        options: ['Bonjour', 'Merci', 'Au revoir', 'Oui'],
        correctAnswer: 'Bonjour',
        explanation: 'The appropriate response to "Bonjour" is also "Bonjour" - it\'s a mutual greeting',
        difficulty: 'easy',
        xpReward: 25
      },
      {
        id: 'greeting-pronunciation-1',
        type: 'speaking',
        question: 'Say "Bonjour" after the audio',
        correctAnswer: 'Bonjour',
        explanation: 'Excellent pronunciation! Remember to stress the second syllable: bon-JOUR',
        audioUrl: '/audio/bonjour.mp3',
        difficulty: 'medium',
        xpReward: 30
      }
    ],
    assessment: {
      id: 'greetings-comprehensive-assessment',
      questions: [
        {
          id: 'greeting-quiz-1',
          type: 'fill-blank',
          question: 'Complete: "___" means hello in French',
          correctAnswer: 'Bonjour',
          explanation: 'Bonjour is the French word for hello and is used from morning until evening',
          difficulty: 'easy',
          xpReward: 20
        },
        {
          id: 'greeting-quiz-2',
          type: 'multiple-choice',
          question: 'What time of day would you say "Bonsoir"?',
          options: ['Morning', 'Afternoon', 'Evening', 'Night'],
          correctAnswer: 'Evening',
          explanation: 'Bonsoir is used in the evening, typically from 6 PM onwards',
          difficulty: 'easy',
          xpReward: 20
        },
        {
          id: 'greeting-quiz-3',
          type: 'multiple-choice',
          question: 'Which greeting is most appropriate for a formal business meeting?',
          options: ['Salut', 'Coucou', 'Bonjour', 'À bientôt'],
          correctAnswer: 'Bonjour',
          explanation: 'Bonjour is the most appropriate greeting for formal business situations',
          difficulty: 'medium',
          xpReward: 25
        }
      ],
      passingScore: 75,
      timeLimit: 200,
      retryAllowed: true,
      maxRetries: 3
    },
    reviewSchedule: []
  }
];

// Additional lesson content for numbers, colors, family, etc.
export const additionalLessonContent: InteractiveLesson[] = [
  {
    id: 'numbers-1-20-interactive',
    title: 'French Numbers 1-20',
    description: 'Master French numbers with interactive counting exercises and practical applications',
    type: 'vocabulary',
    difficulty: 'medium',
    estimatedTime: 35,
    xpReward: 175,
    prerequisites: ['basic-greetings-interactive'],
    skills: ['vocabulary', 'pronunciation'],
    completed: false,
    unlocked: false,
    steps: [
      {
        id: 'intro-numbers-importance',
        type: 'introduction',
        title: 'Why Numbers Matter',
        content: `
# French Numbers: Your Daily Essentials 🔢

## Why Learn Numbers?
Numbers are everywhere in daily life:
- **Age**: Telling your age
- **Time**: Reading clocks and schedules
- **Shopping**: Prices and quantities
- **Phone numbers**: Contact information
- **Addresses**: Building and apartment numbers

## What You'll Master
- Numbers 1-20 with perfect pronunciation
- Number patterns and rules
- Practical applications in real situations
- Cultural context of French numbers

## Learning Objectives
By the end of this lesson, you will be able to:
- Count from 1 to 20 in French
- Use numbers in practical situations
- Understand French number patterns
- Apply numbers to daily conversations
        `,
        duration: 60,
        interactive: false
      },
      {
        id: 'learn-numbers-1-10',
        type: 'learning',
        title: 'Numbers 1-10',
        content: `
# Numbers 1-10: The Foundation

## Basic Numbers
1. **un** (uhn) - one
2. **deux** (duh) - two
3. **trois** (trwah) - three
4. **quatre** (KAH-truh) - four
5. **cinq** (sank) - five
6. **six** (sees) - six
7. **sept** (set) - seven
8. **huit** (weet) - eight
9. **neuf** (nuhf) - nine
10. **dix** (dees) - ten

## Pronunciation Tips
- **"un"** sounds like "uhn" (not "one")
- **"deux"** has a silent 'x' at the end
- **"trois"** has a silent 's' at the end
- **"quatre"** - the 'r' is pronounced
- **"cinq"** - the 'q' is silent
- **"six"** and **"dix"** - the 'x' is silent
- **"huit"** - the 'h' is silent

## Memory Tricks
- **Visual**: Imagine the numbers in your head
- **Rhythm**: Count with a rhythm or song
- **Association**: Link numbers to familiar objects
- **Repetition**: Practice daily for better retention
        `,
        duration: 240,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/numbers-1-10.mp3'
        }
      },
      {
        id: 'learn-numbers-11-20',
        type: 'learning',
        title: 'Numbers 11-20',
        content: `
# Numbers 11-20: Building on the Foundation

## Numbers 11-20
11. **onze** (ohnz) - eleven
12. **douze** (dooz) - twelve
13. **treize** (trehz) - thirteen
14. **quatorze** (kah-TORZ) - fourteen
15. **quinze** (kans) - fifteen
16. **seize** (sehz) - sixteen
17. **dix-sept** (dees-SET) - seventeen
18. **dix-huit** (dees-WEET) - eighteen
19. **dix-neuf** (dees-NUHF) - nineteen
20. **vingt** (van) - twenty

## Number Patterns
- Numbers 17-19 follow the pattern: **dix + number**
- **dix-sept** = 10 + 7
- **dix-huit** = 10 + 8
- **dix-neuf** = 10 + 9

## Special Cases
- **"vingt"** - the 'g' and 't' are silent
- **"onze"** - unique word, not following pattern
- **"douze"** - unique word, not following pattern
- **"treize"** - unique word, not following pattern

## Practical Usage
- **Age**: J'ai vingt ans (I am 20 years old)
- **Counting**: Un, deux, trois... (One, two, three...)
- **Phone numbers**: Mon numéro est... (My number is...)
- **Time**: Il est deux heures (It's 2 o'clock)
        `,
        duration: 300,
        interactive: true,
        media: {
          type: 'audio',
          url: '/audio/numbers-11-20.mp3'
        }
      }
    ],
    activities: [
      {
        id: 'number-flashcard-1',
        type: 'flashcard',
        question: 'What is "cinq" in English?',
        correctAnswer: '5',
        explanation: 'Cinq means five in French. Remember, the "q" is silent!',
        difficulty: 'easy',
        xpReward: 20
      },
      {
        id: 'number-word-order-1',
        type: 'word-order',
        question: 'Arrange the numbers in order: cinq, un, trois, deux',
        correctAnswer: ['un', 'deux', 'trois', 'cinq'],
        explanation: 'The correct order is: un (1), deux (2), trois (3), cinq (5)',
        difficulty: 'medium',
        xpReward: 30
      },
      {
        id: 'number-listening-1',
        type: 'listening',
        question: 'Listen and select the number you hear',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
        explanation: 'You heard "douze" which means 12 in French',
        audioUrl: '/audio/douze.mp3',
        difficulty: 'medium',
        xpReward: 25
      }
    ],
    assessment: {
      id: 'numbers-comprehensive-assessment',
      questions: [
        {
          id: 'number-quiz-1',
          type: 'fill-blank',
          question: 'Complete: "dix" means ___ in English',
          correctAnswer: '10',
          explanation: 'Dix is the French word for ten',
          difficulty: 'easy',
          xpReward: 20
        },
        {
          id: 'number-quiz-2',
          type: 'multiple-choice',
          question: 'What is the French word for 15?',
          options: ['quinze', 'seize', 'dix-sept', 'dix-huit'],
          correctAnswer: 'quinze',
          explanation: 'Quinze is the French word for 15',
          difficulty: 'medium',
          xpReward: 25
        },
        {
          id: 'number-quiz-3',
          type: 'audio-match',
          question: 'Listen and identify the number',
          options: ['17', '18', '19', '20'],
          correctAnswer: '20',
          explanation: 'You heard "vingt" which means 20 in French',
          audioUrl: '/audio/vingt.mp3',
          difficulty: 'medium',
          xpReward: 25
        }
      ],
      passingScore: 80,
      timeLimit: 240,
      retryAllowed: true,
      maxRetries: 3
    },
    reviewSchedule: []
  }
];

// Export combined content
export const allDetailedLessons = [
  ...detailedLessonContent,
  ...additionalLessonContent
];
