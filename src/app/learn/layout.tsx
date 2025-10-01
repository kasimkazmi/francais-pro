'use client';

import LearnLayout from '@/components/layout/learn-layout';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <LearnLayout>{children}</LearnLayout>
    </AuthGuard>
  );
}

