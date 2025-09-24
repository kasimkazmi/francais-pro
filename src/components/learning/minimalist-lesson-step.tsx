'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Target,
  BookOpen,
  Activity,
  Star
} from 'lucide-react';
import { LessonStep, ActivityContent } from '@/types/learning-types';

interface MinimalistLessonStepProps {
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function MinimalistLessonStep({ 
  step, 
  stepIndex, 
  totalSteps, 
  onComplete, 
  onNext, 
  onPrevious,
  isFirstStep,
  isLastStep
}: MinimalistLessonStepProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case 'introduction': return <BookOpen className="h-4 w-4" />;
      case 'learning': return <Target className="h-4 w-4" />;
      case 'practice': return <Activity className="h-4 w-4" />;
      case 'assessment': return <Star className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const getStepColor = (stepType: string) => {
    switch (stepType) {
      case 'introduction': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'learning': return 'bg-green-50 text-green-700 border-green-200';
      case 'practice': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'assessment': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleStepComplete = () => {
    setStepCompleted(true);
    onComplete();
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio implementation would go here
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getStepColor(step.type)}`}>
              {getStepIcon(step.type)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{step.title}</h2>
              <p className="text-sm text-gray-600">
                Step {stepIndex + 1} of {totalSteps} • {step.duration}s
              </p>
            </div>
          </div>
          <Badge variant="outline" className={getStepColor(step.type)}>
            {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Progress value={((stepIndex + 1) / totalSteps) * 100} className="h-1" />
      </div>

      {/* Step Content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          {/* Content */}
          <div className="prose max-w-none mb-6">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: step.content.replace(/\n/g, '<br>') }}
            />
          </div>

          {/* Media Content */}
          {step.media && (
            <div className="mb-6">
              {step.media.type === 'audio' && (
                <Button
                  variant="outline"
                  onClick={toggleAudio}
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause Audio' : 'Play Audio'}</span>
                </Button>
              )}
              {step.media.type === 'image' && (
                <img
                  src={step.media.url}
                  alt={step.media.alt}
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              )}
            </div>
          )}

          {/* Interactive Elements */}
          {step.interactive && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3 text-gray-800">Interactive Activity</h4>
              <div className="text-sm text-gray-600 mb-4">
                Complete this activity to continue to the next step.
              </div>
              <Button 
                onClick={handleStepComplete}
                className="w-full"
                disabled={stepCompleted}
              >
                {stepCompleted ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-2">
              {stepCompleted && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Completed</span>
                </Badge>
              )}
            </div>

            <Button
              onClick={isLastStep ? onComplete : onNext}
              disabled={step.interactive && !stepCompleted}
              className="flex items-center space-x-2"
            >
              <span>{isLastStep ? 'Complete Lesson' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple activity renderer for interactive steps
interface SimpleActivityRendererProps {
  activity: ActivityContent;
  onComplete: (correct: boolean) => void;
}

export function SimpleActivityRenderer({ activity, onComplete }: SimpleActivityRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = selectedAnswer === activity.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    onComplete(correct);
  };

  const renderActivity = () => {
    switch (activity.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            <p className="font-medium text-gray-800">{activity.question}</p>
            <div className="grid grid-cols-1 gap-2">
              {activity.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  onClick={() => setSelectedAnswer(option)}
                  className="justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-3">
            <p className="font-medium text-gray-800">{activity.question}</p>
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your answer here..."
            />
          </div>
        );

      case 'flashcard':
        return (
          <div className="space-y-3">
            <p className="font-medium text-gray-800">{activity.question}</p>
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your answer here..."
            />
          </div>
        );

      default:
        return <p className="text-gray-600">Activity type not supported yet</p>;
    }
  };

  return (
    <div className="space-y-4">
      {renderActivity()}
      
      {activity.audioUrl && (
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4" />
          <span>Play Audio</span>
        </Button>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className="w-full"
      >
        Submit Answer
      </Button>

      {showResult && (
        <div className={`p-4 rounded-lg ${
          isCorrect ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <span className="text-red-500">✗</span>
            )}
            <span className="font-semibold">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <p className="text-sm">{activity.explanation}</p>
          {isCorrect && (
            <p className="text-sm mt-2 font-medium">
              +{activity.xpReward} XP earned!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
