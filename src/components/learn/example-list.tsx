'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ExampleListProps } from '@/types/component-props';

export default function ExampleList({ examples, sectionType, onPlayAudio }: ExampleListProps) {
  // Get border colors based on section type
  const getBorderClasses = () => {
    switch (sectionType) {
      case 'introduction':
        return 'border-blue-200 dark:border-blue-900 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-950/30';
      case 'learning':
        return 'border-purple-200 dark:border-purple-900 hover:border-purple-400 dark:hover:border-purple-700 hover:bg-purple-50/30 dark:hover:bg-purple-950/30';
      case 'practice':
        return 'border-green-200 dark:border-green-900 hover:border-green-400 dark:hover:border-green-700 hover:bg-green-50/30 dark:hover:bg-green-950/30';
      case 'review':
        return 'border-orange-200 dark:border-orange-900 hover:border-orange-400 dark:hover:border-orange-700 hover:bg-orange-50/30 dark:hover:bg-orange-950/30';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="space-y-2 sm:space-y-3">
        {examples.map((example, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 border-2 rounded-lg transition-all hover:scale-[1.02] ${getBorderClasses()}`}
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-base sm:text-lg mb-1 break-words">
                {example.french}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground mb-1 break-words">
                {example.english}
              </div>
              {example.pronunciation && (
                <div className="text-xs sm:text-sm text-muted-foreground italic">
                  [{example.pronunciation}]
                </div>
              )}
              {example.description && (
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {example.description}
                </div>
              )}
            </div>
            {onPlayAudio && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPlayAudio(`${example.french}, ${example.english}`)}
                className="p-2 sm:p-3 hover:bg-primary/10 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 self-start sm:self-center"
                title="Listen to pronunciation"
              >
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

