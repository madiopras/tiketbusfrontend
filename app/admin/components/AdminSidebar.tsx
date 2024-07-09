'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../logo1.png'; // Import the logo

const AdminSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
    const pathname = usePathname();

    return (
        <aside className={`bg-gray-800 text-white h-full fixed top-0 left-0 z-30 w-64 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
            <div className="p-4 bg-gray-100 flex items-center justify-center">
                <Image src={logo} alt="Logo" className="h-18 w-auto" style={{ backgroundColor: 'transparent' }} />
            </div>
            <nav className="p-4">
                <ul>
                    <li className={`mb-2 ${pathname === '/admin/dashboard' ? 'bg-gray-700' : ''}`}>
                        <Link href="/admin/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                            Dashboard
                        </ Link>
                    </li>
                    <li className={`mb-2 ${pathname === '/admin/orders' ? 'bg-gray-700' : ''}`}>
                        <a href="/admin/orders" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17.25l1.5-1.5M15 12l-2.25-2.25M7.5 9.75L9 8.25M5.25 5.25h13.5v13.5H5.25z" />
                            </svg>
                            Order
                        </a>
                    </li>
                    <li className={`mb-2 ${pathname === '/admin/schedule' ? 'bg-gray-700' : ''}`}>
                        <a href="/admin/schedule" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H12M8 11H12M8 15H12M12 7L20 12 12 17M12 7L4 12 12 17" />
                            </svg>
                            Schedule
                        </a>
                    </li>
                    <li className={`mb-2 ${pathname === '/admin/payment' ? 'bg-gray-700' : ''}`}>
                        <a href="/admin/payment" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.28 0 4-1.72 4-4S14.28 0 12 0s-4 1.72-4 4 1.72 4 4 4zm0 2c-2.66 0-8 1.34-8 4v2h16v-2c0-2.66-5.34-4-8-4z" />
                            </svg>
                            Payment
                        </a>
                    </li>
                    <li className="mb-2">
                        <details className="group">
                            <summary className="flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-700 rounded">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 18M6 6L18 6M6 12L18 12M18 12L6 12M12 6L12 18M6 12L18 12M18 6L6 6M6 6L18 6" />
                                    </svg>
                                    Master
                                </div>
                                <span className="group-open:rotate-180 transition-transform">&#9662;</span>
                            </summary>
                            <ul className="pl-4">
                                <li className={`mb-2 ${pathname === '/admin/master/bus' ? 'bg-gray-700' : ''}`}>
                                    <Link href="/admin/master/bus" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8L7 5M7 5L11 8M7 5L7 15M13 3L17 6M17 6L21 3M17 6L17 16M4 19L20 19" />
                                        </svg>
                                        Bus
                                    </Link>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/seat' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/seat" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10L10 10M5 14L10 14M10 10L15 8M10 14L15 16M15 8L19 4M15 16L19 20" />
                                        </svg>
                                        Seat
                                    </a>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/specialdays' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/specialdays" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7L10 7M14 7L16 7M8 11L10 11M14 11L16 11M8 15L10 15M14 15L16 15M4 5L20 5L20 19L4 19L4 5Z" />
                                        </svg>
                                        Special Days
                                    </a>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/voucher' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/voucher" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 18M6 6L18 6M6 12L18 12M18 12L6 12M12 6L12 18M6 12L18 12M18 6L6 6M6 6L18 6" />
                                        </svg>
                                        Voucher
                                    </a>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/rutes' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/rutes" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20L14 20M14 4L10 4M10 20L14 20M14 4L10 4M4 20L20 20M4 4L20 4L20 20L4 20L4 4" />
                                        </svg>
                                        Routes
                                    </a>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/location' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/location" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 18M6 6L18 6M6 12L18 12M18 12L6 12M12 6L12 18M6 12L18 12M18 6L6 6M6 6L18 6" />
                                        </svg>
                                        Location
                                    </a>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/event' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/event" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V19M5 12H19" />
                                        </svg>
                                        Event
                                    </a>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/users' ? 'bg-gray-700' : ''}`}>
                                    <Link href="/admin/master/users" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 18M6 6L18 6M6 12L18 12M18 12L6 12M12 6L12 18M6 12L18 12M18 6L6 6M6 6L18 6" />
                                        </svg>
                                        Users
                                    </Link>
                                </li>
                                <li className={`mb-2 ${pathname === '/admin/master/role' ? 'bg-gray-700' : ''}`}>
                                    <a href="/admin/master/role" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded">
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 18M6 6L18 6M6 12L18 12M18 12L6 12M12 6L12 18M6 12L18 12M18 6L6 6M6 6L18 6" />
                                        </svg>
                                        Role
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
