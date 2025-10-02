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

type ErrorType = 'network' | 'server' | 'notfound' | 'auth' | 'timeout' | 'permission' | 'generic';

interface ErrorScreenProps {
    error?: Error & { digest?: string };
    reset?: () => void;
    type?: ErrorType;
    title?: string;
    description?: string;
    showHome?: boolean;
    customActions?: React.ReactNode;
}

// Detect error type from error object
const detectErrorType = (error?: Error): ErrorType => {
    if (!error) return 'generic';
    
    const message = error.message?.toLowerCase() || '';
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
        return 'network';
    }
    if (message.includes('500') || message.includes('server') || message.includes('internal')) {
        return 'server';
    }
    if (message.includes('404') || message.includes('not found')) {
        return 'notfound';
    }
    if (message.includes('auth') || message.includes('unauthorized') || message.includes('401')) {
        return 'auth';
    }
    if (message.includes('timeout') || message.includes('timed out')) {
        return 'timeout';
    }
    if (message.includes('permission') || message.includes('forbidden') || message.includes('403')) {
        return 'permission';
    }
    
    return 'generic';
};

// Unified Error Screen Component
export default function ErrorScreen({ 
    error, 
    reset, 
    type, 
    title: customTitle, 
    description: customDescription, 
    showHome = true, 
    customActions 
}: ErrorScreenProps) {
    const router = useRouter();
    const errorType = type || detectErrorType(error);
    const [currentTheme, setCurrentTheme] = React.useState<string>('default');
    const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const updateTheme = () => {
            const classes = Array.from(document.documentElement.classList);
            const themeClass = classes.find(c => c.endsWith('-mode'));
            if (themeClass) {
                const name = themeClass.replace(/-mode$/, '');
                setCurrentTheme(name);
                setIsEnabled(true);
            } else {
                setCurrentTheme('default');
                setIsEnabled(false);
            }
        };
        
        // Initial check
        updateTheme();
        
        // Watch for theme changes
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);

    const errorConfig = {
        network: {
            icon: Wifi,
            title: 'Connection Error',
            description: "It looks like you're having trouble connecting to our servers. Please check your internet connection and try again.",
            gradient: 'from-orange-50 to-red-50',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
            primaryBtn: 'bg-orange-600 hover:bg-orange-700',
            primaryLabel: 'Retry Connection',
        },
        server: {
            icon: Server,
            title: 'Server Error',
            description: "Our servers are experiencing some issues. We're working to fix this as quickly as possible.",
            gradient: 'from-red-50 to-pink-50',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            primaryBtn: 'bg-red-600 hover:bg-red-700',
            primaryLabel: 'Try Again',
        },
        notfound: {
            icon: FileX,
            title: 'Page Not Found',
            description: "The page you're looking for doesn't exist or has been moved.",
            gradient: 'from-blue-50 to-indigo-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            primaryBtn: 'bg-blue-600 hover:bg-blue-700',
            primaryLabel: 'Go to Home',
        },
        auth: {
            icon: Shield,
            title: 'Authentication Error',
            description: 'You need to be logged in to access this page. Please sign in to continue.',
            gradient: 'from-purple-50 to-pink-50',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            primaryBtn: 'bg-purple-600 hover:bg-purple-700',
            primaryLabel: 'Sign In',
        },
        timeout: {
            icon: Clock,
            title: 'Request Timeout',
            description: 'The request is taking longer than expected. This might be due to a slow connection or server load.',
            gradient: 'from-yellow-50 to-orange-50',
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            primaryBtn: 'bg-yellow-600 hover:bg-yellow-700',
            primaryLabel: 'Try Again',
        },
        permission: {
            icon: Users,
            title: 'Access Denied',
            description: "You don't have permission to access this page. Please contact an administrator if you believe this is an error.",
            gradient: 'from-gray-50 to-slate-50',
            iconBg: 'bg-gray-100',
            iconColor: 'text-gray-600',
            primaryBtn: 'bg-gray-600 hover:bg-gray-700',
            primaryLabel: 'Go to Home',
        },
        generic: {
            icon: AlertTriangle,
            title: 'Something Went Wrong',
            description: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
            gradient: 'from-red-50 to-orange-50',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            primaryBtn: 'bg-red-600 hover:bg-red-700',
            primaryLabel: 'Try Again',
        },
    };

    const config = errorConfig[errorType];
    const Icon = config.icon;
    
    // Use custom title/description if provided
    const displayTitle = customTitle || config.title;
    const displayDescription = customDescription || config.description;

    const handlePrimaryAction = () => {
        if (errorType === 'auth') {
            router.push('/welcome');
        } else if (errorType === 'notfound') {
            router.push('/home');
        } else if (reset) {
            reset();
        } else {
            router.push('/home');
        }
    };

    // Special animated 404 page
    if (errorType === 'notfound') {
        const seasonalSubtitleMap: Record<string, string> = {
            halloween: "Page Vanished",
            christmas: "Lost in the Snow",
            spring: "Bloom Not Found",
            summer: "Sunburnt URL",
            autumn: "Fallen Leaf Link",
            default: "Page Not Found",
        };
        const subtitle = customTitle || seasonalSubtitleMap[currentTheme] || seasonalSubtitleMap.default;
        const titleColor = isEnabled ? '#8A0303' : 'IndianRed';

        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center overflow-hidden" style={{ backgroundColor: 'PapayaWhip' }}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ width: 0, height: 0 }}>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                <div className="px-6 max-w-4xl mx-auto mb-8">
                    <h1 className="relative font-black uppercase leading-none tracking-widest" style={{
                        fontFamily: 'Raleway, sans-serif',
                        color: titleColor,
                        letterSpacing: '-0.12em',
                        fontSize: 'clamp(48px, 12vw, 140px)',
                        margin: 0,
                        filter: 'url(#goo)'
                    }}>
                        4 0 4
                        <span className="drop" />
                        <span className="drop" />
                        <span className="drop" />
                    </h1>
                    <p className="mt-4 text-gray-800 text-xl md:text-2xl font-bold">
                        {subtitle}
                    </p>
                    <p className="mt-2 text-gray-700 text-base md:text-lg" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {customDescription || "The page you're looking for doesn't exist."}
                    </p>
                </div>

                {customActions || (
                    <div className="space-y-3 w-full max-w-md px-4">
                        <Button 
                            onClick={() => router.push('/home')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go to Home
                        </Button>
                        {showHome && (
                            <Button 
                                variant="outline"
                                onClick={() => router.back()}
                                className="w-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </Button>
                        )}
                    </div>
                )}

                <style jsx>{`
                    .drop {
                        width: .12em;
                        height: .12em;
                        border-radius: 0 100% 100% 100%;
                        background-color: currentColor;
                        position: absolute;
                        top: 80%;
                        animation: drop 3s infinite both;
                        z-index: 1;
                        pointer-events: none;
                    }
                    .drop:nth-child(2) { left: 18%; }
                    .drop:nth-child(3) { left: 50%; animation-delay: -.8s; }
                    .drop:nth-child(4) { left: 82%; animation-delay: -1.6s; }
                    @media (min-width: 768px) {
                        .drop { top: 78%; }
                        .drop:nth-child(2) { left: 20%; }
                        .drop:nth-child(3) { left: 50%; }
                        .drop:nth-child(4) { left: 80%; }
                    }
                    @keyframes drop {
                        0% { transform: translateY(0) scaleX(.85) rotate(45deg); animation-timing-function: ease-out; }
                        60% { transform: translateY(140%) scaleX(.85) rotate(45deg); animation-timing-function: ease-in; }
                        80%, 100% { transform: translateY(55vh) scaleX(.85) rotate(45deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${config.gradient} flex items-center justify-center p-4`}>
            <div className="max-w-md w-full text-center">
                <div className={`w-24 h-24 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-12 h-12 ${config.iconColor}`} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayTitle}</h1>
                <p className="text-gray-600 mb-6">{displayDescription}</p>
                
                {/* Show error message in development */}
                {process.env.NODE_ENV === 'development' && error && (
                    <div className="mb-4 p-3 bg-gray-100 rounded-lg text-left">
                        <p className="text-xs text-gray-500 font-mono break-all">{error.message}</p>
                        {error.digest && (
                            <p className="text-xs text-gray-400 font-mono mt-1">Digest: {error.digest}</p>
                        )}
                    </div>
                )}

                {/* Custom actions or default actions */}
                {customActions ? (
                    customActions
                ) : (
                    <div className="space-y-3">
                        <Button 
                            onClick={handlePrimaryAction}
                            className={`w-full ${config.primaryBtn} text-white`}
                        >
                        {errorType === 'auth' ? (
                            <Shield className="w-4 h-4 mr-2" />
                        ) : errorType === 'permission' ? (
                            <Home className="w-4 h-4 mr-2" />
                        ) : (
                            <RefreshCw className="w-4 h-4 mr-2" />
                        )}
                            {config.primaryLabel}
                        </Button>
                        {showHome && (
                            <Button 
                                variant="outline"
                                onClick={() => router.back()}
                                className="w-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Legacy exports for backward compatibility
export const NetworkErrorScreen = ({ reset }: ErrorScreenProps) => {
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
                        onClick={() => router.push('/home')}
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

// Server Error Screen
export const ServerErrorScreen = ({ reset }: ErrorScreenProps) => {
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
                        onClick={() => router.push('/home')}
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

// Not Found Error Screen
export const NotFoundErrorScreen = ({  }: ErrorScreenProps) => {
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
                        onClick={() => router.push('/home')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Home
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
export const AuthErrorScreen = ({  }: ErrorScreenProps) => {
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
                        onClick={() => router.push('/welcome')}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Shield className="w-4 h-4 mr-2" />
                        Sign In
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => router.push('/home')}
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
export const TimeoutErrorScreen = ({ reset }: ErrorScreenProps) => {
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
                        onClick={() => router.push('/home')}
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

// Permission Error Screen
export const PermissionErrorScreen = ({  }: ErrorScreenProps) => {
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
                        onClick={() => router.push('/home')}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Go to Home
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