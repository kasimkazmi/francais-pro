'use client';

import React from 'react';
import { 
    AlertTriangle, 
    RefreshCw, 
    Home, 
    ArrowLeft, 
    Wifi, 
    Server, 
    FileX, 
    Shield,
    Clock,
    Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ErrorScreenProps {
    error?: Error & { digest?: string };
    reset?: () => void;
}

// Network Error Screen
export const NetworkErrorScreen = ({ error, reset }: ErrorScreenProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wifi className="w-12 h-12 text-orange-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Connection Error</h1>
                <p className="text-gray-600 mb-6">
                    It looks like you&apos;re having trouble connecting to our servers. Please check your internet connection and try again.
                </p>
                <div className="space-y-3">
                    {reset && (
                        <Button 
                            onClick={reset}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retry Connection
                        </Button>
                    )}
                    <Button 
                        variant="outline"
                        onClick={() => router.push('/main-pages/dashboard')}
                        className="w-full"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Server Error Screen
export const ServerErrorScreen = ({ error, reset }: ErrorScreenProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Server className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Server Error</h1>
                <p className="text-gray-600 mb-6">
                    Our servers are experiencing some issues. We&apos;re working to fix this as quickly as possible.
                </p>
                <div className="space-y-3">
                    {reset && (
                        <Button 
                            onClick={reset}
                            className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                    )}
                    <Button 
                        variant="outline"
                        onClick={() => router.push('/main-pages/dashboard')}
                        className="w-full"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Not Found Error Screen
export const NotFoundErrorScreen = ({ error, reset }: ErrorScreenProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileX className="w-12 h-12 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="space-y-3">
                    <Button 
                        onClick={() => router.push('/main-pages/dashboard')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Dashboard
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => router.back()}
                        className="w-full"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Authentication Error Screen
export const AuthErrorScreen = ({ error, reset }: ErrorScreenProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-12 h-12 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Error</h1>
                <p className="text-gray-600 mb-6">
                    You need to be logged in to access this page. Please sign in to continue.
                </p>
                <div className="space-y-3">
                    <Button 
                        onClick={() => router.push('/main-pages/signup')}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Shield className="w-4 h-4 mr-2" />
                        Sign In
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => router.push('/landing-page/home')}
                        className="w-full"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Loading Timeout Error Screen
export const TimeoutErrorScreen = ({ error, reset }: ErrorScreenProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-12 h-12 text-yellow-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Timeout</h1>
                <p className="text-gray-600 mb-6">
                    The request is taking longer than expected. This might be due to a slow connection or server load.
                </p>
                <div className="space-y-3">
                    {reset && (
                        <Button 
                            onClick={reset}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                    )}
                    <Button 
                        variant="outline"
                        onClick={() => router.push('/main-pages/dashboard')}
                        className="w-full"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Permission Error Screen
export const PermissionErrorScreen = ({ error, reset }: ErrorScreenProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-gray-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You don&apos;t have permission to access this page. Please contact an administrator if you believe this is an error.
                </p>
                <div className="space-y-3">
                    <Button 
                        onClick={() => router.push('/main-pages/dashboard')}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Dashboard
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => router.back()}
                        className="w-full"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};