'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Star, Trophy, ArrowRight, RotateCcw, Home } from 'lucide-react';

interface LessonCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  score: number;
  timeSpent: number;
  xpEarned: number;
  onNextLesson?: () => void;
  onReview: () => void;
  hasNextLesson: boolean;
}

export default function LessonCompletionModal({
  isOpen,
  onClose,
  lessonTitle,
  score,
  timeSpent,
  xpEarned,
  onNextLesson,
  onReview,
  hasNextLesson
}: LessonCompletionModalProps) {

  useEffect(() => {
    if (isOpen) {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="w-full max-w-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 flex items-center justify-center shadow-lg"
              >
                <Trophy className="h-10 w-10 text-white" />
              </motion.div>
              <CardTitle className="text-green-800 dark:text-green-200 text-2xl md:text-3xl font-bold">
                🎉 Lesson Complete!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300 text-base md:text-lg mt-2">
                {lessonTitle}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-green-200 dark:border-green-700 shadow-sm"
                >
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {score}%
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300 font-medium">Score</div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-blue-200 dark:border-blue-700 shadow-sm"
                >
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {timeSpent}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">Minutes</div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center p-4 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-yellow-200 dark:border-yellow-700 shadow-sm"
                >
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1 flex items-center justify-center gap-1">
                    +{xpEarned}
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">XP</div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-3"
              >
                {hasNextLesson && onNextLesson && (
                  <Button
                    onClick={onNextLesson}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue to Next Lesson
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={onReview}
                    className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

