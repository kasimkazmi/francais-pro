'use client';

import React from 'react';
import MultipleChoiceExercise from './multiple-choice-exercise';
import FillBlankExercise from './fill-blank-exercise';

interface BaseExercise {
  type: string;
  question: string;
  explanation?: string;
}

interface MultipleChoiceExerciseData extends BaseExercise {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number;
}

interface FillBlankExerciseData extends BaseExercise {
  type: 'fill-blank';
  sentence: string;
  correctAnswer: string;
  alternatives?: string[];
}

type ExerciseData = MultipleChoiceExerciseData | FillBlankExerciseData;

interface ExerciseRendererProps {
  exercise: ExerciseData;
  exerciseNumber: number;
  onAnswer: (isCorrect: boolean) => void;
  onPlayAudio?: (text: string) => void;
}

export default function ExerciseRenderer({
  exercise,
  exerciseNumber,
  onAnswer,
  onPlayAudio
}: ExerciseRendererProps) {
  
  if (exercise.type === 'multiple-choice') {
    const mcExercise = exercise as MultipleChoiceExerciseData;
    return (
      <MultipleChoiceExercise
        question={mcExercise.question}
        options={mcExercise.options}
        correctAnswer={mcExercise.correctAnswer}
        explanation={mcExercise.explanation}
        onAnswer={onAnswer}
        onPlayAudio={onPlayAudio}
        exerciseNumber={exerciseNumber}
      />
    );
  }

  if (exercise.type === 'fill-blank') {
    const fbExercise = exercise as FillBlankExerciseData;
    return (
      <FillBlankExercise
        question={fbExercise.question}
        sentence={fbExercise.sentence}
        blankPosition={0}
        correctAnswer={fbExercise.correctAnswer}
        alternatives={fbExercise.alternatives}
        explanation={fbExercise.explanation}
        onAnswer={onAnswer}
        onPlayAudio={onPlayAudio}
        exerciseNumber={exerciseNumber}
      />
    );
  }

  return null;
}

export type { ExerciseData };

