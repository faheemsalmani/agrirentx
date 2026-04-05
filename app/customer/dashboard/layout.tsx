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
    Tractor,
    ChevronDown,
    UserCircle
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
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [user, setUser] = useState<{name?: string, email?: string} | null>(null);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('customer');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {}
        }
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

            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm flex items-center justify-between p-4 z-10 w-full shrink-0 relative h-[72px]">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 mr-4">
                            <Menu size={24} />
                        </button>
                        <span className="font-semibold text-gray-900 lg:hidden">AgriRentX Customer</span>
                    </div>

                    {/* Top Right Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                        >
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200 uppercase">
                                {user?.name ? user.name.charAt(0) : 'C'}
                            </div>
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">{user?.name || 'Customer User'}</span>
                            <ChevronDown size={16} className="text-slate-400" />
                        </button>

                        {showProfileDropdown && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 transform origin-top-right transition-all">
                                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                                        <p className="text-sm font-medium text-slate-900">{user?.name || 'Customer User'}</p>
                                        <p className="text-xs text-slate-500 truncate">{user?.email || 'customer@example.com'}</p>
                                    </div>
                                    <Link href="/customer/dashboard/profile" onClick={() => setShowProfileDropdown(false)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors flex items-center gap-2">
                                        <UserCircle size={16} /> My Profile
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            setShowProfileDropdown(false);
                                            setShowLogoutModal(true);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Are you sure?</h3>
                        <p className="text-slate-500 mb-6">Do you really want to logout from your account?</p>
                        <div className="flex justify-end space-x-3">
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors font-medium shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
