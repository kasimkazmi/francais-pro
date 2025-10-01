'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, BookOpen, GraduationCap, Dumbbell, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Example {
  french: string;
  english: string;
  pronunciation?: string;
  audio?: string;
}

interface LessonSectionProps {
  title: string;
  type: 'introduction' | 'learning' | 'practice' | 'review';
  content: string;
  sectionNumber: number;
  totalSections: number;
  timeSpent: number;
  examples?: Example[];
  onPlayAudio?: (text: string) => void;
}

const sectionConfig = {
  introduction: {
    icon: BookOpen,
    emoji: '📚',
    label: 'Introduction',
    color: 'blue'
  },
  learning: {
    icon: GraduationCap,
    emoji: '🎓',
    label: 'Learning Content',
    color: 'purple'
  },
  practice: {
    icon: Dumbbell,
    emoji: '💪',
    label: 'Practice Exercises',
    color: 'green'
  },
  review: {
    icon: FileCheck,
    emoji: '📝',
    label: 'Review & Summary',
    color: 'orange'
  }
};

export default function LessonSection({
  title,
  type,
  content,
  sectionNumber,
  totalSections,
  timeSpent,
  examples,
  onPlayAudio
}: LessonSectionProps) {
  const config = sectionConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={`border-l-4 border-l-${config.color}-500`}>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl break-words flex items-center gap-2">
                <Icon className={`w-5 h-5 text-${config.color}-600 dark:text-${config.color}-400`} />
                {title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1 sm:mt-2">
                {config.emoji} {config.label}
              </CardDescription>
            </div>
            <div className="text-right text-xs sm:text-sm text-muted-foreground flex-shrink-0">
              <div>Section {sectionNumber + 1}/{totalSections}</div>
              <div>Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
          {/* Main Content */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>

          {/* Examples Section */}
          {examples && examples.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-base flex items-center gap-2">
                <span>Examples:</span>
              </h4>
              <div className="space-y-3">
                {examples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-2 border-border rounded-xl hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 group"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {example.french}
                      </div>
                      <div className="text-base text-muted-foreground">
                        {example.english}
                      </div>
                      {example.pronunciation && (
                        <div className="text-sm text-muted-foreground italic">
                          [{example.pronunciation}]
                        </div>
                      )}
                    </div>
                    {onPlayAudio && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPlayAudio(`${example.french}. ${example.english}`)}
                        className="p-3 hover:bg-primary/10 transition-all duration-200 hover:scale-110 active:scale-95 self-start sm:self-center"
                      >
                        <Volume2 className="h-5 w-5 text-primary" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

