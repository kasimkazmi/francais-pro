'use client';

import ErrorScreen from '@/components/ui/ErrorScreen';
import React from 'react';

const UserDetailError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    return (
        <ErrorScreen 
            error={error}
            reset={reset}
            title="User Details Error"
            description="Failed to load user details. This could be due to a network issue, invalid user ID, or database connection problem. Please try again."
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
                        Retry Loading User
                    </button>
                    <button 
                        onClick={() => window.location.href = '/admin/users'}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Users List
                    </button>
                </div>
            }
        />
    );
};

export default UserDetailError;
