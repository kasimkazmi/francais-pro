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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card className="border border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.totalLessonsCompleted}</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </CardContent>
          </Card>
          <Card className="border border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.averageProgress}%</div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </CardContent>
          </Card>
          <Card className="border border-border bg-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{stats.topStreak}</div>
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
            <div className="space-y-3 sm:space-y-4">
              {displayData.map((entry, index) => {
                const rank = index + 1;
                const isCurrentUser = isAuthenticated && user?.uid === entry.uid;
                
                return (
                  <div
                    key={entry.uid}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 ${
                      isCurrentUser 
                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-400 dark:border-blue-500 shadow-lg' 
                        : 'border-border hover:bg-muted/30 hover:shadow-md hover:border-primary/30'
                    }`}
                  >
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted flex-shrink-0">
                            {getRankIcon(rank)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-base truncate">{entry.displayName}</span>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {isCurrentUser && (
                                  <Badge variant="default" className="text-xs bg-blue-500 text-white px-2 py-0.5">
                                    You
                                  </Badge>
                                )}
                                {rank <= 3 && (
                                  <Badge variant={getRankBadgeVariant(rank)} className="text-xs">
                                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          {isModuleView ? (
                            <div className="text-lg font-bold text-primary">{'progress' in entry ? `${entry.progress}%` : '0%'}</div>
                          ) : (
                            <div className="text-lg font-bold text-primary">{'overallProgress' in entry ? `${entry.overallProgress}%` : '0%'}</div>
                          )}
                        </div>
                      </div>
                      
                      {/* Stats Column Layout */}
                      <div className="flex flex-col gap-2 mb-3">
                        {isModuleView ? (
                          <>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Lessons</span>
                              </div>
                              <div className="text-sm font-bold">{'lessonsCompleted' in entry ? entry.lessonsCompleted : 0}</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Progress</span>
                              </div>
                              <div className="text-sm font-bold">{'progress' in entry ? `${entry.progress}%` : '0%'}</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Lessons</span>
                              </div>
                              <div className="text-sm font-bold">{'totalLessonsCompleted' in entry ? entry.totalLessonsCompleted : 0}</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Streak</span>
                              </div>
                              <div className="text-sm font-bold">{'currentStreak' in entry ? entry.currentStreak : 0} days</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Time</span>
                              </div>
                              <div className="text-sm font-bold">{'totalTimeSpent' in entry ? Math.round(entry.totalTimeSpent) : 0} min</div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Level</span>
                              </div>
                              <div className="text-sm font-bold">{'level' in entry ? entry.level : 'beginner'}</div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Progress Bar */}
                      {isModuleView ? (
                        <Progress value={'progress' in entry ? entry.progress : 0} className="w-full h-2" />
                      ) : (
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">
                            Level: {'level' in entry ? entry.level : 'beginner'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {getRankIcon(rank)}
                      </div>
                      
                      <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-lg">{entry.displayName}</span>
                            {isCurrentUser && (
                              <Badge variant="default" className="text-xs bg-blue-500 text-white">
                                You
                              </Badge>
                            )}
                          {rank <= 3 && (
                            <Badge variant={getRankBadgeVariant(rank)} className="text-xs">
                              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                            </Badge>
                          )}
                        </div>
                        
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          {isModuleView ? (
                            <>
                              <div className="flex items-center gap-1">
                                  <BookOpen className="h-4 w-4" />
                                  {'lessonsCompleted' in entry ? `${entry.lessonsCompleted}/${entry.totalLessons}` : '0/0'} lessons
                              </div>
                              <div className="flex items-center gap-1">
                                  <Target className="h-4 w-4" />
                                  {'progress' in entry ? `${entry.progress}%` : '0%'} complete
                              </div>
                                {'completed' in entry && entry.completed && (
                                <Badge variant="default" className="text-xs">
                                  Completed
                                </Badge>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-1">
                                  <BookOpen className="h-4 w-4" />
                                  {'totalLessonsCompleted' in entry ? entry.totalLessonsCompleted : 0} lessons
                              </div>
                              <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  {'currentStreak' in entry ? entry.currentStreak : 0} day streak
                              </div>
                              <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {'totalTimeSpent' in entry ? Math.round(entry.totalTimeSpent) : 0} min
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isModuleView ? (
                          <div className="space-y-2">
                            <div className="text-xl font-bold">{'progress' in entry ? `${entry.progress}%` : '0%'}</div>
                            <Progress value={'progress' in entry ? entry.progress : 0} className="w-24 h-2" />
                        </div>
                      ) : (
                        <div className="space-y-1">
                            <div className="text-xl font-bold">{'overallProgress' in entry ? `${entry.overallProgress}%` : '0%'}</div>
                            <div className="text-sm text-muted-foreground">
                              Level: {'level' in entry ? entry.level : 'beginner'}
                            </div>
                          </div>
                        )}
                        </div>
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
