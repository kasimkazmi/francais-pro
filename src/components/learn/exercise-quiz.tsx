"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Volume2,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ExerciseQuizProps } from "@/types/component-props";

export function ExerciseQuiz({
  exercises,
  onComplete,
  onFinish,
  onTrackWrongAnswer,
}: ExerciseQuizProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];
  const totalExercises = exercises.length;

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (answer: number | number[]) => {
    setAnswers({ ...answers, [currentExerciseIndex]: answer });

    // Check if answer is correct
    let correct = false;
    let userAnswerText = "";
    let correctAnswerText = "";

    // For fill-blank: answer is index, need to get the actual text
    if (currentExercise.type === "fill-blank" && currentExercise.alternatives) {
      const selectedOption = currentExercise.alternatives[answer as number];
      userAnswerText = selectedOption;
      correctAnswerText = currentExercise.correctAnswer as string;
      correct = selectedOption === currentExercise.correctAnswer;
    }
    // For multiple choice: answer is index
    else if (
      currentExercise.correctAnswer !== undefined &&
      currentExercise.options
    ) {
      userAnswerText = currentExercise.options[answer as number];
      correctAnswerText =
        currentExercise.options[currentExercise.correctAnswer as number];
      correct = currentExercise.correctAnswer === answer;
    } else if (currentExercise.correct !== undefined) {
      if (Array.isArray(currentExercise.correct)) {
        correct =
          JSON.stringify(currentExercise.correct.sort()) ===
          JSON.stringify((answer as number[]).sort());
      } else {
        correct = currentExercise.correct === answer;
        if (currentExercise.options) {
          userAnswerText = currentExercise.options[answer as number];
          correctAnswerText =
            currentExercise.options[currentExercise.correct as number];
        }
      }
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    // Track wrong answer
    if (!correct && onTrackWrongAnswer) {
      onTrackWrongAnswer({
        question: currentExercise.question,
        userAnswer: userAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: false,
        type: currentExercise.type,
      });
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setShowFeedback(false);
    } else {
      // Quiz complete
      onComplete(answers);
      if (onFinish) {
        onFinish(); // Auto-advance to next section
      }
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setShowFeedback(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Focus Mode Indicator */}
      {/* <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-lg mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-primary">🎯 Focus Mode:</span>
          <span className="text-muted-foreground">
            Complete all exercises to continue to the next section
          </span>
        </div>
      </div> */}

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Question {currentExerciseIndex + 1} of {totalExercises}
        </span>
        <div className="flex gap-1">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all ${
                index < currentExerciseIndex
                  ? "bg-green-500"
                  : index === currentExerciseIndex
                  ? "bg-primary"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Exercise Card */}
      <Card className=" ">
        <CardContent className="p-4 sm:p-6">
          {/* Question */}
          <div className="mb-6">
            <h5 className="font-medium text-lg mb-2 break-words">
              {currentExercise.question}
            </h5>
          </div>

          {/* Multiple Choice Questions */}
          {(currentExercise.type === "pronunciation" ||
            currentExercise.type === "translation" ||
            currentExercise.type === "scenario" ||
            currentExercise.type === "multiple-choice") && (
            <div className="space-y-3">
              {currentExercise.options?.map(
                (option: string, optionIndex: number) => {
                  const isSelected =
                    answers[currentExerciseIndex] === optionIndex;
                  const showCorrect =
                    showFeedback &&
                    currentExercise.correctAnswer === optionIndex;
                  const showWrong = showFeedback && isSelected && !isCorrect;

                  return (
                    <label
                      key={optionIndex}
                      className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg transition-all border-2 ${
                        showCorrect
                          ? "border-green-500 text-foreground"
                          : showWrong
                          ? "border-red-500 text-foreground"
                          : isSelected
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      } ${showFeedback ? "pointer-events-none" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`exercise-${currentExerciseIndex}`}
                        value={optionIndex}
                        checked={isSelected}
                        onChange={() =>
                          !showFeedback && handleAnswer(optionIndex)
                        }
                        className="flex-shrink-0"
                        disabled={showFeedback}
                      />
                      <span className="flex-1 text-base break-words">
                        {option}
                      </span>
                      {showCorrect && (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      )}
                      {showWrong && (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          playAudio(option);
                        }}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </label>
                  );
                }
              )}
            </div>
          )}

          {/* Fill in the Blank */}
          {currentExercise.type === "fill-blank" && (
            <div className="space-y-4">
              <p className="text-base p-4 bg-muted/50 rounded-lg">
                {currentExercise.sentence}
              </p>
              <div className="space-y-3">
                {currentExercise.alternatives?.map(
                  (option: string, optionIndex: number) => {
                    const isSelected =
                      answers[currentExerciseIndex] === optionIndex;
                    const isCorrectOption =
                      option === currentExercise.correctAnswer;
                    const showCorrect = showFeedback && isCorrectOption;
                    const showWrong = showFeedback && isSelected && !isCorrect;

                    return (
                      <label
                        key={optionIndex}
                        className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg transition-all border-2 ${
                          showCorrect
                            ? "border-green-500 text-foreground"
                            : showWrong
                            ? "border-red-500 text-foreground"
                            : isSelected
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        } ${showFeedback ? "pointer-events-none" : ""}`}
                      >
                        <input
                          type="radio"
                          name={`exercise-${currentExerciseIndex}`}
                          value={optionIndex}
                          checked={isSelected}
                          onChange={() =>
                            !showFeedback && handleAnswer(optionIndex)
                          }
                          className="flex-shrink-0"
                          disabled={showFeedback}
                        />
                        <span className="flex-1 text-base font-medium">
                          {option}
                        </span>
                        {showCorrect && (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        )}
                        {showWrong && (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                      </label>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && currentExercise.explanation && (
            <div
              className={`mt-4 p-4 rounded-lg border-l-4 ${
                isCorrect
                  ? "bg-green-100 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100"
                  : "bg-yellow-100 dark:bg-yellow-950 border-yellow-500 text-yellow-900 dark:text-yellow-100"
              }`}
            >
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium mb-1">
                    {isCorrect ? "Correct!" : "Not quite!"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentExercise.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentExerciseIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Badge variant="secondary" className="text-sm">
          {Object.keys(answers).length} / {totalExercises} answered
        </Badge>

        <Button
          onClick={handleNext}
          disabled={!showFeedback}
          className="flex items-center gap-2"
        >
          {currentExerciseIndex === totalExercises - 1 ? "Finish" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
