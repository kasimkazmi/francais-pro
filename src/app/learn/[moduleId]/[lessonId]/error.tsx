'use client';

import ErrorScreen from '@/components/ui/ErrorScreens';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const LessonError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    const params = useParams();
    const router = useRouter();
    const moduleId = params.moduleId as string;

    return (
        <ErrorScreen 
            error={error}
            reset={reset}
            title="Lesson Load Error"
            description="Failed to load this lesson. The lesson might not exist or there was a connection issue."
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
                        Retry Loading Lesson
                    </button>
                    <button 
                        onClick={() => router.push(`/learn/${moduleId}`)}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Module
                    </button>
                    <button 
                        onClick={() => router.push('/learn')}
                        className="w-full border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Learning Dashboard
                    </button>
                </div>
            }
        />
    );
};

export default LessonError;

