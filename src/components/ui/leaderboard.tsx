'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award, Crown, Star, Clock, BookOpen, Target } from "lucide-react";
import { getPublicOverallLeaderboard, getPublicModuleLeaderboard, getPublicLeaderboardStats, type PublicLeaderboardEntry, type ModuleLeaderboard } from '@/lib/firebase/leaderboard-public';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardProps {
  moduleId?: string;
  showStats?: boolean;
  limit?: number;
}

export function Leaderboard({ moduleId, showStats = true, limit = 10 }: LeaderboardProps) {
  const { user, isAuthenticated } = useAuth();
  const [overallData, setOverallData] = useState<PublicLeaderboardEntry[]>([]);
  const [moduleData, setModuleData] = useState<ModuleLeaderboard | null>(null);
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalLessonsCompleted: number;
    averageProgress: number;
    topStreak: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeaderboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [overall, module, statsData] = await Promise.all([
        getPublicOverallLeaderboard(limit),
        moduleId ? getPublicModuleLeaderboard(moduleId, limit) : null,
        showStats ? getPublicLeaderboardStats() : null
      ]);

      setOverallData(overall);
      setModuleData(module);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  }, [moduleId, limit, showStats]);

  useEffect(() => {
    loadLeaderboardData();
  }, [loadLeaderboardData]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {moduleId ? `${moduleData?.moduleName || 'Module'} Leaderboard` : 'Overall Leaderboard'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={loadLeaderboardData} variant="outline">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayData = moduleId ? moduleData?.rankings || [] : overallData;
  const isModuleView = !!moduleId;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {showStats && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalLessonsCompleted}</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.averageProgress}%</div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.topStreak}</div>
              <div className="text-sm text-muted-foreground">Top Streak</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {isModuleView ? `${moduleData?.moduleName} Leaderboard` : 'Overall Leaderboard'}
          </CardTitle>
          <CardDescription>
            {isModuleView 
              ? `Top performers in ${moduleData?.moduleName} module`
              : 'Top learners by total progress'
            }
            {!isAuthenticated ? (
              <span className="block mt-1 text-xs text-muted-foreground">
                Sign in to see your personal ranking and compete with others!
              </span>
            ) : (
              <span className="block mt-1 text-xs text-green-600 dark:text-green-400">
                You&apos;re logged in! Your ranking will be highlighted below.
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {displayData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No data available yet. Be the first to complete some lessons!
            </div>
          ) : (
            <div className="space-y-3">
              {displayData.map((entry, index) => {
                const rank = index + 1;
                const isCurrentUser = isAuthenticated && user?.uid === entry.uid;
                
                return (
                  <div
                    key={entry.uid}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-300 dark:border-blue-600 shadow-md' 
                        : 'hover:bg-muted/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(rank)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {entry.displayName}
                            {isCurrentUser && (
                              <Badge variant="default" className="ml-2 text-xs bg-blue-500 text-white">
                                You
                              </Badge>
                            )}
                          </span>
                          {rank <= 3 && (
                            <Badge variant={getRankBadgeVariant(rank)} className="text-xs">
                              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          {isModuleView ? (
                            <>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {entry.lessonsCompleted}/{entry.totalLessons} lessons
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-3 w-3" />
                                {entry.progress}% complete
                              </div>
                              {entry.completed && (
                                <Badge variant="default" className="text-xs">
                                  Completed
                                </Badge>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {entry.totalLessonsCompleted} lessons
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {entry.currentStreak} day streak
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {Math.round(entry.totalTimeSpent)} min
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isModuleView ? (
                        <div className="space-y-1">
                          <div className="text-lg font-bold">{entry.progress}%</div>
                          <Progress value={entry.progress} className="w-20 h-2" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-lg font-bold">{entry.overallProgress}%</div>
                          <div className="text-xs text-muted-foreground">
                            Level: {entry.level}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
