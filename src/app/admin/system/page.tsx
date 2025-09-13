'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { SystemMonitoring } from '@/components/admin/system-monitoring';

export default function AdminSystemPage() {
  return (
    <AdminLayout>
      <SystemMonitoring />
    </AdminLayout>
  );
}




