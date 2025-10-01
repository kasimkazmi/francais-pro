import React from 'react';
import { Loader2, BookOpen, Sparkles } from 'lucide-react';

export default function ModuleLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="relative">
            <BookOpen className="w-20 h-20 text-purple-600 dark:text-purple-400 animate-pulse" />
            <Sparkles className="w-6 h-6 text-pink-500 dark:text-pink-400 animate-ping absolute -top-2 -right-2" />
          </div>
          <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin absolute -bottom-2 -right-2" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Loading Module...
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Getting your lessons ready
        </p>
      </div>
    </div>
  );
}

