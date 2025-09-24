'use client';

import React, { useState } from 'react';
import { HalloweenLoader } from '@/components/halloween/halloween-loader';

export default function LoaderTestPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [loaderDuration, setLoaderDuration] = useState(15000); // 15 seconds default
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoader = () => {
    setIsLoading(true);
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setShowLoader(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          🎃 Halloween Loader Test
        </h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-orange-200 mb-2">
              Loader Duration: {loaderDuration / 1000} seconds
            </label>
            <input
              type="range"
              min="2000"
              max="60000"
              step="1000"
              value={loaderDuration}
              onChange={(e) => setLoaderDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>2s</span>
              <span>30s</span>
              <span>60s</span>
            </div>
          </div>
          
          
          <button
            onClick={triggerLoader}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Test Halloween Loader'}
          </button>
          
          <div className="text-center text-gray-400 text-sm">
            <p>Use this page to experiment with the Halloween loader design.</p>
            <p className="mt-2">Adjust the duration and click the button to see the loader in action!</p>
          </div>
        </div>
      </div>

      {/* Loader Overlay */}
      {showLoader && (
        <HalloweenLoader
          isLoading={isLoading}
          duration={loaderDuration}
          onComplete={handleLoaderComplete}
        />
      )}
    </div>
  );
}
