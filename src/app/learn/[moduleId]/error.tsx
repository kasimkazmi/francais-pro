'use client';

import ErrorScreen from '@/components/ui/ErrorScreens';
import React from 'react';

const ModuleError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return (
        <ErrorScreen 
            error={error}
            reset={reset}
            title="Module Load Error"
            description="Failed to load this learning module. The module might not exist or there was a connection issue."
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
                        Retry Loading Module
                    </button>
                    <button 
                        onClick={() => window.location.href = '/learn'}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Modules List
                    </button>
                </div>
            }
        />
    );
};

export default ModuleError;

