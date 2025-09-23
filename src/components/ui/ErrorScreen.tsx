'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ErrorScreenProps {
    error?: Error & { digest?: string };
    reset?: () => void;
    title?: string;
    description?: string;
    showRetry?: boolean;
    showHome?: boolean;
    showBack?: boolean;
    customActions?: React.ReactNode;
}

const ErrorScreen = ({ 
    error, 
    reset, 
    title = "Something went wrong!",
    description = "An unexpected error occurred. Please try again or contact support if the problem persists.",
    showRetry = true,
    showHome = true,
    showBack = true,
    customActions
}: ErrorScreenProps) => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/main-pages/dashboard');
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Error Icon */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                {/* Error Details (Development Only) */}
                {error && process.env.NODE_ENV === 'development' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
                        <p className="text-xs text-red-700 font-mono break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-red-600 mt-1">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    {customActions ? (
                        customActions
                    ) : (
                        <>
                            {showRetry && reset && (
                                <Button 
                                    onClick={reset}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                            )}
                            
                            <div className="flex gap-3">
                                {showBack && (
                                    <Button 
                                        variant="outline"
                                        onClick={handleGoBack}
                                        className="flex-1"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Go Back
                                    </Button>
                                )}
                                
                                {showHome && (
                                    <Button 
                                        variant="outline"
                                        onClick={handleGoHome}
                                        className="flex-1"
                                    >
                                        <Home className="w-4 h-4 mr-2" />
                                        Go Home
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Help Text */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        If this problem continues, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorScreen;