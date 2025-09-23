'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Mail, Lock, User, Loader2, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, signup, loginWithGoogle, sendReset } = useAuth();

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
      if (mode === 'login') success = await login(email, password);
      else success = await signup(name, email, password);

      if (success) {
        onClose();
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
        toast.success(mode === 'login' ? 'Signed in. Welcome back!' : 'Account created. Welcome!');
        
        // Redirect to home page after successful authentication
        router.push('/home');
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
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Join Français Pro'}
            {mode === 'forgot' && 'Reset Password'}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {mode === 'login' && 'Sign in to continue your French learning journey'}
            {mode === 'signup' && 'Create your account to start learning French'}
            {mode === 'forgot' && 'Enter your email and we will send you a reset link.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200"
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
                mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'
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
                  className="p-0 h-auto ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
                  className="p-0 h-auto ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => { setMode('forgot'); setError(''); }}
              >
                Forgot your password?
              </Button>
            </div>
          )}

          <div className="mt-4">
            <Button
              type="button"
              onClick={async () => { 
                setIsLoading(true); 
                setError(''); 
                try { 
                  const success = await loginWithGoogle(); 
                  if (success) {
                    onClose(); 
                    router.push('/home');
                  }
                } catch { 
                  setError('Google login failed'); 
                } finally { 
                  setIsLoading(false); 
                } 
              }}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
              variant="outline"
            >
              <Shield className="h-4 w-4 mr-2" /> Continue with Google
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
