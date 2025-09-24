'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Mail, Lock, User, Loader2, Shield, LogIn, Target, Trophy, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  context?: 'general' | 'practice' | 'learn';
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login', context = 'general', onSuccess }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup, loginWithGoogle, sendReset } = useAuth();

  // Get context-specific content
  const getContextConfig = () => {
    switch (context) {
      case 'practice':
        return {
          icon: Trophy,
          gradient: 'from-blue-500 to-purple-600',
          title: mode === 'login' ? 'Login to Track Your Progress' : 'Create Your Account',
          description: mode === 'login' 
            ? 'To keep all your practice test scores and track your French learning journey, please sign in first.'
            : 'Create your free account to start tracking your practice scores and French learning progress.',
          benefits: [
            'Save your practice scores and progress',
            'Track your improvement over time',
            'Compete on leaderboards',
            'Earn achievements and badges'
          ],
          primaryColor: 'blue'
        };
      case 'learn':
        return {
          icon: GraduationCap,
          gradient: 'from-green-500 to-blue-600',
          title: mode === 'login' ? 'Start Your French Learning Journey' : 'Create Your Learning Account',
          description: mode === 'login'
            ? 'Sign in to access personalized lessons, track your progress, and unlock your full learning potential.'
            : 'Create your free account to access personalized lessons, track your progress, and unlock your full learning potential.',
          benefits: [
            'Track your learning progress and achievements',
            'Save your favorite lessons and vocabulary',
            'Unlock advanced learning features',
            'Join the learning community and leaderboards'
          ],
          primaryColor: 'green'
        };
      default:
        return {
          icon: LogIn,
          gradient: 'from-blue-500 to-purple-600',
          title: mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join Français Pro' : 'Reset Password',
          description: mode === 'login' 
            ? 'Sign in to continue your French learning journey'
            : mode === 'signup' 
            ? 'Create your account to start learning French'
            : 'Enter your email and we will send you a reset link.',
          benefits: [
            'Save your learning progress and achievements',
            'Track your improvement over time',
            'Compete on leaderboards',
            'Earn achievements and badges'
          ],
          primaryColor: 'blue'
        };
    }
  };

  const contextConfig = getContextConfig();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const normalizedEmail = email.trim();
      const normalizedPassword = password;
      const normalizedName = name.trim();
      if (mode === 'forgot') {
        if (!email) {
          setError('Please enter your email address.');
          return;
        }
        await sendReset(email);
        toast.success('Password reset email sent. Check your inbox.');
        setMode('login');
        return;
      }

      let success = false;
      if (mode === 'login') success = await login(normalizedEmail, normalizedPassword);
      else success = await signup(normalizedName, normalizedEmail, normalizedPassword);

      if (success) {
        onClose();
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
        toast.success(mode === 'login' ? 'Signed in. Welcome back!' : 'Account created. Welcome!');
        
        // Call onSuccess callback or redirect to home for general context
        if (onSuccess) {
          onSuccess();
        } else if (context === 'general') {
          router.push('/home');
        }
      }
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      const code = err?.code || '';
      const message = err?.message || '';
      if (mode === 'forgot') {
        setError(message || 'Could not send reset email. Please try again.');
        toast.error(message || 'Could not send reset email.');
      } else if (mode === 'login') {
        switch (code) {
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            setError('Invalid email or password.');
            toast.error('Invalid email or password.');
            break;
          case 'auth/too-many-requests':
            setError('Too many attempts. Please try again later.');
            toast('Too many attempts. Try again later.', { icon: '⚠️' });
            break;
          default:
            setError(message || 'Could not sign in. Please try again.');
            toast.error(message || 'Could not sign in. Please try again.');
        }
      } else {
        switch (code) {
          case 'auth/email-already-in-use':
            setError('This email is already registered. Try signing in.');
            toast('Email already in use. Try signing in.', { icon: 'ℹ️' });
            break;
          case 'auth/weak-password':
            setError('Password should be at least 6 characters.');
            toast('Use a stronger password (6+ characters).', { icon: '🔒' });
            break;
          case 'auth/operation-not-allowed':
            setError('Email/password accounts are not enabled.');
            toast.error('Signup unavailable. Enable Email/Password in Firebase.');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address.');
            toast('Enter a valid email address.', { icon: '✉️' });
            break;
          default:
            setError(message || 'Could not create account. Please try again.');
            toast.error(message || 'Could not create account. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay z-[9999] p-4 animate-in fade-in duration-300"
      data-backdrop="true"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        isolation: 'isolate'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="flex items-center justify-center min-h-full pointer-events-none"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Card 
          className="w-full max-w-md bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl relative animate-in zoom-in-95 duration-300 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
        <CardHeader className="relative text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-br ${contextConfig.gradient} rounded-full flex items-center justify-center`}>
            <contextConfig.icon className="h-8 w-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
            {contextConfig.title}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {contextConfig.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Benefits section - only show for login and signup */}
          {(mode === 'login' || mode === 'signup') && (
            <div className={`bg-${contextConfig.primaryColor}-50 dark:bg-${contextConfig.primaryColor}-900/20 p-4 rounded-lg`}>
              <h3 className={`font-semibold text-${contextConfig.primaryColor}-900 dark:text-${contextConfig.primaryColor}-100 mb-3 flex items-center`}>
                <Target className="h-4 w-4 mr-2" />
                Why sign in?
              </h3>
              <ul className={`text-sm text-${contextConfig.primaryColor}-800 dark:text-${contextConfig.primaryColor}-200 space-y-2`}>
                {contextConfig.benefits.map((benefit, index) => (
                  <li key={index}>• {benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-300 dark:border-gray-600"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
            </div>
            
            {mode !== 'forgot' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-300 dark:border-gray-600"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className={`w-full bg-${contextConfig.primaryColor}-600 text-white hover:bg-${contextConfig.primaryColor}-700 hover:shadow-lg active:bg-${contextConfig.primaryColor}-800 active:scale-95 transition-all duration-200`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'login' && 'Signing In...'}
                  {mode === 'signup' && 'Creating Account...'}
                  {mode === 'forgot' && 'Sending Reset...'}
                </>
              ) : (
                <>
                  {mode !== 'forgot' && <LogIn className="h-4 w-4 mr-2" />}
                  {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {mode !== 'forgot' ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={switchMode}
                  className={`p-0 h-auto ml-1 text-${contextConfig.primaryColor}-600 hover:text-${contextConfig.primaryColor}-700 dark:text-${contextConfig.primaryColor}-400 dark:hover:text-${contextConfig.primaryColor}-300`}
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </Button>
              </p>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remembered your password?
                <Button
                  variant="link"
                  onClick={() => { setMode('login'); setError(''); }}
                  className={`p-0 h-auto ml-1 text-${contextConfig.primaryColor}-600 hover:text-${contextConfig.primaryColor}-700 dark:text-${contextConfig.primaryColor}-400 dark:hover:text-${contextConfig.primaryColor}-300`}
                >
                  Back to Sign in
                </Button>
              </p>
            )}
          </div>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                className={`text-sm text-gray-600 dark:text-gray-400 hover:text-${contextConfig.primaryColor}-600 dark:hover:text-${contextConfig.primaryColor}-400`}
                onClick={() => { setMode('forgot'); setError(''); }}
              >
                Forgot your password?
              </Button>
            </div>
          )}

          {/* Google Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={async () => { 
              setIsLoading(true); 
              setError(''); 
              try { 
                const success = await loginWithGoogle(); 
                if (success) {
                  onClose(); 
                  if (onSuccess) {
                    onSuccess();
                  } else if (context === 'general') {
                    router.push('/home');
                  }
                }
              } catch { 
                setError('Google login failed'); 
              } finally { 
                setIsLoading(false); 
              } 
            }}
            disabled={isLoading}
            className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            variant="outline"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                Signing in...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
