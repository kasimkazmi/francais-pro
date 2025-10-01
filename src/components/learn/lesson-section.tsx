"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ExerciseQuiz } from "./exercise-quiz";
import LessonReview from "./lesson-review";
import ExampleList from "./example-list";
import { LessonSectionProps } from "@/types/component-props";

export default function LessonSection({
  title,
  type,
  content,
  sectionNumber,
  totalSections,
  timeSpent,
  examples,
  exercises,
  onPlayAudio,
  onExerciseComplete,
  onExerciseFinish,
  onTrackWrongAnswer,
  wrongAnswers,
  correctAnswers,
  totalExercises,
  score,
  difficulty,
}: LessonSectionProps) {
  //   const config = sectionConfig[type];

  return (
    <Card
      className={`border-l-4 border-r-4 ${
        type === "introduction"
          ? "border-l-blue-500 border-r-blue-500 bg-blue-50/20 dark:bg-blue-950/20"
          : type === "learning"
          ? "border-l-purple-500 border-r-purple-500 bg-purple-50/20 dark:bg-purple-950/20"
          : type === "practice"
          ? "border-l-green-500 border-r-green-500 bg-green-50/20 dark:bg-green-950/20"
          : "border-l-orange-500 border-r-orange-500 bg-orange-50/20 dark:bg-orange-950/20"
      }`}
    >
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg sm:text-xl break-words">
              {title}
            </CardTitle>
          </div>
          <div className="text-right text-xs sm:text-sm text-muted-foreground flex-shrink-0">
            <div>
              Section {sectionNumber + 1}/{totalSections}
            </div>
            <div>
              Time: {Math.floor(timeSpent / 60)}:
              {(timeSpent % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6  space-y-4">
        {/* Main Content */}
        <div className="prose dark:prose-invert max-w-none">
          <div className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>

        {/* Examples Section */}
        {examples && examples.length > 0 && (
          <ExampleList
            examples={examples}
            sectionType={type}
            onPlayAudio={onPlayAudio}
          />
        )}

        {/* Exercises Section (Practice) */}
        {exercises && exercises.length > 0 && (
          <div className="mt-6">
            <ExerciseQuiz
              exercises={exercises}
              onComplete={onExerciseComplete || (() => {})}
              onFinish={onExerciseFinish}
              onTrackWrongAnswer={onTrackWrongAnswer}
            />
          </div>
        )}

        {/* Review Section Performance Summary */}
        {type === "review" && (
          <div className="mt-6">
            {wrongAnswers &&
              totalExercises !== undefined &&
              correctAnswers !== undefined && (
                <LessonReview
                  totalExercises={totalExercises}
                  correctAnswers={correctAnswers}
                  wrongAnswers={wrongAnswers}
                  score={score || 0}
                  timeSpent={timeSpent}
                  difficulty={difficulty || "medium"}
                />
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
