'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Flame, 
  Trophy, 
  Target,
  Zap,
  Crown
} from 'lucide-react';
import { LearningProgress } from '@/types/learning-types';

interface MinimalistGamificationProps {
  progress: LearningProgress;
  compact?: boolean;
}

export function MinimalistGamification({ progress, compact = false }: MinimalistGamificationProps) {
  // Calculate level from XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate XP needed for next level
  const getXPForNextLevel = (currentXP: number) => {
    const currentLevel = calculateLevel(currentXP);
    const nextLevelXP = currentLevel * 1000;
    return nextLevelXP - currentXP;
  };

  // Calculate level progress percentage
  const getLevelProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const currentLevelXP = (currentLevel - 1) * 1000;
    const nextLevelXP = currentLevel * 1000;
    const progressXP = xp - currentLevelXP;
    const totalXPNeeded = nextLevelXP - currentLevelXP;
    return (progressXP / totalXPNeeded) * 100;
  };

  const currentLevel = calculateLevel(progress.totalXP);
  const xpForNextLevel = getXPForNextLevel(progress.totalXP);
  const levelProgress = getLevelProgress(progress.totalXP);

  if (compact) {
    return (
      <div className="flex items-center space-x-4 text-sm">
        {/* Level */}
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{currentLevel}</span>
        </div>

        {/* XP */}
        <div className="flex items-center space-x-1">
          <Zap className="h-4 w-4 text-blue-500" />
          <span>{progress.totalXP.toLocaleString()}</span>
        </div>

        {/* Streak */}
        <div className="flex items-center space-x-1">
          <Flame className="h-4 w-4 text-orange-500" />
          <span>{progress.currentStreak}</span>
        </div>

        {/* Achievements */}
        <div className="flex items-center space-x-1">
          <Trophy className="h-4 w-4 text-purple-500" />
          <span>{progress.achievements.filter(a => a.unlocked).length}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Level Progress */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Level {currentLevel}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {xpForNextLevel} XP to next
            </Badge>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total XP */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <Zap className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-semibold">{progress.totalXP.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total XP</div>
          </CardContent>
        </Card>

        {/* Current Streak */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <Flame className="h-5 w-5 text-orange-500 mx-auto mb-1" />
            <div className="text-lg font-semibold">{progress.currentStreak}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <Trophy className="h-5 w-5 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-semibold">{progress.achievements.filter(a => a.unlocked).length}</div>
            <div className="text-xs text-gray-600">Achievements</div>
          </CardContent>
        </Card>

        {/* Longest Streak */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3 text-center">
            <Crown className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
            <div className="text-lg font-semibold">{progress.longestStreak}</div>
            <div className="text-xs text-gray-600">Best Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      {progress.achievements.filter(a => a.unlocked).length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Recent Achievements</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {progress.achievements
                .filter(a => a.unlocked)
                .slice(0, 3)
                .map((achievement) => (
                  <Badge key={achievement.id} variant="secondary" className="text-xs">
                    {achievement.icon} {achievement.title}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Compact progress indicator for headers
export function CompactProgressIndicator({ progress }: { progress: LearningProgress }) {
  const currentLevel = Math.floor(progress.totalXP / 1000) + 1;
  
  return (
    <div className="flex items-center space-x-3 text-sm">
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="font-medium">{currentLevel}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Zap className="h-4 w-4 text-blue-500" />
        <span>{progress.totalXP.toLocaleString()}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Flame className="h-4 w-4 text-orange-500" />
        <span>{progress.currentStreak}</span>
      </div>
    </div>
  );
}

// Simple level badge
export function LevelBadge({ level, xp }: { level: number; xp: number }) {
  return (
    <Badge variant="outline" className="flex items-center space-x-1">
      <Star className="h-3 w-3" />
      <span>Level {level}</span>
    </Badge>
  );
}

// Simple streak indicator
export function StreakIndicator({ streak }: { streak: number }) {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <Flame className="h-4 w-4 text-orange-500" />
      <span>{streak} day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
}
