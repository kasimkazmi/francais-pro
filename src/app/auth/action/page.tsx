import { Suspense } from 'react';
import AuthActionClient from './auth-action-client';

export default function AuthActionPage() {
  return (
    <Suspense fallback={null}>
      <AuthActionClient />
    </Suspense>
  );
}
