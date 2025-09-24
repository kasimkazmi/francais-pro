'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Clock,
  Target
} from 'lucide-react';
import { InteractiveLesson, LessonStep, ActivityContent } from '@/types/learning-types';

interface InteractiveLessonProps {
  lesson: InteractiveLesson;
  onComplete: (xpEarned: number) => void;
  onStepComplete: (stepId: string) => void;
}

export function InteractiveLessonComponent({ lesson, onComplete, onStepComplete }: InteractiveLessonProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepProgress, setStepProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentActivity, setCurrentActivity] = useState<ActivityContent | null>(null);
  const [showActivity, setShowActivity] = useState(false);

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;
  const progress = ((currentStepIndex + 1) / lesson.steps.length) * 100;

  useEffect(() => {
    if (currentStep?.interactive) {
      setShowActivity(true);
      // Find the first activity for this step
      const stepActivity = lesson.activities.find(activity => 
        activity.id.includes(currentStep.id.split('-')[1])
      );
      if (stepActivity) {
        setCurrentActivity(stepActivity);
      }
    } else {
      setShowActivity(false);
      setCurrentActivity(null);
    }
  }, [currentStep, lesson.activities]);

  const handleStepComplete = () => {
    if (currentStep) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
      onStepComplete(currentStep.id);
      
      if (isLastStep) {
        // Calculate total XP earned
        const totalXP = lesson.activities.reduce((sum, activity) => sum + activity.xpReward, 0);
        onComplete(totalXP);
      } else {
        setCurrentStepIndex(prev => prev + 1);
        setStepProgress(0);
      }
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleStepComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
      setStepProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setStepProgress(0);
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Audio implementation would go here
  };

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case 'introduction': return <Target className="h-5 w-5" />;
      case 'learning': return <Play className="h-5 w-5" />;
      case 'practice': return <CheckCircle className="h-5 w-5" />;
      case 'assessment': return <Star className="h-5 w-5" />;
      default: return <Play className="h-5 w-5" />;
    }
  };

  const getStepColor = (stepType: string) => {
    switch (stepType) {
      case 'introduction': return 'bg-blue-100 text-blue-800';
      case 'learning': return 'bg-green-100 text-green-800';
      case 'practice': return 'bg-yellow-100 text-yellow-800';
      case 'assessment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{lesson.title}</CardTitle>
              <CardDescription className="mt-2">{lesson.description}</CardDescription>
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

      {/* Step Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStepIcon(currentStep?.type || '')}
              <span className="font-semibold">
                Step {currentStepIndex + 1} of {lesson.steps.length}
              </span>
              <Badge className={getStepColor(currentStep?.type || '')}>
                {currentStep?.type?.charAt(0).toUpperCase() + currentStep?.type?.slice(1)}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!currentStep}
              >
                {isLastStep ? 'Complete Lesson' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Step Content */}
      {currentStep && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStepIcon(currentStep.type)}
              <span>{currentStep.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step Content */}
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{currentStep.content}</p>
            </div>

            {/* Media Content */}
            {currentStep.media && (
              <div className="flex justify-center">
                {currentStep.media.type === 'audio' && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleAudio}
                    className="flex items-center space-x-2"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    <span>{isPlaying ? 'Pause Audio' : 'Play Audio'}</span>
                  </Button>
                )}
                {currentStep.media.type === 'image' && (
                  <img
                    src={currentStep.media.url}
                    alt={currentStep.media.alt}
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            )}

            {/* Interactive Activity */}
            {showActivity && currentActivity && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Interactive Activity</h4>
                <ActivityRenderer
                  activity={currentActivity}
                  onComplete={(correct) => {
                    if (correct) {
                      setStepProgress(100);
                      handleStepComplete();
                    }
                  }}
                />
              </div>
            )}

            {/* Step Progress */}
            {currentStep.interactive && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Step Progress</span>
                  <span>{stepProgress}%</span>
                </div>
                <Progress value={stepProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lesson Steps Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lesson.steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  index === currentStepIndex
                    ? 'border-blue-500 bg-blue-50'
                    : completedSteps.includes(step.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {getStepIcon(step.type)}
                  <span className="font-medium text-sm">
                    Step {index + 1}
                  </span>
                  {completedSteps.includes(step.id) && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
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

// Activity Renderer Component
interface ActivityRendererProps {
  activity: ActivityContent;
  onComplete: (correct: boolean) => void;
}

function ActivityRenderer({ activity, onComplete }: ActivityRendererProps) {
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
            <p className="font-medium">{activity.question}</p>
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
            <p className="font-medium">{activity.question}</p>
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Type your answer here..."
            />
          </div>
        );

      case 'flashcard':
        return (
          <div className="space-y-3">
            <p className="font-medium">{activity.question}</p>
            <input
              type="text"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Type your answer here..."
            />
          </div>
        );

      default:
        return <p>Activity type not supported yet</p>;
    }
  };

  return (
    <div className="space-y-4">
      {renderActivity()}
      
      {activity.audioUrl && (
        <Button variant="outline" size="sm">
          <Volume2 className="h-4 w-4 mr-2" />
          Play Audio
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
          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
