'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, Tractor, Plus, Settings, LogOut, Trash2, Edit, Menu, X, Store, Users, ChevronDown, UserCircle } from 'lucide-react';
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
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [user, setUser] = useState<{ owner_name?: string, email?: string } | null>(null);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('vendor');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) { }
        }
    }, []);

    const sidebarLinks = [
        { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
        { name: 'Add Equipment', href: '/vendor/dashboard/add-equipment', icon: Plus },
        { name: 'Manage Equipment', href: '/vendor/dashboard/manage-equipment', icon: Settings },
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
                            (link.name === 'Manage Equipment' && pathname?.includes('manage'))
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

            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm flex items-center justify-between p-4 z-10 w-full shrink-0 relative h-[72px]">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700 mr-4">
                            <Menu size={24} />
                        </button>
                        <span className="font-semibold text-gray-900 lg:hidden">AgriRentX Vendor</span>
                    </div>

                    {/* Top Right Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                            className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 uppercase">
                                {user?.owner_name ? user.owner_name.charAt(0) : 'V'}
                            </div>
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">{user?.owner_name || 'Vendor User'}</span>
                            <ChevronDown size={16} className="text-slate-400" />
                        </button>

                        {showProfileDropdown && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 transform origin-top-right transition-all">
                                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                                        <p className="text-sm font-medium text-slate-900">{user?.owner_name || 'Vendor User'}</p>
                                        <p className="text-xs text-slate-500 truncate">{user?.email || 'vendor@agrirentx.com'}</p>
                                    </div>
                                    <Link href="/vendor/dashboard/profile" onClick={() => setShowProfileDropdown(false)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <UserCircle size={16} /> My Profile
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowProfileDropdown(false);
                                            setShowLogoutModal(true);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 relative z-50 cursor-pointer"
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
