'use client';

import { useEffect, useState } from 'react';

const AdminDashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Simulate an API call 
        setTimeout(() => {
            setData({
                orders: 120,
                users: 80,
                revenue: 10000
            });
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded shadow">
                        <div className="h-6 w-1/3 bg-gray-300 animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <div className="h-6 w-1/3 bg-gray-300 animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <div className="h-6 w-1/3 bg-gray-300 animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-bold">Orders</h3>
                        <p>{data.orders}</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-bold">Users</h3>
                        <p>{data.users}</p>
                    </div>
                    <div className="p-4 bg-white rounded shadow">
                        <h3 className="text-lg font-bold">Revenue</h3>
                        <p>${data.revenue}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;
