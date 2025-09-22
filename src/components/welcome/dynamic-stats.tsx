"use client";

import { useState, useEffect } from "react";
import { getAppStats } from "@/lib/firebase/stats";
import { useSeasonalTheme } from "@/contexts/SeasonalThemeContext";

interface StatsData {
  activeUsers: number;
  totalUsers: number;
  lessonsCompleted: number;
  countries: number;
  completionRate: number;
}

export function DynamicStats() {
  const { isEnabled, themeConfig } = useSeasonalTheme();
  const [stats, setStats] = useState<StatsData>({
    activeUsers: 0,
    totalUsers: 0,
    lessonsCompleted: 0,
    countries: 0,
    completionRate: 0,
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

        if (
          !firebaseConfig.apiKey ||
          !firebaseConfig.projectId ||
          firebaseConfig.apiKey === "your_api_key_here" ||
          firebaseConfig.projectId === "your_project_id"
        ) {
          console.warn("Firebase not configured - using fallback stats");
          throw new Error("Firebase not configured");
        }

        const appStats = await getAppStats();
        setStats({
          activeUsers: appStats.activeUsers,
          totalUsers: appStats.totalUsers,
          lessonsCompleted: appStats.lessonsCompleted,
          countries: appStats.countries,
          completionRate: appStats.completionRate,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback to reasonable defaults if there's an error or Firebase not configured
        setStats({
          activeUsers: 0,
          totalUsers: 0,
          lessonsCompleted: 0,
          countries: 0,
          completionRate: 0,
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
        { number: "Loading...", label: "Completion Rate" },
      ];
    }

    // If we have real data, show it
    if (stats.activeUsers > 0 || stats.lessonsCompleted > 0) {
      return [
        {
          number: formatNumber(stats.activeUsers),
          label: "Active Learners",
        },
        {
          number: stats.lessonsCompleted.toString(),
          label: "Lessons Completed",
        },
        {
          number: stats.countries.toString(),
          label: "Countries",
        },
        // {
        //   number: `${stats.completionRate}%`,
        //   label: "Completion Rate",
        // },
        {
          number: `${stats.completionRate}%`,
          label: "Free Access  ",
        },
      ];
    }

    // If no real data yet, show encouraging messages
    return [
      { number: "Growing", label: "Community" },
      { number: "20+", label: "Available Lessons" },
      { number: "Global", label: "Reach" },
      { number: "100%", label: "Free Access" },
    ];
  };

  const statsDisplay = getDisplayStats();

  const getStatsColor = () => {
    if (!isEnabled) {
      return "text-blue-600";
    }
    return themeConfig.colors.primary;
  };

  const getStatsStyle = () => {
    if (!isEnabled) {
      return {};
    }
    return {
      color: themeConfig.colors.primary,
    };
  };

  return (
    <>
      {/* SVG Filter for Gooey Blood Effect - only when theme enabled */}
      {isEnabled && (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{width: 0, height: 0, position: 'absolute'}}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
        {statsDisplay.map((stat, index) => (
          <div key={index} className="relative group overflow-hidden rounded-md text-center transition-transform duration-300 group-hover:scale-[1.03]">
            {/* Blurred red shape glow under splatter - only when theme enabled */}
            {isEnabled && (
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-55"
                style={{
                  backgroundImage: `
                    radial-gradient(60% 48% at 50% 52%, rgba(150,0,0,0.45), transparent 62%),
                    radial-gradient(38% 30% at 35% 44%, rgba(190,0,0,0.35), transparent 60%),
                    radial-gradient(34% 28% at 68% 60%, rgba(210,0,0,0.32), transparent 60%),
                    radial-gradient(22% 18% at 28% 70%, rgba(160,0,0,0.30), transparent 60%),
                    radial-gradient(18% 16% at 78% 34%, rgba(180,0,0,0.28), transparent 60%)
                  `,
                  filter: 'blur(22px)',
                  transform: 'rotate(-6deg)'
                }}
              />
            )}
            {/* Blood splatter GIF on hover - only when theme enabled */}
            {isEnabled && (
              <div
                className="pointer-events-none absolute inset-0 opacity-0 scale-95 transition-all duration-300 group-hover:opacity-90 group-hover:scale-100"
                style={{
                  backgroundImage: "url(/halloween/images/blood-splatter.gif)",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '60% 85%',
                  top: '20%', 
                }}
              />
            )}
            {/* Pop animation for content on hover */}
            <style jsx>{`
              @keyframes statPop { 0%{transform:scale(1) translateY(0)} 60%{transform:scale(1.12) translateY(-4px)} 100%{transform:scale(1.04) translateY(-2px)} }
              .group:hover .stat-number { animation: statPop 420ms ease-out forwards; text-shadow: 0 6px 18px rgba(255,0,0,.35); }
              .group:hover .stat-label { animation: statPop 420ms ease-out 40ms forwards; }
              
              }
            `}</style>
            <div
              className={`text-2xl font-bold ${
                !isEnabled ? getStatsColor() : ""
              } mb-2 stat-number`}
              style={getStatsStyle()}
            >
              {stat.number}
            </div>
            <div
              className={`${
                isEnabled
                  ? " tracking-widest text-lg font-bold"
                  : "text-sm text-muted-foreground "
              } stat-label dripping-label`}
              style={
                isEnabled
                  ? {
                      fontFamily:
                        themeConfig.fonts?.paragraph ||
                        themeConfig.fonts?.secondary,
                      color:
                        themeConfig.colors?.secondary ||
                        themeConfig.colors?.secondary,
                    }
                  : undefined
              }
            >
              {stat.label}
              {isEnabled && (
                <>
                  <span className="blood-drop"></span>
                  <span className="blood-drop"></span>
                  <span className="blood-drop"></span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}