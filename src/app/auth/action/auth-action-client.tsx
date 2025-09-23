'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AuthActionClient() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');
    if (!mode) {
      router.replace('/');
      return;
    }
    if (mode === 'resetPassword' && oobCode) {
      router.replace(`/reset-password?oobCode=${encodeURIComponent(oobCode)}`);
    } else {
      router.replace('/');
    }
  }, [params, router]);

  return null;
}


