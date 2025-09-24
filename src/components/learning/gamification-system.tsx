'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Flame, 
  Trophy, 
  Target, 
  Award,
  Zap,
  Crown,
  Gem,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { LearningProgress, Achievement } from '@/types/learning-types';

interface GamificationSystemProps {
  progress: LearningProgress;
  onXPUpdate: (xp: number) => void;
  onStreakUpdate: (streak: number) => void;
  onAchievementUnlock: (achievement: Achievement) => void;
}

export function GamificationSystem({ 
  progress, 
  onXPUpdate, 
  onStreakUpdate, 
  onAchievementUnlock 
}: GamificationSystemProps) {
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

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

  // XP Animation
  const animateXP = (xpEarned: number) => {
    setShowXPAnimation(true);
    setTimeout(() => setShowXPAnimation(false), 2000);
  };

  // Streak Animation
  const animateStreak = () => {
    setShowStreakAnimation(true);
    setTimeout(() => setShowStreakAnimation(false), 2000);
  };

  // Achievement Animation
  const animateAchievement = (achievement: Achievement) => {
    setRecentAchievement(achievement);
    setTimeout(() => setRecentAchievement(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* XP and Level Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-6 w-6 text-yellow-500" />
            <span>Level {currentLevel}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Level Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{xpForNextLevel} XP needed</span>
              </div>
              <Progress value={levelProgress} className="h-3" />
            </div>

            {/* Total XP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Total XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">
                  {progress.totalXP.toLocaleString()}
                </span>
                {showXPAnimation && (
                  <div className="animate-bounce text-green-500">
                    +50 XP
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streak Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <span>Learning Streak</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Streak */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">Current Streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-orange-600">
                  {progress.currentStreak}
                </span>
                {showStreakAnimation && (
                  <div className="animate-pulse text-orange-500">
                    🔥
                  </div>
                )}
              </div>
            </div>

            {/* Longest Streak */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Longest Streak</span>
              </div>
              <span className="text-xl font-bold text-yellow-600">
                {progress.longestStreak}
              </span>
            </div>

            {/* Daily Goal Progress */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Daily Goal</span>
                <span>{progress.dailyGoal} XP</span>
              </div>
              <Progress 
                value={(progress.totalXP % 1000) / progress.dailyGoal * 100} 
                className="h-2" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-purple-500" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {progress.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="text-xs">
                      +{achievement.xpReward} XP
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <span>Skill Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(progress.skillLevels).map(([skill, level]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{skill}</span>
                  <Badge variant="outline">Level {level}</Badge>
                </div>
                <Progress value={level * 20} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievement Popup */}
      {recentAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <Card className="border-yellow-500 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{recentAchievement.icon}</div>
                <div>
                  <h4 className="font-bold text-yellow-800">
                    Achievement Unlocked!
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {recentAchievement.title}
                  </p>
                  <p className="text-xs text-yellow-600">
                    +{recentAchievement.xpReward} XP
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// XP Gainer Component
interface XPGainerProps {
  xpEarned: number;
  onAnimationComplete: () => void;
}

export function XPGainer({ xpEarned, onAnimationComplete }: XPGainerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onAnimationComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  if (!visible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5" />
          <span className="font-bold text-lg">+{xpEarned} XP</span>
        </div>
      </div>
    </div>
  );
}

// Streak Maintainer Component
interface StreakMaintainerProps {
  currentStreak: number;
  onStreakUpdate: (streak: number) => void;
}

export function StreakMaintainer({ currentStreak, onStreakUpdate }: StreakMaintainerProps) {
  const [lastActiveDate, setLastActiveDate] = useState<Date>(new Date());

  useEffect(() => {
    const today = new Date();
    const lastActive = new Date(lastActiveDate);
    const daysDifference = Math.floor(
      (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference === 1) {
      // Consecutive day - increment streak
      onStreakUpdate(currentStreak + 1);
    } else if (daysDifference > 1) {
      // More than 1 day gap - reset streak
      onStreakUpdate(1);
    }

    setLastActiveDate(today);
  }, [currentStreak, lastActiveDate, onStreakUpdate]);

  return (
    <div className="flex items-center space-x-2">
      <Flame className="h-5 w-5 text-orange-500" />
      <span className="font-semibold">{currentStreak} day streak</span>
      {currentStreak >= 7 && (
        <Crown className="h-4 w-4 text-yellow-500" />
      )}
    </div>
  );
}
