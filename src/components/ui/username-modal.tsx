'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, User, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { collection, doc, getDoc, getDocs, limit, query, runTransaction, setDoc, where, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/contexts/AuthContext';

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string) => void;
  suggestedUsername?: string;
  userEmail?: string;
}

export function UsernameModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  suggestedUsername,
  userEmail 
}: UsernameModalProps) {
  const { user } = useAuth();
  const [username, setUsername] = useState(suggestedUsername || '');
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const checkedCache = useState<Record<string, boolean>>({})[0];

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const withOneRetry = async <T,>(fn: () => Promise<T>): Promise<T> => {
    try { return await fn(); } catch (e) { await sleep(500); return await fn(); }
  };

  // Validate username
  const validateUsername = (value: string) => {
    const isValidFormat = /^[a-zA-Z0-9._-]{3,20}$/.test(value);
    setIsValid(isValidFormat);
    return isValidFormat;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
    setIsAvailable(null);
    setSuggestions([]);
  };

  // Normalize username for consistent uniqueness
  const normalize = (value: string) => value.trim().toLowerCase();

  // Check if username is reserved in the usernames collection
  const checkUsernameExists = async (name: string): Promise<boolean> => {
    const key = normalize(name);
    if (key in checkedCache) return checkedCache[key];
    const ref = doc(db, 'usernames', key);
    const snap = await withOneRetry(() => getDoc(ref));
    const exists = snap.exists();
    checkedCache[key] = exists;
    return exists;
  };

  const baseify = (value: string) => value.replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase().slice(0, 18);

  const generateSuggestionCandidates = (base: string): string[] => {
    const root = baseify(base) || 'user';
    const nums = Array.from({ length: 8 }, () => Math.floor(100 + Math.random() * 900));
    const suffixes = ['_fr', '_pro', '_xp'];
    const candidates: string[] = [];
    for (let i = 0; i < nums.length && candidates.length < 6; i++) {
      candidates.push(`${root}${nums[i]}`);
    }
    for (let i = 0; i < suffixes.length && candidates.length < 9; i++) {
      candidates.push(`${root}${suffixes[i]}`);
    }
    return candidates;
  };

  const getUniqueSuggestions = async (base: string, take = 3): Promise<string[]> => {
    const cands = generateSuggestionCandidates(base).slice(0, 6);
    const checks = await Promise.allSettled(cands.map((c) => checkUsernameExists(c)));
    const out: string[] = [];
    checks.forEach((res, idx) => {
      if (out.length >= take) return;
      if (res.status === 'fulfilled' && res.value === false) out.push(cands[idx]);
    });
    return out.slice(0, take);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isChecking) return;
    
    setIsChecking(true);
    try {
      const desired = normalize(username);
      if (!user?.uid) {
        toast('Please sign in first.', { icon: 'ℹ️' });
        return;
      }

      // Reserve username atomically if not exists
      await runTransaction(db, async (tx) => {
        const ref = doc(db, 'usernames', desired);
        const snap = await tx.get(ref);
        if (snap.exists()) {
          throw new Error('taken');
        }
        tx.set(ref, { uid: user?.uid || null, createdAt: Date.now() });
      });

      // Proceed to apply username (Auth/parent handler)
      try {
        await onSubmit(desired);
        // Also mirror on userProfiles for convenience (best-effort)
        const profileRef = doc(db, 'userProfiles', user.uid);
        await setDoc(profileRef, { displayName: desired }, { merge: true });
      } catch (applyErr) {
        // Rollback reservation on failure
        await deleteDoc(doc(db, 'usernames', desired));
        throw applyErr;
      }

      toast.success('Username set successfully!');
      onClose();
    } catch (error) {
      if ((error as Error)?.message === 'taken') {
        setIsAvailable(false);
        const opts = await getUniqueSuggestions(username, 3);
        setSuggestions(opts);
        toast('Username already taken. Pick a suggestion or try another.', { icon: '⚠️' });
      } else {
        console.error('Error setting username:', error);
        toast.error('Failed to set username. Please try again.');
      }
    } finally {
      setIsChecking(false);
    }
  };

  const generateFromEmail = () => {
    if (!userEmail) return;
    const emailPrefix = userEmail.split('@')[0];
    const cleanUsername = emailPrefix.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const finalUsername = cleanUsername + Math.floor(Math.random() * 1000);
    setUsername(finalUsername);
    validateUsername(finalUsername);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] p-4 animate-in fade-in duration-300"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
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
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl">Choose Your Username</CardTitle>
            </div>

            {isAvailable === false && (
              <div className="space-y-2">
                <div className="text-sm text-red-600 dark:text-red-400">This username is already taken.</div>
                {suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <Button
                        key={s}
                        type="button"
                        variant="outline"
                        className="h-8 px-3"
                        onClick={async () => {
                          setUsername(s);
                          setIsChecking(true);
                          try {
                            const exists = await checkUsernameExists(s);
                            if (!exists) {
                              await onSubmit(s);
                              toast.success('Username set successfully!');
                              onClose();
                            } else {
                              toast('That suggestion was just taken. Try another.', { icon: '⚠️' });
                              // refresh suggestions
                              const opts = await getUniqueSuggestions(username, 3);
                              setSuggestions(opts);
                            }
                          } catch {
                            toast.error('Failed to set username. Please try again.');
                          } finally {
                            setIsChecking(false);
                          }
                        }}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            This will be displayed in the leaderboard and community features.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-900 dark:text-gray-100">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className="pr-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border-gray-300 dark:border-gray-600"
                />
                {isValid && (
                  <Check className="absolute right-2 top-2.5 h-4 w-4 text-green-600" />
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                • 3-20 characters
                • Letters, numbers, dots, dashes, and underscores only
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={generateFromEmail}
                className="flex-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                disabled={!userEmail}
              >
                Generate from Email
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isChecking}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:scale-95 transition-all duration-200"
              >
                {isChecking ? 'Setting...' : 'Continue'}
              </Button>
            </div>

            {suggestedUsername && (
              <div className="text-xs text-muted-foreground text-center">
                Suggested: <span className="font-medium">{suggestedUsername}</span>
              </div>
            )}
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
