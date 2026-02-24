'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Store } from 'lucide-react';
import Link from 'next/link';
import { getAllVendors } from '@/app/actions/stats';

interface Vendor {
    vendor_id: number;
    shop_name: string;
    owner_name: string;
    email: string;
    mobile_number: string;
    city: string;
    status: string;
    created_at: string;
}

export default function VendorsPage() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVendors() {
            setLoading(true);
            const data = await getAllVendors();
            setVendors(data as Vendor[]);
            setLoading(false);
        }
        fetchVendors();
    }, []);

    const filtered = vendors.filter((v) => {
        const q = search.toLowerCase();
        return (
            v.shop_name.toLowerCase().includes(q) ||
            v.owner_name.toLowerCase().includes(q) ||
            v.email.toLowerCase().includes(q) ||
            v.mobile_number.includes(q) ||
            v.city.toLowerCase().includes(q) ||
            v.status.toLowerCase().includes(q)
        );
    });

    const statusBadge = (status: string) => {
        const map: Record<string, string> = {
            Approved: 'bg-emerald-50 text-emerald-700',
            Pending: 'bg-amber-50 text-amber-700',
            Rejected: 'bg-red-50 text-red-700',
        };
        return map[status] || 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading flex items-center gap-2">
                        <Store className="w-6 h-6 text-brand-600" />
                        Vendors
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all vendors available in the system</p>
                </div>
                <Link
                    href="/admin/dashboard/add-vendor"
                    className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-sm self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Add Vendor
                </Link>
            </div>

            {/* Search + Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                {/* Search Bar */}
                <div className="p-4 sm:p-5 flex justify-end border-b border-slate-100">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search vendors...."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-5 py-3">#</th>
                                <th className="px-5 py-3">Shop Name</th>
                                <th className="px-5 py-3">Owner</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Mobile</th>
                                <th className="px-5 py-3">City</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="px-5 py-16 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm">Loading vendors…</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-5 py-16 text-center text-gray-400 text-sm">
                                        No vendors found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((v) => (
                                    <tr key={v.vendor_id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-5 py-3 font-medium text-gray-400">{v.vendor_id}</td>
                                        <td className="px-5 py-3 font-semibold text-gray-900 whitespace-nowrap">{v.shop_name}</td>
                                        <td className="px-5 py-3 text-gray-700 whitespace-nowrap">{v.owner_name}</td>
                                        <td className="px-5 py-3 text-gray-600">{v.email}</td>
                                        <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{v.mobile_number}</td>
                                        <td className="px-5 py-3 text-gray-600">{v.city}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusBadge(v.status)}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 whitespace-nowrap text-xs">
                                            {new Date(v.created_at).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer count */}
                {!loading && (
                    <div className="px-5 py-3 border-t border-slate-100 text-xs text-gray-400">
                        Showing {filtered.length} of {vendors.length} vendors
                    </div>
                )}
            </div>
        </div>
    );
}
