// Comprehensive type definitions for all JSON data structures

// Alphabet types
export interface AlphabetLetter {
  letter: string;
  pronunciation: string;
  example: string;
}

export interface SpecialCharacter {
  name: string;
  character: string;
  description: string;
  examples: string[];
}

export interface SpellingWord {
  word: string;
  spelling: string;
}

export interface AlphabetData {
  alphabet: AlphabetLetter[];
  specialCharacters: SpecialCharacter[];
  spellingWords: SpellingWord[];
}

// Numbers types
export interface NumberItem {
  num: number;
  french: string;
  pronunciation: string;
}

export interface CompoundNumber {
  num: number;
  french: string;
  note: string;
}

export interface OrdinalNumber {
  num: string;
  french: string;
}

export interface OrdinalNumbers {
  firstToFifth: OrdinalNumber[];
  sixthToTenth: OrdinalNumber[];
}

export interface NumbersData {
  numbers1to20: NumberItem[];
  tens: NumberItem[];
  compoundNumbers: CompoundNumber[];
  ordinalNumbers: OrdinalNumbers;
}

// Grammar types
export interface GrammarItem {
  french: string;
  english: string;
  example?: string;
  pronunciation: string;
}

export interface GrammarItemRequired {
  french: string;
  english: string;
  example: string;
  pronunciation: string;
}

export interface GrammarItemWithFeminine {
  french: string;
  english: string;
  feminine: string;
  example: string;
}

export interface Conjugation {
  pronoun: string;
  french: string;
  english: string;
  pronunciation: string;
}

export interface Verb {
  infinitive: string;
  english: string;
  conjugations: Conjugation[];
}

export interface GrammarData {
  articles: {
    definite: GrammarItemRequired[];
    indefinite: GrammarItemRequired[];
  };
  pronouns: {
    subject: GrammarItem[];
    object: GrammarItem[];
  };
  verbs: {
    [key: string]: Verb;
  };
  adjectives: {
    common: GrammarItemWithFeminine[];
  };
  prepositions: GrammarItemRequired[];
}

// Expressions types
export interface Expression {
  french: string;
  english: string;
  usage: string;
  pronunciation: string;
  literal?: string;
  level?: string;
}

export interface ExpressionsData {
  idioms: Expression[];
  proverbs: Expression[];
  slang: Expression[];
  business: Expression[];
  technology: Expression[];
  travel: Expression[];
  sports: Expression[];
}

// Conversations types
export interface DialogueLine {
  speaker: string;
  french: string;
  english: string;
  pronunciation: string;
}

export interface ConversationScenario {
  title: string;
  level: string;
  situation: string;
  dialogue: DialogueLine[];
}

export interface ConversationsData {
  scenarios: ConversationScenario[];
  commonPhrases?: unknown[]; // Add this property to match the JSON structure
}

// Common phrase types (for basic conversations, greetings, etc.)
export interface CommonPhrase {
  french: string;
  english: string;
  pronunciation: string;
  context?: string;
}

export interface GreetingsData {
  [key: string]: CommonPhrase[];
}

// Vocabulary types
export interface VocabularyItem {
  french: string;
  english: string;
  pronunciation: string;
  category: string;
  example?: string;
  plural?: string;
  feminine?: string;
}

export interface VocabularyData {
  [category: string]: VocabularyItem[];
}

// Culture types
export interface CultureItem {
  title: string;
  description: string;
  examples?: string[];
  tips?: string[];
  level?: string;
}

export interface CultureData {
  [category: string]: CultureItem[];
}

// Learning content types (from learning-content.ts)
export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'grammar' | 'vocabulary' | 'conversation' | 'culture' | 'pronunciation';
  content: Record<string, unknown>;
  exercises?: Array<{
    type: string;
    question: string;
    options?: string[];
    correct?: number | number[];
    explanation?: string;
  }>;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  prerequisites?: string[];
  estimatedTime: number;
}

export interface LearningContent {
  [moduleId: string]: Module;
}

// Type guards for runtime type checking
export function isExpression(obj: unknown): obj is Expression {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'french' in obj &&
    'english' in obj &&
    'usage' in obj &&
    'pronunciation' in obj
  );
}

export function isVerb(obj: unknown): obj is Verb {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'infinitive' in obj &&
    'english' in obj &&
    'conjugations' in obj &&
    Array.isArray((obj as Verb).conjugations)
  );
}

export function isNumberItem(obj: unknown): obj is NumberItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'num' in obj &&
    'french' in obj &&
    'pronunciation' in obj
  );
}

export function isAlphabetLetter(obj: unknown): obj is AlphabetLetter {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'letter' in obj &&
    'pronunciation' in obj &&
    'example' in obj
  );
}
