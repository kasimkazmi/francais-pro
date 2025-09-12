'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/header";
import { ArrowLeft, CheckCircle, Clock, Volume2, Star } from "lucide-react";
import { AudioButton } from "@/components/ui/audio-button";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";

// Comprehensive lesson content with timers and structured flow
const lessonContent = {
  foundations: {
    1: {
      title: "French Alphabet & Pronunciation",
      duration: 15,
      sections: [
        {
          title: "Introduction to French Alphabet",
          duration: 3,
          content: "Welcome to your first French lesson! Today we'll learn the French alphabet and its unique pronunciation rules. The French alphabet has 26 letters, just like English, but with different sounds.",
          type: "introduction"
        },
        {
          title: "Basic Letters A-E",
          duration: 4,
          content: "Let's start with the first five letters of the French alphabet. Each letter has its own unique sound.",
          examples: [
            { french: "A", english: "ah", audio: "a.mp3", description: "Like \"ah\" in \"father\"" },
            { french: "B", english: "bay", audio: "b.mp3", description: "Like \"bay\" in \"baby\"" },
            { french: "C", english: "say", audio: "c.mp3", description: "Like \"say\" in \"say\"" },
            { french: "D", english: "day", audio: "d.mp3", description: "Like \"day\" in \"day\"" },
            { french: "E", english: "uh", audio: "e.mp3", description: "Like \"uh\" in \"the\"" }
          ],
          type: "learning"
        },
        {
          title: "Special Characters",
          duration: 3,
          content: "French has special characters called diacritics that change pronunciation. These are essential for proper French spelling and pronunciation.",
          examples: [
            { french: "é", english: "ay", audio: "e-acute.mp3", description: "Acute accent - like \"ay\" in \"say\"" },
            { french: "è", english: "eh", audio: "e-grave.mp3", description: "Grave accent - like \"eh\" in \"bed\"" },
            { french: "ç", english: "s", audio: "c-cedilla.mp3", description: "Cedilla - always sounds like \"s\"" }
          ],
          type: "learning"
        },
        {
          title: "Practice Session",
          duration: 3,
          content: "Now let's practice what you've learned with some interactive exercises.",
          exercises: [
            {
              type: "pronunciation",
              question: "How do you pronounce the letter \"C\" in French?",
              options: ["see", "say", "kay"],
              correct: 1,
              explanation: "In French, \"C\" is pronounced like \"say\" in English."
            },
            {
              type: "matching",
              question: "Match the French letter with its pronunciation:",
              pairs: [
                { french: "A", pronunciations: ["ah", "ay", "uh"] },
                { french: "E", pronunciations: ["ee", "uh", "ay"] }
              ],
              correct: [0, 1],
              explanation: "A sounds like \"ah\" and E sounds like \"uh\" in French."
            }
          ],
          type: "practice"
        },
        {
          title: "Review & Summary",
          duration: 2,
          content: "Great job! You've learned the French alphabet basics. Remember: French pronunciation is different from English, so practice regularly.",
          type: "review"
        }
      ]
    },
    2: {
      title: "Basic Greetings",
      duration: 20,
      sections: [
        {
          title: "Introduction to Greetings",
          duration: 3,
          content: "Greetings are the foundation of French conversation. Let's learn the most important ones you'll use daily.",
          type: "introduction"
        },
        {
          title: "Common Greetings",
          duration: 5,
          content: "Master these essential French greetings for different times of day and situations.",
          examples: [
            { french: "Bonjour", english: "Hello/Good morning", audio: "bonjour.mp3", description: "Used from morning until evening" },
            { french: "Bonsoir", english: "Good evening", audio: "bonsoir.mp3", description: "Used in the evening" },
            { french: "Salut", english: "Hi/Bye", audio: "salut.mp3", description: "Informal greeting" },
            { french: "Au revoir", english: "Goodbye", audio: "au-revoir.mp3", description: "Formal goodbye" }
          ],
          type: "learning"
        },
        {
          title: "Polite Expressions",
          duration: 4,
          content: "French culture values politeness. Learn these important polite expressions.",
          examples: [
            { french: "S'il vous plaît", english: "Please", audio: "s-il-vous-plait.mp3", description: "Formal way to say please" },
            { french: "Merci", english: "Thank you", audio: "merci.mp3", description: "Thank you" },
            { french: "Excusez-moi", english: "Excuse me", audio: "excusez-moi.mp3", description: "Excuse me" }
          ],
          type: "learning"
        },
        {
          title: "Practice Session",
          duration: 5,
          content: "Practice using these greetings in different scenarios.",
          exercises: [
            {
              type: "translation",
              question: "How do you say \"Hello\" in French?",
              options: ["Salut", "Bonjour", "Bonsoir"],
              correct: 1,
              explanation: "Bonjour is the most common way to say hello in French."
            },
            {
              type: "scenario",
              question: "What would you say when meeting someone in the morning?",
              options: ["Bonsoir", "Bonjour", "Salut"],
              correct: 1,
              explanation: "Bonjour is appropriate for morning greetings."
            }
          ],
          type: "practice"
        },
        {
          title: "Review & Summary",
          duration: 3,
          content: "Excellent! You now know the essential French greetings. Practice using them in real conversations.",
          type: "review"
        }
      ]
    }
  }
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { moduleId, lessonId } = params as { moduleId: string; lessonId: string };
  const { isAuthenticated, isLoading } = useAuth();
  const { updateLesson, isLessonCompleted } = useProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number | number[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sectionTimeSpent, setSectionTimeSpent] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const lesson = lessonContent[moduleId as keyof typeof lessonContent]?.[lessonId as string];
  const isLessonDone = isLessonCompleted(moduleId, lessonId);
  const currentSectionData = lesson?.sections?.[currentSection];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Start session timer
    const startTime = new Date();
    setSessionStartTime(startTime);
    setIsSessionActive(true);

    const timer = setInterval(() => {
      if (isSessionActive) {
        const now = new Date();
        const totalTime = Math.floor((now.getTime() - startTime.getTime()) / 1000 / 60); // minutes
        setTimeSpent(totalTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, isLoading, isSessionActive]);

  // Section timer
  useEffect(() => {
    if (currentSectionData && isSessionActive) {
      const startTime = new Date();
      setSectionStartTime(startTime);
      setSectionTimeSpent(0);

      const sectionTimer = setInterval(() => {
        const now = new Date();
        const sectionTime = Math.floor((now.getTime() - startTime.getTime()) / 1000); // seconds
        setSectionTimeSpent(sectionTime);
      }, 1000);

      return () => clearInterval(sectionTimer);
    }
  }, [currentSection, currentSectionData, isSessionActive]);

  const handleExerciseAnswer = (exerciseIndex: number, answer: number | number[]) => {
    setExerciseAnswers(prev => ({
      ...prev,
      [exerciseIndex]: answer
    }));
  };

  const playAudio = (text: string) => {
    // Use Web Speech API to pronounce the text
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR'; // French language
      utterance.rate = 0.8; // Slightly slower for learning
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextSection = () => {
    if (lesson?.sections && currentSection < lesson.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setExerciseAnswers({}); // Reset answers for new section
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setExerciseAnswers({}); // Reset answers for new section
    }
  };


  const pauseLesson = () => {
    setIsSessionActive(false);
  };

  const resumeLesson = () => {
    setIsSessionActive(true);
  };

  const calculateScore = () => {
    if (!lesson) return 0;
    
    let correct = 0;
    let total = 0;

    // Calculate score from all sections
    lesson.sections.forEach(section => {
      if (section.exercises) {
        section.exercises.forEach((exercise, index) => {
          total++;
          const userAnswer = exerciseAnswers[index];
          if (exercise.type === "pronunciation" || exercise.type === "translation" || exercise.type === "scenario") {
            if (userAnswer === exercise.correct) correct++;
          } else if (exercise.type === "matching") {
            const isCorrect = Array.isArray(userAnswer) && 
              userAnswer.length === exercise.correct.length &&
              userAnswer.every((ans, i) => ans === exercise.correct[i]);
            if (isCorrect) correct++;
          }
        });
      }
    });

    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  const handleCompleteLesson = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const score = calculateScore();
      await updateLesson(moduleId, lessonId, true, score, timeSpent);
      setIsCompleted(true);
      setShowResults(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading lesson...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const progress = lesson?.sections ? ((currentSection + 1) / lesson.sections.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Path
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.duration} min total
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {isLessonDone ? "Completed" : "In Progress"}
                </div>
                <div className="flex items-center gap-1">
                  <span>Section {currentSection + 1} of {lesson.sections?.length || 0}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isLessonDone ? "default" : "secondary"}>
                {isLessonDone ? "Completed" : "In Progress"}
              </Badge>
              {isSessionActive ? (
                <Button variant="outline" size="sm" onClick={pauseLesson}>
                  Pause
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={resumeLesson}>
                  Resume
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress: {Math.round(progress)}%</span>
              <span>Time: {timeSpent} min</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        {/* Current Section */}
        {currentSectionData && (
          <div className="space-y-6">
            {/* Section Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentSectionData.title}</CardTitle>
                    <CardDescription>
                      {currentSectionData.type === "introduction" && "📚 Introduction"}
                      {currentSectionData.type === "learning" && "🎓 Learning Content"}
                      {currentSectionData.type === "practice" && "💪 Practice Exercises"}
                      {currentSectionData.type === "review" && "📝 Review & Summary"}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Section {currentSection + 1} of {lesson.sections?.length || 0}</div>
                    <div>Time: {Math.floor(sectionTimeSpent / 60)}:{(sectionTimeSpent % 60).toString().padStart(2, "0")}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentSectionData.content}</p>
                
                {/* Examples */}
                {currentSectionData.examples && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Examples:</h4>
                    {currentSectionData.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                        <div className="flex-1">
                          <div className="font-medium text-lg">{example.french}</div>
                          <div className="text-muted-foreground">{example.english}</div>
                          {example.description && (
                            <div className="text-sm text-muted-foreground mt-1">{example.description}</div>
                          )}
                        </div>
                        <AudioButton 
                          text={`${example.french}, ${example.english}`}
                          size="sm"
                          variant="ghost"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Exercises */}
                {currentSectionData.exercises && (
                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium">Practice:</h4>
                    {currentSectionData.exercises.map((exercise, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-3">{exercise.question}</h5>
                        
                        {exercise.type === "pronunciation" || exercise.type === "translation" || exercise.type === "scenario" ? (
                          <div className="space-y-2">
                            {exercise.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-muted/50">
                                <input
                                  type="radio"
                                  name={`exercise-${index}`}
                                  value={optionIndex}
                                  onChange={() => handleExerciseAnswer(index, optionIndex)}
                                  className="text-blue-600"
                                />
                                <span 
                                  className="flex-1 cursor-pointer"
                                  onClick={() => playAudio(option)}
                                >
                                  {option}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    playAudio(option);
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200 hover:scale-105 active:scale-95"
                                >
                                  <Volume2 className="h-3 w-3" />
                                </Button>
                              </label>
                            ))}
                          </div>
                        ) : exercise.type === "matching" ? (
                          <div className="space-y-3">
                            {exercise.pairs.map((pair, pairIndex) => (
                              <div key={pairIndex} className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <span 
                                    className="font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => playAudio(pair.french)}
                                  >
                                    {pair.french}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      playAudio(pair.french);
                                    }}
                                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200 hover:scale-105 active:scale-95"
                                  >
                                    <Volume2 className="h-3 w-3" />
                                  </Button>
                                </div>
                                <select 
                                  onChange={(e) => {
                                    const newAnswers = [...(exerciseAnswers[index] as number[] || [])];
                                    newAnswers[pairIndex] = parseInt(e.target.value);
                                    handleExerciseAnswer(index, newAnswers);
                                  }}
                                  className="border border-input rounded px-2 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 transition-colors dark:bg-background dark:text-foreground"
                                >
                                  <option value="">Select pronunciation</option>
                                  {pair.pronunciations.map((pronunciation, pronIndex) => (
                                    <option key={pronIndex} value={pronIndex}>
                                      {pronunciation}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
              >
                Previous Section
              </Button>
              
              {currentSection < (lesson.sections?.length || 0) - 1 ? (
                <Button onClick={handleNextSection}>
                  Next Section
                </Button>
              ) : (
                <Button 
                  onClick={handleCompleteLesson}
                  disabled={isCompleted}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Lesson Completed!
                    </>
                  ) : (
                    "Complete Lesson"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Congratulations!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {calculateScore()}%
                  </div>
                  <div className="text-sm text-green-700">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {timeSpent} min
                  </div>
                  <div className="text-sm text-green-700">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    </div>
  );
}
