'use client';

import { LayoutDashboard, MessageSquarePlus, MessageSquareDiff, Search, LogOut, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const sidebarLinks = [
        { name: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
        { name: 'Browse Equipment', href: '/customer/dashboard/browse', icon: Search },
        { name: 'Feedback Pending', href: '/customer/dashboard/pending-feedback', icon: MessageSquareDiff },
        { name: 'Give Feedback', href: '/customer/dashboard/give-feedback', icon: MessageSquarePlus },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-emerald-950 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0 flex flex-col shadow-2xl`}
            >
                <div className="bg-emerald-900 p-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
                            <User className="h-6 w-6 text-emerald-400" />
                        </div>
                        <span className="text-xl font-bold font-heading tracking-tight text-white">
                            Customer<span className="text-emerald-400">Portal</span>
                        </span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-emerald-200 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-semibold text-emerald-400/80 uppercase tracking-wider mb-2">Menu</p>
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                                    : 'text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-white' : 'text-emerald-400/70 group-hover:text-emerald-300'} mr-3 transition-colors`} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-emerald-900">
                    <Link href="/" className="flex items-center px-4 py-3 text-sm font-medium text-emerald-200 hover:text-emerald-100 hover:bg-emerald-900/50 rounded-xl transition-all group">
                        <LogOut size={20} className="mr-3 text-emerald-400 group-hover:text-red-400 transition-colors" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm lg:hidden flex items-center p-4">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-700">
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-semibold text-gray-900">Customer Dashboard</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
