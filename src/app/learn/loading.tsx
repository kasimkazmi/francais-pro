import React from 'react';
import { Loader2, BookOpen } from 'lucide-react';

export default function LearnLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="relative inline-block">
          <BookOpen className="w-20 h-20 text-blue-600 dark:text-blue-400 animate-pulse" />
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin absolute -bottom-2 -right-2" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Loading Learning Module...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Preparing your French learning experience
        </p>
      </div>
    </div>
  );
}

