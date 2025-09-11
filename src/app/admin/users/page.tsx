'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { UserManagement } from '@/components/admin/user-management';

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <UserManagement />
    </AdminLayout>
  );
}

