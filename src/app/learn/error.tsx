'use client';

import ErrorScreen from '@/components/ui/ErrorScreens';
import React from 'react';

const LearnError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return (
        <ErrorScreen 
            error={error}
            reset={reset}
            title="Learning Module Error"
            description="Failed to load the learning module. Please try again or return to the learning dashboard."
            showHome={false}
            customActions={
                <div className="space-y-3">
                    <button 
                        onClick={reset}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retry Loading
                    </button>
                    <button 
                        onClick={() => window.location.href = '/learn'}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Back to Learning Dashboard
                    </button>
                </div>
            }
        />
    );
};

export default LearnError;

