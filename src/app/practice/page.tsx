'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { AudioButton } from '@/components/ui/audio-button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Star, 
  Trophy, 
  Clock, 
  Target,
  BookOpen,
  Hash,
  MessageCircle,
  Book,
  Users,
  Globe,
  Lightbulb,
  FileText,
  ArrowRight,
  Shuffle
} from 'lucide-react';
import Link from 'next/link';

// Import data for practice exercises
import alphabetData from '@/data/alphabet.json';
import numbersData from '@/data/numbers.json';
import greetingsData from '@/data/greetings.json';
import vocabularyData from '@/data/vocabulary.json';
import expressionsData from '@/data/expressions.json';

interface PracticeExercise {
  id: string;
  type: 'alphabet' | 'numbers' | 'greetings' | 'vocabulary' | 'expressions';
  question: string;
  correctAnswer: string;
  options?: string[];
  audio?: string;
  explanation?: string;
}

interface PracticeSession {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  exercises: PracticeExercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function PracticePage() {
  const [selectedSession, setSelectedSession] = useState<PracticeSession | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Generate practice sessions
  const practiceSessions: PracticeSession[] = [
    {
      id: 'alphabet-practice',
      title: 'Alphabet Practice',
      description: 'Practice French alphabet pronunciation and recognition',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      difficulty: 'beginner',
      exercises: generateAlphabetExercises()
    },
    {
      id: 'numbers-practice',
      title: 'Numbers Practice',
      description: 'Master French numbers from 1 to 100',
      icon: Hash,
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      difficulty: 'beginner',
      exercises: generateNumbersExercises()
    },
    {
      id: 'greetings-practice',
      title: 'Greetings Practice',
      description: 'Practice common French greetings and responses',
      icon: MessageCircle,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      difficulty: 'beginner',
      exercises: generateGreetingsExercises()
    },
    {
      id: 'vocabulary-practice',
      title: 'Vocabulary Practice',
      description: 'Expand your French vocabulary with interactive exercises',
      icon: Users,
      color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      difficulty: 'intermediate',
      exercises: generateVocabularyExercises()
    },
    {
      id: 'expressions-practice',
      title: 'Expressions Practice',
      description: 'Learn French idioms and common expressions',
      icon: Lightbulb,
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      difficulty: 'advanced',
      exercises: generateExpressionsExercises()
    }
  ];

  const startSession = (session: PracticeSession) => {
    setSelectedSession(session);
    setCurrentExercise(0);
    setScore(0);
    setCompletedExercises([]);
    setSessionStarted(true);
    setSessionCompleted(false);
    setUserAnswer('');
    setSelectedOption(null);
    setShowResult(false);
  };

  const submitAnswer = () => {
    if (!selectedSession) return;

    const exercise = selectedSession.exercises[currentExercise];
    const correct = selectedOption === exercise.correctAnswer || userAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
      setCompletedExercises(prev => [...prev, currentExercise]);
    }
  };

  const nextExercise = () => {
    if (!selectedSession) return;

    if (currentExercise < selectedSession.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const resetSession = () => {
    setSelectedSession(null);
    setCurrentExercise(0);
    setScore(0);
    setCompletedExercises([]);
    setSessionStarted(false);
    setSessionCompleted(false);
    setUserAnswer('');
    setSelectedOption(null);
    setShowResult(false);
  };

  const shuffleExercises = () => {
    if (!selectedSession) return;
    
    const shuffled = [...selectedSession.exercises].sort(() => Math.random() - 0.5);
    setSelectedSession({
      ...selectedSession,
      exercises: shuffled
    });
    setCurrentExercise(0);
    setUserAnswer('');
    setSelectedOption(null);
    setShowResult(false);
  };

  if (sessionCompleted && selectedSession) {
    const percentage = Math.round((score / selectedSession.exercises.length) * 100);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                isExcellent ? 'bg-green-100 text-green-600' : 
                isGood ? 'bg-yellow-100 text-yellow-600' : 
                'bg-red-100 text-red-600'
              }`}>
                {isExcellent ? <Trophy className="h-10 w-10" /> : 
                 isGood ? <CheckCircle className="h-10 w-10" /> : 
                 <XCircle className="h-10 w-10" />}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">
                {isExcellent ? 'Excellent!' : isGood ? 'Good Job!' : 'Keep Practicing!'}
              </h1>
              <p className="text-muted-foreground mb-6">
                You scored {score} out of {selectedSession.exercises.length} ({percentage}%)
              </p>
            </div>

            <Card className="universal-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <selectedSession.icon className="h-6 w-6" />
                  <span>{selectedSession.title} - Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{score}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{percentage}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{selectedSession.exercises.length}</div>
                    <div className="text-sm text-muted-foreground">Total Questions</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <EnhancedButton 
                    onClick={resetSession}
                    className="flex-1"
                    tooltip="Start a new practice session"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </EnhancedButton>
                  <EnhancedButton 
                    onClick={shuffleExercises}
                    variant="outline"
                    className="flex-1"
                    tooltip="Shuffle exercises and retry"
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle & Retry
                  </EnhancedButton>
                  <Link href="/practice" className="flex-1">
                    <EnhancedButton 
                      variant="outline"
                      className="w-full"
                      tooltip="Choose a different practice session"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Other Practices
                    </EnhancedButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (sessionStarted && selectedSession) {
    const exercise = selectedSession.exercises[currentExercise];
    const progress = ((currentExercise + 1) / selectedSession.exercises.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{selectedSession.title}</h1>
                <span className="text-sm text-muted-foreground">
                  {currentExercise + 1} of {selectedSession.exercises.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <Card className="universal-card mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <selectedSession.icon className="h-6 w-6" />
                    <Badge className={selectedSession.color}>
                      {selectedSession.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Score: {score}</span>
                    <SimpleTooltip content="Shuffle remaining exercises">
                      <EnhancedButton 
                        variant="ghost" 
                        size="sm"
                        onClick={shuffleExercises}
                      >
                        <Shuffle className="h-4 w-4" />
                      </EnhancedButton>
                    </SimpleTooltip>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">{exercise.question}</h2>
                  
                  {exercise.audio && (
                    <div className="mb-4">
                      <AudioButton 
                        text={exercise.audio}
                        tooltipContent={`Listen: ${exercise.audio}`}
                      />
                    </div>
                  )}

                  {exercise.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {exercise.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedOption(option)}
                          className={`p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                            selectedOption === option
                              ? 'border-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedOption === option
                                ? 'border-blue-600 bg-blue-600'
                                : 'border-gray-400 dark:border-gray-500'
                            }`}>
                              {selectedOption === option && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-sm text-gray-900 dark:text-gray-100">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                      />
                    </div>
                  )}
                </div>

                {showResult && (
                  <div className={`p-6 rounded-lg mb-6 border-2 bg-white dark:bg-gray-800 ${
                    isCorrect 
                      ? 'border-green-500 text-green-700 dark:text-green-300' 
                      : 'border-red-500 text-red-700 dark:text-red-300'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          isCorrect ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
                        }`}>
                          {isCorrect ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                        </div>
                        <span className="font-bold text-lg">
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Answer:</span>
                        <AudioButton 
                          text={exercise.correctAnswer}
                          tooltipContent={`Listen: ${exercise.correctAnswer}`}
                        />
                      </div>
                    </div>
                    {!isCorrect && (
                      <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            The correct answer is: <strong className="text-lg">{exercise.correctAnswer}</strong>
                          </p>
                          <AudioButton 
                            text={exercise.correctAnswer}
                            tooltipContent={`Listen: ${exercise.correctAnswer}`}
                          />
                        </div>
                      </div>
                    )}
                    {exercise.explanation && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">{exercise.explanation}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  {!showResult ? (
                    <button
                      onClick={submitAnswer}
                      disabled={!selectedOption && !userAnswer.trim()}
                      className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        !selectedOption && !userAnswer.trim()
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextExercise}
                      className="flex-1 px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                    >
                      {currentExercise < selectedSession.exercises.length - 1 ? 'Next Question' : 'Finish'}
                    </button>
                  )}
                  
                  <button
                    onClick={resetSession}
                    className="group px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    title="Exit practice session"
                  >
                    <RotateCcw className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Practice French</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Interactive exercises to test and improve your French skills
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Targeted Practice</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Quick Sessions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Track Progress</span>
              </div>
            </div>
          </div>

          {/* Practice Sessions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {practiceSessions.map((session) => (
              <Card key={session.id} className="universal-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <session.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge className={session.color}>
                      {session.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{session.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{session.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Play className="h-4 w-4 mr-2" />
                      <span>{session.exercises.length} exercises</span>
                    </div>
                    
                    <button
                      onClick={() => startSession(session)}
                      className="w-full px-4 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      <span>Start Practice</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="universal-card">
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Review Favorites</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Practice your saved vocabulary and expressions
                  </p>
                  <EnhancedButton variant="outline" size="sm">
                    Coming Soon
                  </EnhancedButton>
                </CardContent>
              </Card>
              
              <Card className="universal-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Achievements</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your learning progress and milestones
                  </p>
                  <EnhancedButton variant="outline" size="sm">
                    Coming Soon
                  </EnhancedButton>
                </CardContent>
              </Card>
              
              <Card className="universal-card">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Daily Challenge</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete daily exercises to maintain your streak
                  </p>
                  <EnhancedButton variant="outline" size="sm">
                    Coming Soon
                  </EnhancedButton>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exercise generation functions
function generateAlphabetExercises(): PracticeExercise[] {
  const exercises: PracticeExercise[] = [];
  
  // Letter recognition exercises
  alphabetData.alphabet.slice(0, 10).forEach((letter, index) => {
    const otherLetters = alphabetData.alphabet
      .filter(l => l.letter !== letter.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(l => l.letter);
    
    exercises.push({
      id: `alphabet-${index}`,
      type: 'alphabet',
      question: `How do you pronounce the letter "${letter.letter}"?`,
      correctAnswer: letter.pronunciation,
      options: [letter.pronunciation, ...otherLetters.map(l => 
        alphabetData.alphabet.find(letter => letter.letter === l)?.pronunciation || ''
      )].filter(Boolean),
      audio: `The letter ${letter.letter}`,
      explanation: `The letter "${letter.letter}" is pronounced "${letter.pronunciation}" as in "${letter.example}".`
    });
  });
  
  return exercises;
}

function generateNumbersExercises(): PracticeExercise[] {
  const exercises: PracticeExercise[] = [];
  
  // Number recognition exercises
  numbersData.numbers1to20.slice(0, 10).forEach((number, index) => {
    const otherNumbers = numbersData.numbers1to20
      .filter(n => n.num !== number.num)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    exercises.push({
      id: `numbers-${index}`,
      type: 'numbers',
      question: `What is the French word for "${number.num}"?`,
      correctAnswer: number.french,
      options: [number.french, ...otherNumbers.map(n => n.french)],
      audio: `The number ${number.num}`,
      explanation: `"${number.num}" in French is "${number.french}" (${number.pronunciation}).`
    });
  });
  
  return exercises;
}

function generateGreetingsExercises(): PracticeExercise[] {
  const exercises: PracticeExercise[] = [];
  
  // Combine all greetings from different sections
  const allGreetings = [
    ...greetingsData.basicGreetings,
    ...greetingsData.politeExpressions,
    ...greetingsData.introductions,
    ...greetingsData.responses
  ];
  
  allGreetings.slice(0, 8).forEach((greeting, index) => {
    const otherGreetings = allGreetings
      .filter(g => g.english !== greeting.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    exercises.push({
      id: `greetings-${index}`,
      type: 'greetings',
      question: `How do you say "${greeting.english}" in French?`,
      correctAnswer: greeting.french,
      options: [greeting.french, ...otherGreetings.map(g => g.french)],
      audio: `How do you say ${greeting.english} in French?`,
      explanation: `"${greeting.english}" in French is "${greeting.french}" (${greeting.pronunciation}).`
    });
  });
  
  return exercises;
}

function generateVocabularyExercises(): PracticeExercise[] {
  const exercises: PracticeExercise[] = [];
  
  // Get vocabulary from different categories
  const allVocabulary = [
    ...vocabularyData.family,
    ...vocabularyData.food,
    ...vocabularyData.colors,
    ...vocabularyData.professions,
    ...vocabularyData.emotions
  ];
  
  allVocabulary.slice(0, 10).forEach((word, index) => {
    const otherWords = allVocabulary
      .filter(w => w.english !== word.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    exercises.push({
      id: `vocabulary-${index}`,
      type: 'vocabulary',
      question: `What is the French word for "${word.english}"?`,
      correctAnswer: word.french,
      options: [word.french, ...otherWords.map(w => w.french)],
      audio: `What is the French word for ${word.english}?`,
      explanation: `"${word.english}" in French is "${word.french}" (${word.pronunciation}). Example: "${word.example}"`
    });
  });
  
  return exercises;
}

function generateExpressionsExercises(): PracticeExercise[] {
  const exercises: PracticeExercise[] = [];
  
  // Get expressions from different categories
  const allExpressions = [
    ...expressionsData.idioms,
    ...expressionsData.proverbs,
    ...expressionsData.slang,
    ...expressionsData.business,
    ...expressionsData.technology,
    ...expressionsData.travel,
    ...expressionsData.sports
  ];
  
  allExpressions.slice(0, 8).forEach((expression, index) => {
    const otherExpressions = allExpressions
      .filter(e => e.english !== expression.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    exercises.push({
      id: `expressions-${index}`,
      type: 'expressions',
      question: `What does "${expression.french}" mean in English?`,
      correctAnswer: expression.english,
      options: [expression.english, ...otherExpressions.map(e => e.english)],
      audio: `What does ${expression.french} mean in English?`,
      explanation: `"${expression.french}" means "${expression.english}" in English.`
    });
  });
  
  return exercises;
}
