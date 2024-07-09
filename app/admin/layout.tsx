'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProvider } from '../admin/context/UserContext'
import AdminNavbar from './components/AdminNavbar';
import AdminSidebar from './components/AdminSidebar';
import AdminFooter from './components/AdminFooter';

interface Props {
    children: ReactNode;
}

const AdminDashboardLayout = ({ children }: Props) => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async () => {
        const token = localStorage.getItem('adminToken');

        const res = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (res.ok) {
            localStorage.removeItem('adminToken');
            router.push('/loginxsqwt');
        } else {
            alert('Logout failed');
        }
    };

    return (
        <div className="flex min-h-screen">
            <AdminSidebar isSidebarOpen={isSidebarOpen} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <AdminNavbar handleLogout={handleLogout} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 p-4">
                    <UserProvider>
                    {children}
                    </UserProvider>
                </main>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
