'use client';

import { useState, useEffect } from 'react';
import { getAppStats } from '@/lib/firebase/stats';

interface StatsData {
  activeUsers: number;
  totalUsers: number;
  lessonsCompleted: number;
  countries: number;
  completionRate: number;
}

export function DynamicStats() {
  const [stats, setStats] = useState<StatsData>({
    activeUsers: 0,
    totalUsers: 0,
    lessonsCompleted: 0,
    countries: 0,
    completionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check if Firebase is properly configured
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        };
        
        if (!firebaseConfig.apiKey || !firebaseConfig.projectId || 
            firebaseConfig.apiKey === 'your_api_key_here' || 
            firebaseConfig.projectId === 'your_project_id') {
          console.warn('Firebase not configured - using fallback stats');
          throw new Error('Firebase not configured');
        }
        
        const appStats = await getAppStats();
        setStats({
          activeUsers: appStats.activeUsers,
          totalUsers: appStats.totalUsers,
          lessonsCompleted: appStats.lessonsCompleted,
          countries: appStats.countries,
          completionRate: appStats.completionRate
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to reasonable defaults if there's an error or Firebase not configured
        setStats({
          activeUsers: 0,
          totalUsers: 0,
          lessonsCompleted: 0,
          countries: 0,
          completionRate: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K+`;
    }
    if (num >= 100) {
      return `${num}+`;
    }
    return num.toString();
  };

  // If we don't have real data yet, show encouraging messages
  const getDisplayStats = () => {
    if (isLoading) {
      return [
        { number: "Loading...", label: "Active Learners" },
        { number: "Loading...", label: "Lessons Completed" },
        { number: "Loading...", label: "Countries" },
        { number: "Loading...", label: "Completion Rate" }
      ];
    }

    // If we have real data, show it
    if (stats.activeUsers > 0 || stats.lessonsCompleted > 0) {
      return [
        { 
          number: formatNumber(stats.activeUsers), 
          label: "Active Learners" 
        },
        { 
          number: stats.lessonsCompleted.toString(), 
          label: "Lessons Completed" 
        },
        { 
          number: stats.countries.toString(), 
          label: "Countries" 
        },
        { 
          number: `${stats.completionRate}%`, 
          label: "Completion Rate" 
        }
      ];
    }

    // If no real data yet, show encouraging messages
    return [
      { number: "Growing", label: "Community" },
      { number: "500+", label: "Available Lessons" },
      { number: "Global", label: "Reach" },
      { number: "100%", label: "Free Access" }
    ];
  };

  const statsDisplay = getDisplayStats();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
      {statsDisplay.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {stat.number}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
