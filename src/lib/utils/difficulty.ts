/**
 * Difficulty utility functions for lessons
 */

import { DifficultyLevel, DifficultyConfig } from '@/types/lesson-types';

export const difficultyConfig: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    label: 'Easy',
    color: 'green',
    badgeClass: 'border-green-500 text-green-700 dark:text-green-400',
    dotClass: 'bg-green-500',
    icon: '●'
  },
  medium: {
    label: 'Medium',
    color: 'yellow',
    badgeClass: 'border-yellow-500 text-yellow-700 dark:text-yellow-400',
    dotClass: 'bg-yellow-500',
    icon: '●●'
  },
  hard: {
    label: 'Hard',
    color: 'red',
    badgeClass: 'border-red-500 text-red-700 dark:text-red-400',
    dotClass: 'bg-red-500',
    icon: '●●●'
  }
};

/**
 * Get difficulty configuration for a given level
 */
export function getDifficultyConfig(difficulty: DifficultyLevel): DifficultyConfig {
  return difficultyConfig[difficulty];
}

/**
 * Get badge class for difficulty level
 */
export function getDifficultyBadgeClass(difficulty: DifficultyLevel): string {
  return difficultyConfig[difficulty].badgeClass;
}

/**
 * Get dot class for difficulty indicator
 */
export function getDifficultyDotClass(difficulty: DifficultyLevel): string {
  return difficultyConfig[difficulty].dotClass;
}

/**
 * Calculate XP reward based on difficulty and duration
 */
export function calculateXPReward(difficulty: DifficultyLevel, duration: number): number {
  const baseXP = {
    easy: 3,
    medium: 5,
    hard: 7
  };
  
  return Math.round(baseXP[difficulty] * duration);
}

/**
 * Get difficulty emoji/icon
 */
export function getDifficultyIcon(difficulty: DifficultyLevel): string {
  return difficultyConfig[difficulty].icon;
}

