'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Volume2, Lightbulb, Check } from 'lucide-react';

interface FillBlankExerciseProps {
  question: string;
  sentence: string;
  blankPosition: number;
  correctAnswer: string;
  alternatives?: string[];
  explanation?: string;
  onAnswer: (isCorrect: boolean) => void;
  onPlayAudio?: (text: string) => void;
  exerciseNumber: number;
}

export default function FillBlankExercise({
  question,
  sentence,
  blankPosition,
  correctAnswer,
  alternatives = [],
  explanation,
  onAnswer,
  onPlayAudio,
  exerciseNumber
}: FillBlankExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim() || hasAnswered) return;
    
    setHasAnswered(true);
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.toLowerCase();
    const normalizedAlternatives = alternatives.map(a => a.toLowerCase());
    
    const isCorrect = normalizedAnswer === normalizedCorrect || 
                     normalizedAlternatives.includes(normalizedAnswer);
    
    onAnswer(isCorrect);
  };

  const isCorrect = hasAnswered && (
    userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase() ||
    alternatives.some(alt => alt.toLowerCase() === userAnswer.trim().toLowerCase())
  );

  // Split sentence into parts
  const parts = sentence.split('___');

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardContent className="p-4 sm:p-6 space-y-4">
        {/* Question */}
        <div className="flex items-start justify-between gap-3">
          <h5 className="font-semibold text-base sm:text-lg flex-1">
            <span className="text-primary mr-2">Q{exerciseNumber}.</span>
            {question}
          </h5>
          {onPlayAudio && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPlayAudio(sentence.replace('___', correctAnswer))}
              className="p-2 hover:bg-primary/10 flex-shrink-0"
            >
              <Volume2 className="h-4 w-4 text-primary" />
            </Button>
          )}
        </div>

        {/* Sentence with blank */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-base sm:text-lg font-medium text-foreground flex flex-wrap items-center gap-2">
            {parts[0]}
            <Input
              value={userAnswer}
              onChange={(e) => !hasAnswered && setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={hasAnswered}
              placeholder="Type here..."
              className={`inline-flex w-32 sm:w-40 h-10 text-center font-semibold ${
                hasAnswered
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                  : 'border-2 border-dashed border-primary'
              }`}
            />
            {parts[1]}
          </p>
        </div>

        {/* Submit Button */}
        {!hasAnswered && (
          <Button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            <Check className="w-4 h-4 mr-2" />
            Check Answer
          </Button>
        )}

        {/* Feedback */}
        {hasAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? 'bg-green-100 dark:bg-green-950/50 border-green-500'
                : 'bg-red-100 dark:bg-red-950/50 border-red-500'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className={`font-semibold mb-2 ${
                  isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                }`}>
                  {isCorrect ? '✓ Excellent!' : '✗ Not quite right'}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    The correct answer is: <strong>{correctAnswer}</strong>
                    {alternatives.length > 0 && ` (also: ${alternatives.join(', ')})`}
                  </p>
                )}
                {explanation && (
                  <div className="mt-3 pt-3 border-t border-current/20">
                    <div className="flex items-start gap-2">
                      <Lightbulb className={`w-4 h-4 mt-0.5 ${
                        isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`} />
                      <p className={`text-sm ${
                        isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      }`}>
                        {explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

