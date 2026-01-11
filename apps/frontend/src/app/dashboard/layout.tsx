'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        // Simple client-side protection
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-900">Central CMS</h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <a href="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
                        Dashboard
                    </a>
                    <a href="/dashboard/pages" className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md">
                        Pages
                    </a>
                    {/* Add more links here */}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            router.push('/login');
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                    >
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header (Mobile mostly) */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between md:hidden">
                    <span className="font-bold">CMS</span>
                    <button className="text-gray-500">Menu</button>
                </header>

                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
