'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, User, Check } from 'lucide-react';

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
  const [username, setUsername] = useState(suggestedUsername || '');
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isChecking) return;
    
    setIsChecking(true);
    try {
      await onSubmit(username);
      onClose();
    } catch (error) {
      console.error('Error setting username:', error);
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle>Choose Your Username</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            This will be displayed in the leaderboard and community features.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className="pr-8"
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
                className="flex-1"
                disabled={!userEmail}
              >
                Generate from Email
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isChecking}
                className="flex-1"
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
  );
}
