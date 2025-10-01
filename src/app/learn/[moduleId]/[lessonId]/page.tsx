"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Volume2,
  Star,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { learningModules } from "@/data/lessons/learning-content";
import LessonCompletionModal from "@/components/learn/lesson-completion-modal";
import { getLessonByModule } from "@/lib/services/lesson-service";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { moduleId, lessonId } = params as {
    moduleId: string;
    lessonId: string;
  };
  const { isAuthenticated, isLoading } = useAuth();
  const { updateLesson, isLessonCompleted } = useProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<
    Record<number, number | number[]>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sectionTimeSpent, setSectionTimeSpent] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sectionStartTime, setSectionStartTime] = useState<Date | null>(null);

  // Define proper types for lesson content
  interface ExercisePair {
    french: string;
    pronunciations: string[];
  }

  interface Exercise {
    type: string;
    question: string;
    options?: string[];
    correct?: number | number[];
    correctAnswer?: number | string;
    sentence?: string;
    alternatives?: string[];
    pairs?: ExercisePair[];
    explanation?: string;
  }

  interface Example {
    french: string;
    english: string;
    pronunciation?: string;
    audio?: string;
    description?: string;
  }

  interface LessonSection {
    title: string;
    duration: number;
    content: string;
    type: string;
    examples?: Example[];
    exercises?: Exercise[];
  }

  const [lesson, setLesson] = useState<{
    id: string;
    title: string;
    description: string;
    duration: number;
    difficulty: string;
    xpReward: number;
    sections: LessonSection[];
  } | null>(null);
  const [lessonLoading, setLessonLoading] = useState(true);

  useEffect(() => {
    async function loadLesson() {
      setLessonLoading(true);
      try {
        const data = await getLessonByModule(moduleId, lessonId);
        setLesson(data);
      } catch (error) {
        console.error('Error loading lesson:', error);
        setLesson(null);
      } finally {
        setLessonLoading(false);
      }
    }
    loadLesson();
  }, [moduleId, lessonId]);
  const isLessonDone = isLessonCompleted(moduleId, lessonId);
  const currentSectionData = useMemo(
    () => lesson?.sections?.[currentSection],
    [lesson, currentSection]
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Start session timer
    const startTime = new Date();
    setSessionStartTime(startTime);
    setIsSessionActive(true);
  }, [isAuthenticated, isLoading]);

  // Separate effect for timer
  useEffect(() => {
    if (!isSessionActive || !sessionStartTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const totalTime = Math.floor(
        (now.getTime() - sessionStartTime.getTime()) / 1000 / 60
      ); // minutes
      setTimeSpent(totalTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionActive, sessionStartTime]);

  // Section timer
  useEffect(() => {
    if (isSessionActive && lesson?.sections?.[currentSection]) {
      const startTime = new Date();
      setSectionStartTime(startTime);
      setSectionTimeSpent(0);
    }
  }, [currentSection, isSessionActive, lesson]);

  // Separate effect for section timer
  useEffect(() => {
    if (!sectionStartTime) return;

    const sectionTimer = setInterval(() => {
      const now = new Date();
      const sectionTime = Math.floor(
        (now.getTime() - sectionStartTime.getTime()) / 1000
      ); // seconds
      setSectionTimeSpent(sectionTime);
    }, 1000);

    return () => clearInterval(sectionTimer);
  }, [sectionStartTime]);

  const handleExerciseAnswer = (
    exerciseIndex: number,
    answer: number | number[]
  ) => {
    setExerciseAnswers((prev) => ({
      ...prev,
      [exerciseIndex]: answer,
    }));
  };

  const playAudio = (text: string) => {
    // Use Web Speech API to pronounce the text
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR"; // French language
      utterance.rate = 0.8; // Slightly slower for learning
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextSection = () => {
    if (lesson?.sections && currentSection < lesson.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setExerciseAnswers({}); // Reset answers for new section
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
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
    if (!lesson?.sections) return 0;

    let correct = 0;
    let total = 0;

    // Calculate score from all sections
    lesson.sections.forEach((section: LessonSection) => {
      if (section.exercises) {
        section.exercises.forEach((exercise: Exercise, index: number) => {
          total++;
          const userAnswer = exerciseAnswers[index];
          if (
            exercise.type === "pronunciation" ||
            exercise.type === "translation" ||
            exercise.type === "scenario"
          ) {
            if (userAnswer === exercise.correct) correct++;
          } else if (
            exercise.type === "matching" &&
            exercise.correct &&
            Array.isArray(exercise.correct)
          ) {
            const correctArray = exercise.correct as number[];
            const isCorrect =
              Array.isArray(userAnswer) &&
              userAnswer.length === correctArray.length &&
              userAnswer.every((ans, i) => ans === correctArray[i]);
            if (isCorrect) correct++;
          }
        });
      }
    });

    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  // Get next lesson for auto-advance
  const getNextLesson = () => {
    const currentModule = learningModules.find(m => m.id === moduleId);
    if (!currentModule) return null;
    
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
    if (currentLessonIndex < 0 || currentLessonIndex >= currentModule.lessons.length - 1) {
      return null;
    }
    
    return currentModule.lessons[currentLessonIndex + 1];
  };

  const nextLesson = getNextLesson();

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
      console.error("Error completing lesson:", error);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/learn/${moduleId}/${nextLesson.id}`);
    } else {
      router.push('/learn');
    }
  };

  const handleReviewLesson = () => {
    setShowResults(false);
    setCurrentSection(0);
    setExerciseAnswers({});
    setSectionTimeSpent(0);
  };

  // Show loading state while authentication or lesson is being determined
  if (isLoading || lessonLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Loading lesson...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Lesson Not Found
          </h1>
          <Button onClick={() => router.back()} className="w-full sm:w-auto">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const progress = lesson?.sections
    ? ((currentSection + 1) / lesson.sections.length) * 100
    : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sticky Header */}
      <div className="sticky top-16 sm:top-20 bg-background/95 backdrop-blur-sm z-10 mb-4 sm:mb-6 lg:mb-8 pb-4 border-b sm:border-b-0">
        {/* Back Button */}

        {/* Title Section */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 break-words leading-tight">
                {lesson.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{lesson.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{isLessonDone ? "Completed" : "In Progress"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    Section {currentSection + 1}/{lesson.sections?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge
                variant={isLessonDone ? "default" : "secondary"}
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                {isLessonDone ? "Compeleted" : "In-Progress"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={isSessionActive ? pauseLesson : resumeLesson}
                className="p-2 sm:px-3 sm:py-2"
              >
                {isSessionActive ? (
                  <>
                    <Pause className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                    <span className="hidden sm:inline">Resume</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>Progress: {Math.round(progress)}%</span>
              <span>Time: {timeSpent} min</span>
            </div>
            <Progress value={progress} className="w-full h-2 sm:h-3" />
          </div>
        </div>
      </div>

      {/* Current Section Content */}
      {currentSectionData && (
        <div className="space-y-4 sm:space-y-6">
          {/* Section Header */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg sm:text-xl break-words">
                    {currentSectionData.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-1 sm:mt-2">
                    {currentSectionData.type === "introduction" &&
                      "📚 Introduction"}
                    {currentSectionData.type === "learning" &&
                      "🎓 Learning Content"}
                    {currentSectionData.type === "practice" &&
                      "💪 Practice Exercises"}
                    {currentSectionData.type === "review" &&
                      "📝 Review & Summary"}
                  </CardDescription>
                </div>
                <div className="text-right text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                  <div>
                    Section {currentSection + 1}/{lesson.sections?.length || 0}
                  </div>
                  <div>
                    Time: {Math.floor(sectionTimeSpent / 60)}:
                    {(sectionTimeSpent % 60).toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                {currentSectionData.content}
              </p>

              {/* Examples Section */}
              {"examples" in currentSectionData &&
                (currentSectionData as LessonSection).examples && (
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">
                      Examples:
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {(currentSectionData as LessonSection).examples!.map(
                        (example: Example, exampleIndex: number) => (
                          <div
                            key={exampleIndex}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-base sm:text-lg mb-1 break-words">
                                {example.french}
                              </div>
                              <div className="text-sm sm:text-base text-muted-foreground mb-1 break-words">
                                {example.english}
                              </div>
                              {example.description && (
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                  {example.description}
                                </div>
                              )}
                            </div>
                            <div className="flex-shrink-0 self-start sm:self-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  playAudio(
                                    `${example.french}, ${example.english}`
                                  )
                                }
                                className="p-2 sm:p-3 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-105 active:scale-95"
                              >
                                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Exercises Section */}
              {"exercises" in currentSectionData &&
                (currentSectionData as LessonSection).exercises && (
                  <div className="space-y-4 sm:space-y-6 mt-6">
                    <h4 className="font-medium text-sm sm:text-base">
                      Practice:
                    </h4>
                    {(currentSectionData as LessonSection).exercises!.map(
                      (exercise: Exercise, index: number) => (
                        <Card
                          key={index}
                          className="border-l-4 border-l-green-500"
                        >
                          <CardContent className="p-4 sm:p-6">
                            <h5 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base break-words">
                              {exercise.question}
                            </h5>

                            {/* Multiple Choice Questions */}
                            {(exercise.type === "pronunciation" ||
                              exercise.type === "translation" ||
                              exercise.type === "scenario") && (
                              <div className="space-y-2 sm:space-y-3">
                                {exercise.options?.map(
                                  (option: string, optionIndex: number) => (
                                    <label
                                      key={optionIndex}
                                      className="flex items-start sm:items-center gap-3 cursor-pointer p-3 sm:p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-muted-foreground/20"
                                    >
                                      <input
                                        type="radio"
                                        name={`exercise-${index}`}
                                        value={optionIndex}
                                        onChange={() =>
                                          handleExerciseAnswer(
                                            index,
                                            optionIndex
                                          )
                                        }
                                        className="mt-0.5 sm:mt-0 flex-shrink-0"
                                      />
                                      <span
                                        className="flex-1 text-sm sm:text-base cursor-pointer break-words leading-relaxed"
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
                                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                                      >
                                        <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </Button>
                                    </label>
                                  )
                                )}
                              </div>
                            )}

                            {/* Matching Exercises */}
                            {exercise.type === "matching" && (
                              <div className="space-y-3 sm:space-y-4">
                                {exercise.pairs?.map(
                                  (pair: ExercisePair, pairIndex: number) => (
                                    <div
                                      key={pairIndex}
                                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg"
                                    >
                                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                        <span
                                          className="font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base break-words"
                                          onClick={() => playAudio(pair.french)}
                                        >
                                          {pair.french}
                                        </span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => playAudio(pair.french)}
                                          className="p-1.5 sm:p-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                                        >
                                          <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                      </div>
                                      <select
                                        onChange={(e) => {
                                          const newAnswers = [
                                            ...((exerciseAnswers[
                                              index
                                            ] as number[]) || []),
                                          ];
                                          newAnswers[pairIndex] = parseInt(
                                            e.target.value
                                          );
                                          handleExerciseAnswer(
                                            index,
                                            newAnswers
                                          );
                                        }}
                                        className="w-full sm:w-auto sm:min-w-[200px] border border-input rounded px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring hover:bg-muted/50 transition-colors text-sm sm:text-base"
                                      >
                                        <option value="">
                                          Select pronunciation
                                        </option>
                                        {pair.pronunciations.map(
                                          (
                                            pronunciation: string,
                                            pronIndex: number
                                          ) => (
                                            <option
                                              key={pronIndex}
                                              value={pronIndex}
                                            >
                                              {pronunciation}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Sticky Navigation */}
          <div className="sticky bottom-4 bg-background/95 backdrop-blur-sm rounded-lg border p-3 sm:p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
                className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentSection < (lesson.sections?.length || 0) - 1 ? (
                <Button
                  onClick={handleNextSection}
                  className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-2"
                >
                  Next
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteLesson}
                  disabled={isCompleted}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-sm sm:text-base py-3 sm:py-2"
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Completed!
                    </>
                  ) : (
                    <>
                      Complete Lesson
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      <LessonCompletionModal
        isOpen={showResults}
        onClose={() => router.push('/learn')}
        lessonTitle={lesson?.title || ''}
        score={calculateScore()}
        timeSpent={timeSpent}
        xpEarned={lesson?.xpReward || 50}
        onNextLesson={nextLesson ? handleNextLesson : undefined}
        onReview={handleReviewLesson}
        hasNextLesson={!!nextLesson}
      />

      {/* Learn Login Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        context="learn"
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}
