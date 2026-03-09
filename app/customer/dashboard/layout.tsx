'use client';

import { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Search,
    MessageSquare,
    PlusCircle,
    LogOut,
    Menu,
    X,
    Tractor
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CustomerLayout({
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
        { name: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
        { name: 'Browse Equipment', href: '/customer/dashboard/browse', icon: Search },
        { name: 'Feedback Pending', href: '/customer/dashboard/pending-feedback', icon: MessageSquare },
        { name: 'Give Feedback', href: '/customer/dashboard/give-feedback', icon: PlusCircle },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0 flex flex-col shadow-2xl`}
            >
                <div className="bg-slate-950 p-6 flex items-center justify-between">
                    <Link href="/customer/dashboard" className="flex items-center space-x-2 group">
                        <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:bg-emerald-400 transition-colors">
                            <Tractor className="h-6 w-6 text-slate-900" />
                        </div>
                        <span className="text-xl font-bold font-heading tracking-tight text-white">
                            Customer<span className="text-emerald-500">Panel</span>
                        </span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = mounted && pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'} mr-3 transition-colors`} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button type="button" onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-all group">
                        <LogOut size={20} className="mr-3 text-slate-500 group-hover:text-red-400 transition-colors" />
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
                    <span className="ml-4 font-semibold text-gray-900">AgriRentX Customer</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
