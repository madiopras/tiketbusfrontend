// /app/dashboard/page.tsx
'use client';

import { useUser } from '@/app/admin/context/UserContext';

export default function HomeAdmin() {
  const { user } = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome to your dashboard, {user.name}</p>}
    </div>
  );
}
