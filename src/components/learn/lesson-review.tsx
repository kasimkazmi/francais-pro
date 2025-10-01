'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Target, BookOpen, BarChart3, Trophy, ThumbsUp, Lightbulb } from 'lucide-react';
import { LessonReviewProps } from '@/types/component-props';

export default function LessonReview({
  totalExercises,
  correctAnswers,
  wrongAnswers,
  timeSpent,
}: LessonReviewProps) {
  const incorrectCount = wrongAnswers.length;
  const accuracy = totalExercises > 0 ? Math.round((correctAnswers / totalExercises) * 100) : 0;

  // Generate improvement tips based on performance
  const getImprovementTips = () => {
    const tips = [];

    if (accuracy < 50) {
      tips.push({
        icon: BookOpen,
        text: 'Review the learning content again - focus on understanding each concept thoroughly',
        color: 'text-blue-600 dark:text-blue-400'
      });
      tips.push({
        icon: Target,
        text: 'Practice more slowly - take your time to read each question carefully',
        color: 'text-purple-600 dark:text-purple-400'
      });
    } else if (accuracy < 80) {
      tips.push({
        icon: TrendingUp,
        text: 'You\'re making good progress! Review the questions you missed below',
        color: 'text-green-600 dark:text-green-400'
      });
      tips.push({
        icon: Target,
        text: 'Focus on the specific areas where you made mistakes',
        color: 'text-orange-600 dark:text-orange-400'
      });
    } else {
      tips.push({
        icon: CheckCircle,
        text: 'Excellent work! You have a strong understanding of this lesson',
        color: 'text-green-600 dark:text-green-400'
      });
      tips.push({
        icon: TrendingUp,
        text: 'Keep up the great work and continue to the next lesson',
        color: 'text-blue-600 dark:text-blue-400'
      });
    }

    // Add pronunciation tip if there were pronunciation exercises
    if (wrongAnswers.some(w => w.type === 'pronunciation')) {
      tips.push({
        icon: AlertCircle,
        text: 'Use the audio buttons (🔊) to hear correct pronunciations',
        color: 'text-purple-600 dark:text-purple-400'
      });
    }

    return tips;
  };

  const improvementTips = getImprovementTips();

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <Card className="border-l-4 border-r-4 border-l-blue-500 border-r-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Your Performance
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{incorrectCount}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-foreground">{timeSpent}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incorrect Answers */}
      {incorrectCount > 0 && (
        <Card className="border-l-4 border-r-4 border-l-orange-500 border-r-orange-500 bg-orange-50/50 dark:bg-orange-950/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              Questions to Review ({incorrectCount})
            </h3>
            <div className="space-y-4">
              {wrongAnswers.map((result, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg border-2 border-orange-200 dark:border-orange-900"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-base mb-2">{result.question}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-red-600 dark:text-red-400">Your answer:</span>
                          <span className="font-medium">{result.userAnswer || 'Not answered'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 dark:text-green-400">Correct answer:</span>
                          <span className="font-medium">{result.correctAnswer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Improvement Tips */}
      <Card className="border-l-4 border-r-4 border-l-purple-500 border-r-purple-500 bg-purple-50/50 dark:bg-purple-950/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            Tips to Improve
          </h3>
          <div className="space-y-3">
            {improvementTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${tip.color}`} />
                  <p className="text-sm sm:text-base text-foreground">{tip.text}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Badge */}
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className={`text-lg px-6 py-3 flex items-center gap-2 ${
            accuracy >= 90
              ? 'border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950'
              : accuracy >= 70
              ? 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
              : accuracy >= 50
              ? 'border-yellow-500 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950'
              : 'border-red-500 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950'
          }`}
        >
          {accuracy >= 90 ? (
            <>
              <Trophy className="h-5 w-5" />
              Excellent!
            </>
          ) : accuracy >= 70 ? (
            <>
              <ThumbsUp className="h-5 w-5" />
              Good Job!
            </>
          ) : accuracy >= 50 ? (
            <>
              <BookOpen className="h-5 w-5" />
              Keep Practicing!
            </>
          ) : (
            <>
              <Target className="h-5 w-5" />
              Try Again!
            </>
          )}
        </Badge>
      </div>
    </div>
  );
}

