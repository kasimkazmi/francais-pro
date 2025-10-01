import React from 'react';
import { Loader2, GraduationCap, Star } from 'lucide-react';

export default function LessonLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="relative">
            <GraduationCap className="w-20 h-20 text-green-600 dark:text-green-400 animate-pulse" />
            <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400 animate-bounce absolute -top-1 -right-1" />
          </div>
          <Loader2 className="w-8 h-8 text-green-600 dark:text-green-400 animate-spin absolute -bottom-2 -right-2" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Loading Lesson...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Preparing your learning materials
        </p>
        <div className="mt-4 flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}

