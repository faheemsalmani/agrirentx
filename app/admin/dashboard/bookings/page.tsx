'use client';

import { useEffect, useState } from 'react';
import { Search, CalendarDays, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { getAllBookings } from '@/app/actions/stats';

interface Booking {
    booking_id: number;
    customer_id: number;
    equipment_id: number;
    start_date: string;
    end_date: string;
    total_price: number;
    status: string;
    created_at: string;
    equipments?: { equipment_name: string };
    customers?: { name: string };
}

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            setLoading(true);
            try {
                const data = await getAllBookings();
                if (data && Array.isArray(data)) {
                    setBookings(data);
                } else {
                    setBookings([]);
                }
            } catch (err) {
                console.error('Failed to fetch bookings', err);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    const filtered = bookings.filter((b) => {
        const q = search.toLowerCase();
        return (
            (b.equipments?.equipment_name && b.equipments.equipment_name.toLowerCase().includes(q)) ||
            (b.customers?.name && b.customers.name.toLowerCase().includes(q)) ||
            (b.status && b.status.toLowerCase().includes(q)) ||
            (b.booking_id && b.booking_id.toString().includes(q))
        );
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading flex items-center gap-2">
                        <CalendarDays className="w-6 h-6 text-brand-600" />
                        Bookings
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all equipment bookings in the system</p>
                </div>
            </div>

            {/* Search + Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-4 sm:p-5 flex justify-end border-b border-slate-100">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bookings...."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-slate-50/50">
                                <th className="px-5 py-4">ID</th>
                                <th className="px-5 py-4">Customer</th>
                                <th className="px-5 py-4">Equipment</th>
                                <th className="px-5 py-4">Start Date</th>
                                <th className="px-5 py-4">End Date</th>
                                <th className="px-5 py-4">Total Price</th>
                                <th className="px-5 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-16 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm">Loading bookings…</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-16 text-center text-gray-500 text-sm">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((b) => (
                                    <tr key={b.booking_id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">#{1000 + b.booking_id}</td>
                                        <td className="px-5 py-4 whitespace-nowrap font-medium text-gray-900">{b.customers?.name || 'Customer'}</td>
                                        <td className="px-5 py-4 text-gray-500">{b.equipments?.equipment_name || 'Equipment'}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-gray-600">{new Date(b.start_date).toLocaleDateString()}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-gray-600">{new Date(b.end_date).toLocaleDateString()}</td>
                                        <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-900">₹{b.total_price}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            {b.status === 'Completed' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                                </span>
                                            )}
                                            {b.status === 'Active' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                                                </span>
                                            )}
                                            {b.status === 'Pending' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-semibold border border-yellow-100">
                                                    <Clock className="w-3.5 h-3.5" /> Pending
                                                </span>
                                            )}
                                            {!['Completed', 'Active', 'Pending'].includes(b.status || '') && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                                                    {b.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer count */}
                {!loading && (
                    <div className="px-5 py-4 border-t border-slate-100 text-xs text-gray-500 flex justify-end items-center bg-slate-50/50 rounded-b-2xl">
                        <span>Showing {filtered.length} of {bookings.length} bookings</span>
                    </div>
                )}
            </div>
        </div>
    );
}
