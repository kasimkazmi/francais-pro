'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { AudioButton } from '@/components/ui/audio-button';
import { AuthModal } from '@/components/ui/auth-modal';
import { TipSection } from '@/components/ui/tip-section';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Target,
  BookOpen,
  Hash,
  Book,
  FileText,
  ArrowRight,
  Volume2,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export function PracticeContent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'general';
  const { isAuthenticated } = useAuth();

  // Expressions-specific practice questions
  const expressionsQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'Expressions',
      question: 'What does "C\'est la vie" mean?',
      options: ['That\'s life', 'It\'s beautiful', 'Good morning', 'Thank you'],
      correct: 'That\'s life',
      explanation: 'C\'est la vie is a French expression meaning "That\'s life" or "Such is life".'
    },
    {
      id: 2,
      type: 'multiple-choice',
      category: 'Expressions',
      question: 'What does "Bon appétit" mean?',
      options: ['Good luck', 'Enjoy your meal', 'Good morning', 'See you later'],
      correct: 'Enjoy your meal',
      explanation: 'Bon appétit means "Enjoy your meal" and is said before eating.'
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: 'Expressions',
      question: 'What does "À bientôt" mean?',
      options: ['Goodbye', 'See you soon', 'Good night', 'Welcome'],
      correct: 'See you soon',
      explanation: 'À bientôt means "See you soon" and is used when saying goodbye.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      category: 'Expressions',
      question: 'What does "Ça va?" mean?',
      options: ['How are you?', 'What time is it?', 'Where are you?', 'What\'s your name?'],
      correct: 'How are you?',
      explanation: 'Ça va? is a casual way to ask "How are you?" in French.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      category: 'Expressions',
      question: 'What does "Excusez-moi" mean?',
      options: ['Thank you', 'Excuse me', 'You\'re welcome', 'Good luck'],
      correct: 'Excuse me',
      explanation: 'Excusez-moi means "Excuse me" and is used to get someone\'s attention or apologize.'
    }
  ];

  // Number-specific practice questions
  const numbersQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'Numbers',
      question: 'How do you say "five" in French?',
      options: ['Quatre', 'Cinq', 'Six', 'Sept'],
      correct: 'Cinq',
      explanation: 'Cinq is the French word for "five".'
    },
    {
      id: 2,
      type: 'multiple-choice',
      category: 'Numbers',
      question: 'What is the French word for "twenty"?',
      options: ['Dix', 'Vingt', 'Trente', 'Quarante'],
      correct: 'Vingt',
      explanation: 'Vingt is the French word for "twenty".'
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: 'Numbers',
      question: 'How do you say "twenty-one" in French?',
      options: ['Vingt-un', 'Vingt-et-un', 'Vingt-deux', 'Vingt-trois'],
      correct: 'Vingt-et-un',
      explanation: 'Twenty-one in French is "vingt-et-un" with "et" (and) between 20 and 1.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      category: 'Numbers',
      question: 'What is the French word for "first"?',
      options: ['Premier', 'Deuxième', 'Troisième', 'Quatrième'],
      correct: 'Premier',
      explanation: 'Premier/première is the French word for "first".'
    },
    {
      id: 5,
      type: 'multiple-choice',
      category: 'Numbers',
      question: 'How do you say "seventy" in French?',
      options: ['Soixante', 'Soixante-dix', 'Quatre-vingts', 'Quatre-vingt-dix'],
      correct: 'Soixante-dix',
      explanation: 'Seventy in French is "soixante-dix" (60 + 10).'
    }
  ];

  // General practice questions
  const generalQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'Alphabet',
      question: 'What is the French word for "hello"?',
      options: ['Bonjour', 'Au revoir', 'Merci', 'Excusez-moi'],
      correct: 'Bonjour',
      explanation: 'Bonjour is the standard French greeting meaning "hello" or "good morning".'
    },
    {
      id: 2,
      type: 'multiple-choice',
      category: 'Numbers',
      question: 'How do you say "five" in French?',
      options: ['Quatre', 'Cinq', 'Six', 'Sept'],
      correct: 'Cinq',
      explanation: 'Cinq is the French word for "five".'
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: 'Grammar',
      question: 'What is the correct article for "livre" (book)?',
      options: ['la', 'le', 'les', 'l&apos;'],
      correct: 'le',
      explanation: 'Livre is masculine, so it takes the masculine article "le".'
    },
    {
      id: 4,
      type: 'multiple-choice',
      category: 'Vocabulary',
      question: 'What does "merci" mean?',
      options: ['Please', 'Thank you', 'Excuse me', 'Goodbye'],
      correct: 'Thank you',
      explanation: 'Merci means "thank you" in French.'
    },
    {
      id: 5,
      type: 'multiple-choice',
      category: 'Pronunciation',
      question: 'How do you pronounce "bonjour"?',
      options: ['bon-JOOR', 'bon-ZHOOR', 'bon-SHOOR', 'bon-CHOOR'],
      correct: 'bon-ZHOOR',
      explanation: 'The correct pronunciation is "bon-ZHOOR" with a soft "j" sound.'
    }
  ];

  // Select questions based on category
  const practiceQuestions = 
    category === 'numbers' ? numbersQuestions :
    category === 'expressions' ? expressionsQuestions :
    generalQuestions;
  const currentQ = practiceQuestions[currentQuestion];

  // Show category selection if no category is specified
  const showCategorySelection = !category || category === 'general';

  const handleAnswer = useCallback((answer: string) => {
    if (!currentQ) return;
    
    setSelectedAnswer(answer);
    // Don't show result immediately - wait for submit
  }, [currentQ]);

  const submitAnswer = useCallback(() => {
    if (!currentQ || !selectedAnswer) return;
    
    setShowResult(true);
    setIsActive(false);
    
    if (selectedAnswer === currentQ.correct) {
      setScore(score + 1);
    }
    
    setCompletedQuestions([...completedQuestions, currentQuestion]);
  }, [currentQ, selectedAnswer, score, completedQuestions, currentQuestion]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && !showCategorySelection) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showCategorySelection) {
      setIsActive(false);
      if (selectedAnswer) {
        submitAnswer(); // Auto-submit when time runs out
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showCategorySelection, submitAnswer, selectedAnswer]);

  const startTimer = () => {
    setIsActive(true);
    setTimeLeft(30);
  };

  const nextQuestion = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetPractice = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setIsActive(false);
    setCompletedQuestions([]);
    setQuizCompleted(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    // Check if user is authenticated before starting quiz
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    setQuizStarted(true);
    setIsActive(true);
    setTimeLeft(30);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Alphabet': return <BookOpen className="h-4 w-4" />;
      case 'Numbers': return <Hash className="h-4 w-4" />;
      case 'Grammar': return <FileText className="h-4 w-4" />;
      case 'Vocabulary': return <Book className="h-4 w-4" />;
      case 'Expressions': return <FileText className="h-4 w-4" />;
      case 'Pronunciation': return <Volume2 className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Alphabet': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Numbers': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Grammar': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Vocabulary': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Expressions': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      case 'Pronunciation': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'numbers': return 'Numbers Practice';
      case 'expressions': return 'Expressions Practice';
      case 'alphabet': return 'Alphabet Practice';
      case 'grammar': return 'Grammar Practice';
      case 'vocabulary': return 'Vocabulary Practice';
      case 'pronunciation': return 'Pronunciation Practice';
      default: return 'Practice Session';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'numbers': return 'Test your knowledge of French numbers with our interactive exercises. Each question has a time limit to keep you focused!';
      case 'expressions': return 'Master French expressions and idioms with our interactive practice. Each question has a time limit to keep you focused!';
      case 'alphabet': return 'Practice the French alphabet and spelling with our interactive exercises. Each question has a time limit to keep you focused!';
      case 'grammar': return 'Test your French grammar knowledge with our interactive practice. Each question has a time limit to keep you focused!';
      case 'vocabulary': return 'Expand your French vocabulary with our interactive practice. Each question has a time limit to keep you focused!';
      case 'pronunciation': return 'Improve your French pronunciation with our interactive practice. Each question has a time limit to keep you focused!';
      default: return 'Test your French knowledge with our interactive practice questions. Each question has a time limit to keep you focused!';
    }
  };

  // Category selection screen
  if (showCategorySelection) {
    return (
      <>
        <AuthModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          context="practice"
          onSuccess={() => {
            setShowLoginModal(false);
            setQuizStarted(true);
            setIsActive(true);
            setTimeLeft(30);
          }}
        />
        
        <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Practice Categories</h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            Choose a category to start practicing. Each category has specific questions tailored to that topic.
          </p>

          <TipSection 
            title="Practice Tip"
            content="Select a category that matches what you've been learning to get the most relevant practice questions."
          />

          {!isAuthenticated && (
            <div className="my-6 rounded-lg border bg-amber-50 dark:bg-amber-900/20 p-4">
              <div className="flex items-start space-x-2">
                <Lock className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Login Required for Progress Tracking</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Sign in to save your practice scores, track your improvement, and access personalized learning recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold mt-8 mb-4">Choose Your Practice Category</h2>
          <p className="text-muted-foreground mb-6">
            Select from the categories below to start your practice session:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6">
            <Link href="/practice?category=numbers">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Hash className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Numbers</h3>
                      <p className="text-sm text-muted-foreground">Practice French numbers</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge of French numbers from 1-100, including compound numbers and ordinals.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice?category=alphabet">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Alphabet</h3>
                      <p className="text-sm text-muted-foreground">Practice French alphabet</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Learn the French alphabet, special characters, and spelling practice.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice?category=grammar">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Grammar</h3>
                      <p className="text-sm text-muted-foreground">Practice French grammar</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Test your understanding of French grammar rules, articles, and verb conjugations.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice?category=vocabulary">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Book className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Vocabulary</h3>
                      <p className="text-sm text-muted-foreground">Practice French vocabulary</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expand your French vocabulary with common words and phrases.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice?category=expressions">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                      <FileText className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Expressions</h3>
                      <p className="text-sm text-muted-foreground">Practice French expressions</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Master French expressions, idioms, and colloquial language.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice?category=pronunciation">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
                      <Volume2 className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Pronunciation</h3>
                      <p className="text-sm text-muted-foreground">Practice French pronunciation</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Improve your French pronunciation with audio exercises and phonetic practice.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/practice?category=general">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                      <Target className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Mixed Practice</h3>
                      <p className="text-sm text-muted-foreground">Practice all topics</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get a mix of questions from all categories for comprehensive practice.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        </div>
      </>
    );
  }

  // Show completion screen
  if (quizCompleted) {
    const percentage = Math.round((score / practiceQuestions.length) * 100);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;

    return (
      <>
        <AuthModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          context="practice"
          onSuccess={() => {
            setShowLoginModal(false);
            setQuizStarted(true);
            setIsActive(true);
            setTimeLeft(30);
          }}
        />
        
        <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
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
            You scored {score} out of {practiceQuestions.length} ({percentage}%)
          </p>
        </div>

        <Card className="universal-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getCategoryIcon(category === 'numbers' ? 'Numbers' : category === 'expressions' ? 'Expressions' : 'General')}
              <span>{getCategoryDisplayName(category)} - Results</span>
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
                <div className="text-2xl font-bold text-primary">{practiceQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <EnhancedButton 
                onClick={resetPractice}
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </EnhancedButton>
              <Link href="/practice" className="flex-1">
                <EnhancedButton 
                  variant="outline"
                  className="w-full"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Other Practices
                </EnhancedButton>
              </Link>
            </div>
          </CardContent>
        </Card>
        </div>
      </>
    );
  }

  // Show instructions modal when category is selected but quiz hasn't started
  if (!showCategorySelection && !quizStarted) {
    return (
      <>
        <AuthModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          context="practice"
          onSuccess={() => {
            setShowLoginModal(false);
            setQuizStarted(true);
            setIsActive(true);
            setTimeLeft(30);
          }}
        />
        
        <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="universal-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getCategoryIcon(category === 'numbers' ? 'Numbers' : category === 'expressions' ? 'Expressions' : 'General')}
                <span>{getCategoryDisplayName(category)} - Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">How the Quiz Works:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Select Your Answer</p>
                      <p className="text-sm text-muted-foreground">Click on any option to select it. You can change your selection before submitting.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Submit Your Answer</p>
                      <p className="text-sm text-muted-foreground">Click the &quot;Submit Answer&quot; button to confirm your choice and see the result.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Listen to Pronunciation</p>
                      <p className="text-sm text-muted-foreground">Use the audio buttons to hear how words are pronounced in French.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Learn from Feedback</p>
                      <p className="text-sm text-muted-foreground">Get explanations for each answer to improve your understanding.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium">Quiz Details</p>
                    <p className="text-sm text-muted-foreground">
                      • {practiceQuestions.length} questions total<br/>
                      • 30 seconds per question<br/>
                      • Audio pronunciation available<br/>
                      • Detailed explanations provided
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <EnhancedButton 
                  onClick={startQuiz}
                  className="flex-1"
                >
                  Start Quiz
                </EnhancedButton>
                <Link href="/practice" className="flex-1">
                  <EnhancedButton 
                    variant="outline"
                    className="w-full"
                  >
                    Choose Different Category
                  </EnhancedButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        context="practice"
        onSuccess={() => {
          setShowLoginModal(false);
          setQuizStarted(true);
          setIsActive(true);
          setTimeLeft(30);
        }}
      />
      
      <div className="container mx-auto max-w-4xl px-4 py-4 md:py-8">

        <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground">
          {getCategoryDescription(category)}
        </p>

        <TipSection 
          title="Practice Tip"
          content="Take your time to read each question carefully. Use the audio button to hear pronunciations when available."
        />

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">
              {getCategoryDisplayName(category)}
            </h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {practiceQuestions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / practiceQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQ && (
          <Card className="universal-card mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(currentQ.category)}
                  <Badge className={getCategoryColor(currentQ.category)}>
                    {currentQ.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Score: {score}</span>
                  {!isActive && !showResult && (
                    <EnhancedButton
                      onClick={startTimer}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Play className="h-3 w-3" />
                      Start Timer
                    </EnhancedButton>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">{currentQ.question}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQ.correct;
                    const showCorrect = showResult && isCorrect;
                    const showIncorrect = showResult && isSelected && !isCorrect;

                    return (
                      <div
                        key={index}
                        onClick={() => !showResult && handleAnswer(option)}
                        className={`p-4 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          showResult
                            ? showCorrect
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                              : showIncorrect
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                              : isCorrect
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                            : isSelected
                            ? 'border-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold'
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-400 dark:border-gray-500'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="text-sm text-gray-900 dark:text-gray-100 flex-1">{option}</span>
                          <div className="flex items-center gap-2">
                            {showResult && showCorrect && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {showResult && showIncorrect && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                            {showResult && isCorrect && !isSelected && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            <AudioButton 
                              text={option} 
                              size="sm" 
                              tooltipContent={`Listen: ${option}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {showResult && (
                <div className={`p-6 rounded-lg mb-6 border-2 bg-white dark:bg-gray-800 ${
                  selectedAnswer === currentQ.correct
                    ? 'border-green-500 text-green-700 dark:text-green-300' 
                    : 'border-red-500 text-red-700 dark:text-red-300'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        selectedAnswer === currentQ.correct ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
                      }`}>
                        {selectedAnswer === currentQ.correct ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                      </div>
                      <span className="font-bold text-lg">
                        {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Answer:</span>
                      <AudioButton 
                        text={currentQ.correct}
                        tooltipContent={`Listen: ${currentQ.correct}`}
                      />
                    </div>
                  </div>
                  {selectedAnswer !== currentQ.correct && (
                    <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          The correct answer is: <strong className="text-lg">{currentQ.correct}</strong>
                        </p>
                        <AudioButton 
                          text={currentQ.correct}
                          tooltipContent={`Listen: ${currentQ.correct}`}
                        />
                      </div>
                    </div>
                  )}
                  {currentQ.explanation && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">{currentQ.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                {!showResult ? (
                  <button
                    onClick={submitAnswer}
                    disabled={!selectedAnswer}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      !selectedAnswer
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                  >
                    {currentQuestion < practiceQuestions.length - 1 ? 'Next Question' : 'Finish'}
                  </button>
                )}
                
                <button
                  onClick={resetPractice}
                  className="group px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                  title="Exit practice session"
                >
                  <RotateCcw className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        </div>
      </div>
    </>
  );
}
