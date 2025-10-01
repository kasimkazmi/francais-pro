'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Volume2, Lightbulb } from 'lucide-react';

interface MultipleChoiceExerciseProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
  onPlayAudio?: (text: string) => void;
  exerciseNumber: number;
}

export default function MultipleChoiceExercise({
  question,
  options,
  correctAnswer,
  explanation,
  onAnswer,
  onPlayAudio,
  exerciseNumber
}: MultipleChoiceExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedOption(optionIndex);
    setHasAnswered(true);
    setShowExplanation(true);
    
    const isCorrect = optionIndex === correctAnswer;
    onAnswer(isCorrect);
  };

  const isCorrect = selectedOption === correctAnswer;

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardContent className="p-4 sm:p-6 space-y-4">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-3">
          <h5 className="font-semibold text-base sm:text-lg flex-1">
            <span className="text-primary mr-2">Q{exerciseNumber}.</span>
            {question}
          </h5>
          {onPlayAudio && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlayAudio(question)}
              className="p-2 hover:bg-primary/10 flex-shrink-0"
            >
              <Volume2 className="h-4 w-4 text-primary" />
            </Button>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectOption = index === correctAnswer;
            const showAsCorrect = hasAnswered && isCorrectOption;
            const showAsWrong = hasAnswered && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={hasAnswered}
                whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                className={`
                  w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                  ${!hasAnswered 
                    ? 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer' 
                    : showAsCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                    : showAsWrong
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                    : 'border-border opacity-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${!hasAnswered
                      ? 'border-gray-400 dark:border-gray-500'
                      : showAsCorrect
                      ? 'border-green-500 bg-green-500'
                      : showAsWrong
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                    }
                  `}>
                    {showAsCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                    {showAsWrong && <XCircle className="w-4 h-4 text-white" />}
                    {!hasAnswered && <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{String.fromCharCode(65 + index)}</span>}
                  </div>
                  <span className={`flex-1 text-sm sm:text-base ${
                    showAsCorrect ? 'text-green-700 dark:text-green-300 font-medium' :
                    showAsWrong ? 'text-red-700 dark:text-red-300' :
                    'text-foreground'
                  }`}>
                    {option}
                  </span>
                  {onPlayAudio && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAudio(option);
                      }}
                      className="p-2 hover:bg-primary/10 flex-shrink-0"
                    >
                      <Volume2 className="h-4 w-4 text-primary" />
                    </Button>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-lg ${
              isCorrect 
                ? 'bg-green-100 dark:bg-green-950/50 border border-green-300 dark:border-green-700' 
                : 'bg-blue-100 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-700'
            }`}
          >
            <div className="flex items-start gap-2">
              <Lightbulb className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                isCorrect ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
              }`} />
              <div>
                <p className={`font-medium text-sm mb-1 ${
                  isCorrect ? 'text-green-800 dark:text-green-200' : 'text-blue-800 dark:text-blue-200'
                }`}>
                  {isCorrect ? '✓ Correct!' : 'ℹ️ Learning Point'}
                </p>
                <p className={`text-sm ${
                  isCorrect ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'
                }`}>
                  {explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

