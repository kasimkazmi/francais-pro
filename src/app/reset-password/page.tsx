'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase/config';
import { verifyPasswordResetCode, confirmPasswordReset } from '@/lib/firebase/auth';

export const dynamic = 'force-dynamic';

function ResetPasswordInner() {
  const router = useRouter();
  const params = useSearchParams();
  const oobCode = params.get('oobCode') || '';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const verify = async () => {
      if (!oobCode) { setError('Invalid or missing reset code.'); setIsVerifying(false); return; }
      try {
        const mail = await verifyPasswordResetCode(auth, oobCode);
        setEmail(mail);
      } catch (_err) {
        setError('This reset link is invalid or expired.');
      } finally {
        setIsVerifying(false);
      }
    };
    verify();
  }, [oobCode]);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setIsSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success('Password has been reset. Please sign in.');
      router.push('/');
    } catch (_err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay z-[9999] p-4">
      <div className="flex items-center justify-center min-h-full">
        <Card className="w-full max-w-md bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription>
              {isVerifying ? 'Verifying reset link...' : email ? `for ${email}` : 'Invalid reset link'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-md mb-4">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" required minLength={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" required minLength={6} />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting || isVerifying || !oobCode}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ResetPasswordInner />
    </Suspense>
  );
}



