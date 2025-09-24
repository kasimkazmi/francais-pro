'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  Play
} from 'lucide-react';
import { InteractiveLesson } from '@/types/learning-types';
import { MinimalistLessonStep } from './minimalist-lesson-step';

interface DetailedLessonViewerProps {
  lesson: InteractiveLesson;
  onComplete: (xpEarned: number) => void;
}

export function DetailedLessonViewer({ lesson, onComplete }: DetailedLessonViewerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const progress = ((currentStepIndex + 1) / lesson.steps.length) * 100;

  const handleStepComplete = () => {
    if (currentStep) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      // Calculate total XP earned
      const totalXP = lesson.activities.reduce((sum, activity) => sum + activity.xpReward, 0);
      onComplete(totalXP);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Lesson Header */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-blue-500" />
                <span>{lesson.title}</span>
              </CardTitle>
              <p className="text-gray-600 mt-2">{lesson.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{lesson.estimatedTime} min</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>{lesson.xpReward} XP</span>
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Current Step */}
      {currentStep && (
        <MinimalistLessonStep
          step={currentStep}
          stepIndex={currentStepIndex}
          totalSteps={lesson.steps.length}
          onComplete={handleStepComplete}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstStep={currentStepIndex === 0}
          isLastStep={isLastStep}
        />
      )}

      {/* Lesson Steps Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Lesson Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lesson.steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all ${
                  index === currentStepIndex
                    ? 'border-blue-500 bg-blue-50'
                    : completedSteps.includes(step.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-1 rounded ${
                    index === currentStepIndex
                      ? 'bg-blue-500 text-white'
                      : completedSteps.includes(step.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </div>
                  <span className="font-medium text-sm">
                    Step {index + 1}
                  </span>
                </div>
                <h4 className="font-semibold text-sm">{step.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{step.duration}s</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
