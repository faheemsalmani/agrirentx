'use client';

import { useState, useEffect } from 'react';
import { Store, User, Mail, Shield, Check, Phone } from 'lucide-react';

export default function VendorProfile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('vendor');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {}
        }
        setLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            localStorage.setItem('vendor', JSON.stringify(user));
            alert('Profile updated successfully!');
            window.location.reload();
        }
    };

    if (loading) return null;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 font-heading">My Profile</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your personal information and security.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Store size={16} className="text-gray-400" /> Shop Name
                            </label>
                            <input
                                type="text"
                                value={user?.shop_name || ''}
                                onChange={(e) => setUser({ ...user, shop_name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User size={16} className="text-gray-400" /> Owner Name
                            </label>
                            <input
                                type="text"
                                value={user?.owner_name || ''}
                                onChange={(e) => setUser({ ...user, owner_name: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> Mobile Number
                            </label>
                            <input
                                type="tel"
                                value={user?.mobile_number || ''}
                                onChange={(e) => setUser({ ...user, mobile_number: e.target.value })}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" /> Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full px-4 py-2 bg-slate-100 border border-slate-200 text-gray-500 cursor-not-allowed rounded-lg"
                                title="Email address cannot be changed"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button type="submit" className="bg-brand-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-brand-700 transition-colors">
                            <Check size={16} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Security</h2>
                        <p className="text-sm text-gray-500">Manage your password and security settings.</p>
                    </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                    <div>
                        <h3 className="font-semibold text-gray-900">Password</h3>
                        <p className="text-sm text-gray-500">Forgot your password? Send a reset link to your email.</p>
                    </div>
                    <button 
                        disabled
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-400 rounded-lg text-sm font-semibold cursor-not-allowed hidden md:block"
                    >
                        Reset Password
                    </button>
                    <button 
                        disabled
                        className="w-full py-2.5 bg-white border border-slate-200 text-slate-400 rounded-lg text-sm font-semibold cursor-not-allowed md:hidden"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
}
