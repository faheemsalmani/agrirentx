'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, Tractor, Plus, Settings, LogOut, Trash2, Edit, Menu, X, Store, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function VendorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarLinks = [
        { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
        { name: 'Add Equipment', href: '/vendor/dashboard/add-equipment', icon: Plus },
        { name: 'Update Equipment', href: '/vendor/dashboard/manage-equipment', icon: Edit },
        { name: 'Delete Equipment', href: '/vendor/dashboard/manage-equipment', icon: Trash2 },
        { name: 'My Customers', href: '/vendor/dashboard/my-customers', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-950 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0 flex flex-col shadow-2xl`}
            >
                <div className="bg-brand-900 p-6 flex items-center justify-between">
                    <Link href="/vendor/dashboard" className="flex items-center space-x-2 group">
                        <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                            <Store className="h-6 w-6 text-brand-400" />
                        </div>
                        <span className="text-xl font-bold font-heading tracking-tight text-white">
                            Vendor<span className="text-brand-400">Portal</span>
                        </span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-brand-200 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-semibold text-brand-400/80 uppercase tracking-wider mb-2">Management</p>
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = mounted && (
                            pathname === link.href ||
                            (link.name === 'Update Equipment' && pathname?.includes('update')) ||
                            (link.name === 'Delete Equipment' && pathname?.includes('delete'))
                        );
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group ${isActive
                                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/40'
                                    : 'text-brand-100/70 hover:bg-brand-800/50 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-white' : 'text-brand-400/70 group-hover:text-brand-300'} mr-3 transition-colors`} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-brand-900">
                    <button type="button" onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="w-full flex flex-row items-center px-4 py-3 text-sm font-medium text-brand-200 hover:text-red-300 hover:bg-brand-900/50 rounded-xl transition-all group">
                        <LogOut size={20} className="mr-3 text-brand-400 group-hover:text-red-400 transition-colors" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm lg:hidden flex items-center p-4">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-semibold text-gray-900">Vendor Dashboard</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
