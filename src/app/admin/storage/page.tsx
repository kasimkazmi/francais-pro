'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { UserStorageManagement } from '@/components/admin/user-storage-management';

export default function AdminStoragePage() {
  return (
    <AdminLayout>
      <UserStorageManagement />
    </AdminLayout>
  );
}

