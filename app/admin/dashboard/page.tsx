"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Store, Tractor, CalendarCheck, PackageCheck, TrendingUp, MoreHorizontal, Clock } from 'lucide-react';
import { getAdminStats, getRecentVendors, getRecentBookings, getPendingVendors, getPendingCustomers } from '@/app/actions/stats';
import { updateVendorStatus, updateCustomerStatus } from '@/app/actions/admin';
import Toast from '@/app/components/Toast';

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState({
        totalVendors: 0,
        totalCustomers: 0,
        totalEquipments: 0,
        availableEquipments: 0,
        bookedEquipments: 0
    });
    const [recentVendors, setRecentVendors] = useState<any[]>([]);
    const [recentBookings, setRecentBookings] = useState<any[]>([]);
    const [pendingVendors, setPendingVendors] = useState<any[]>([]);
    const [pendingCustomers, setPendingCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    async function fetchData() {
        setLoading(true);
        const [stats, vendors, bookings, pVendors, pCustomers] = await Promise.all([
            getAdminStats(),
            getRecentVendors(3),
            getRecentBookings(3),
            getPendingVendors(),
            getPendingCustomers()
        ]);
        setStatsData(stats);
        setRecentVendors(vendors);
        setRecentBookings(bookings);
        setPendingVendors(pVendors);
        setPendingCustomers(pCustomers);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleApproval = async (id: number, type: 'vendor' | 'customer', status: 'Approved' | 'Rejected') => {
        const result = type === 'vendor'
            ? await updateVendorStatus(id, status)
            : await updateCustomerStatus(id, status);

        if (result.success) {
            setToast({ message: result.message || 'Updated successfully', type: 'success' });
            fetchData();
        } else {
            setToast({ message: result.message || 'Update failed', type: 'error' });
        }
    };

    const stats = [
        { name: 'Total Vendors', value: statsData.totalVendors.toString(), icon: Store, change: '+0%', color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Total Customers', value: statsData.totalCustomers.toString(), icon: Users, change: '+0%', color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Total Equipments', value: statsData.totalEquipments.toString(), icon: Tractor, change: '+0%', color: 'text-brand-600', bg: 'bg-brand-100' },
        { name: 'Available Equipments', value: statsData.availableEquipments.toString(), icon: PackageCheck, change: 'Now', color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Booked Equipments', value: statsData.bookedEquipments.toString(), icon: CalendarCheck, change: 'Active', color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-heading">Admin Overview</h1>
                <div className="text-sm text-gray-500">Last updated: {loading ? 'Updating...' : 'Just now'}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={20} />
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.name}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pending Approvals Section */}
            {(pendingVendors.length > 0 || pendingCustomers.length > 0) && (
                <div className="bg-white rounded-2xl shadow-sm border border-brand-100 p-6 mt-8">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-brand-600" />
                        Pending Approvals
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pending Vendors */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Vendors ({pendingVendors.length})</h4>
                            {pendingVendors.map((vendor) => (
                                <div key={vendor.vendor_id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">{vendor.shop_name}</div>
                                        <div className="text-xs text-gray-500">{vendor.owner_name} • {vendor.city}</div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleApproval(vendor.vendor_id, 'vendor', 'Approved')}
                                            className="px-3 py-1.5 bg-brand-600 text-white text-[10px] font-bold rounded-lg hover:bg-brand-700 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleApproval(vendor.vendor_id, 'vendor', 'Rejected')}
                                            className="px-3 py-1.5 bg-gray-200 text-gray-700 text-[10px] font-bold rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pending Customers */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customers ({pendingCustomers.length})</h4>
                            {pendingCustomers.map((customer) => (
                                <div key={customer.customer_id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">{customer.name}</div>
                                        <div className="text-xs text-gray-500">{customer.email} • {customer.city}</div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleApproval(customer.customer_id, 'customer', 'Approved')}
                                            className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleApproval(customer.customer_id, 'customer', 'Rejected')}
                                            className="px-3 py-1.5 bg-gray-200 text-gray-700 text-[10px] font-bold rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Recent Vendors</h3>
                        <Link href="/admin/dashboard/vendors" className="text-sm text-brand-600 font-medium hover:text-brand-700">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {recentVendors.length > 0 ? recentVendors.map((vendor) => (
                            <div key={vendor.vendor_id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                                        {vendor.shop_name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">{vendor.shop_name}</div>
                                        <div className="text-xs text-gray-500">{vendor.city}</div>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${vendor.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                    {vendor.status}
                                </span>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-500 text-sm">No vendors found</div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Recent Bookings</h3>
                        <Link href="/admin/dashboard/bookings" className="text-sm text-brand-600 font-medium hover:text-brand-700">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {recentBookings.length > 0 ? recentBookings.map((booking) => (
                            <div key={booking.booking_id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors">
                                        <CalendarCheck size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">{booking.equipments?.equipment_name || 'Equipment'}</div>
                                        <div className="text-xs text-gray-500">#{1000 + booking.booking_id} • {booking.status}</div>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${booking.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                    {booking.status}
                                </span>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-500 text-sm">No bookings found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
