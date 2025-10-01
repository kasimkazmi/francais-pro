"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Clock, Star, Play, Pause } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { learningModules } from "@/data/lessons/learning-content";
import LessonCompletionModal from "@/components/learn/lesson-completion-modal";
import { getLessonByModule } from "@/lib/services/lesson-service";
import LessonSection from "@/components/learn/lesson-section";
import { Exercise, ExerciseResult, LessonSection as LessonSectionType } from "@/types/lesson-types";

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
  const [wrongAnswers, setWrongAnswers] = useState<ExerciseResult[]>([]);

  const [lesson, setLesson] = useState<{
    id: string;
    title: string;
    description: string;
    duration: number;
    difficulty: string;
    xpReward: number;
    sections: LessonSectionType[];
  } | null>(null);
  const [lessonLoading, setLessonLoading] = useState(true);

  useEffect(() => {
    async function loadLesson() {
      setLessonLoading(true);
      try {
        const data = await getLessonByModule(moduleId, lessonId);
        setLesson(data);
      } catch (error) {
        console.error("Error loading lesson:", error);
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

  // handleExerciseAnswer is now handled by ExerciseQuiz component

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
    lesson.sections.forEach((section: LessonSectionType) => {
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
    const currentModule = learningModules.find((m) => m.id === moduleId);
    if (!currentModule) return null;

    const currentLessonIndex = currentModule.lessons.findIndex(
      (l) => l.id === lessonId
    );
    if (
      currentLessonIndex < 0 ||
      currentLessonIndex >= currentModule.lessons.length - 1
    ) {
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

      // Force sidebar to refresh by dispatching a custom event
      window.dispatchEvent(
        new CustomEvent("lesson-completed", {
          detail: { moduleId, lessonId },
        })
      );
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/learn/${moduleId}/${nextLesson.id}`);
    } else {
      router.push("/learn");
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
                <Badge
                  variant="outline"
                  className={`text-xs border-0 bg-transparent ${
                    lesson.difficulty === "easy"
                      ? "text-green-600 dark:text-green-400"
                      : lesson.difficulty === "medium"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {lesson.difficulty}
                </Badge>
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
          {/* Use LessonSection Component for cleaner code */}
          <LessonSection
            title={currentSectionData.title}
            type={
              currentSectionData.type as
                | "introduction"
                | "learning"
                | "practice"
                | "review"
            }
            content={currentSectionData.content}
            sectionNumber={currentSection}
            totalSections={lesson.sections?.length || 0}
            timeSpent={sectionTimeSpent}
            examples={
              "examples" in currentSectionData
                ? (currentSectionData as LessonSectionType).examples
                : undefined
            }
            exercises={
              "exercises" in currentSectionData
                ? (currentSectionData as LessonSectionType).exercises
                : undefined
            }
            onPlayAudio={playAudio}
            onExerciseComplete={(answers) => {
              // Merge answers into exerciseAnswers state
              const sectionOffset = lesson.sections
                .slice(0, currentSection)
                .reduce((sum, s) => sum + (s.exercises?.length || 0), 0);

              const updatedAnswers = { ...exerciseAnswers };
              Object.entries(answers).forEach(([localIndex, answer]) => {
                updatedAnswers[sectionOffset + parseInt(localIndex)] = answer;
              });
              setExerciseAnswers(updatedAnswers);
            }}
            onExerciseFinish={() => {
              // Auto-advance to next section after completing exercises
              setTimeout(() => {
                if (currentSection < (lesson.sections?.length || 0) - 1) {
                  handleNextSection();
                }
              }, 500); // Small delay for better UX
            }}
            onTrackWrongAnswer={(result) => {
              setWrongAnswers((prev) => [...prev, result]);
            }}
            // Pass review data when on review section
            wrongAnswers={
              currentSectionData.type === "review" ? wrongAnswers : undefined
            }
            correctAnswers={
              currentSectionData.type === "review"
                ? (calculateScore() / 100) *
                  lesson.sections.reduce(
                    (sum, s) => sum + (s.exercises?.length || 0),
                    0
                  )
                : undefined
            }
            totalExercises={
              currentSectionData.type === "review"
                ? lesson.sections.reduce(
                    (sum, s) => sum + (s.exercises?.length || 0),
                    0
                  )
                : undefined
            }
            score={
              currentSectionData.type === "review"
                ? calculateScore()
                : undefined
            }
            difficulty={lesson.difficulty}
          />

          {/* Sticky Navigation - Hidden during practice exercises */}
          {currentSectionData.type !== "practice" && (
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
          )}
        </div>
      )}

      {/* Completion Modal */}
      <LessonCompletionModal
        isOpen={showResults}
        onClose={() => router.push("/learn")}
        lessonTitle={lesson?.title || ""}
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
