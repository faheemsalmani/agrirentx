'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, Clock, CheckCircle2, ListTodo, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getCustomerStats, getRecentBookings } from '@/app/actions/stats';

export default function CustomerDashboard() {
    const [statsData, setStatsData] = useState({
        totalBookings: 0,
        activeBookings: 0,
        pendingBookings: 0,
        completedBookings: 0
    });
    const [recentBookings, setRecentBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            // Assuming customer_id 1 for now
            const [stats, bookings] = await Promise.all([
                getCustomerStats(1),
                getRecentBookings(2, 1)
            ]);
            setStatsData(stats);
            setRecentBookings(bookings);
            setLoading(false);
        }
        fetchData();
    }, []);

    const stats = [
        { name: 'Total Bookings', value: statsData.totalBookings.toString(), icon: ListTodo, change: 'Lifetime', color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'My Bookings', value: statsData.activeBookings.toString(), icon: CalendarCheck, change: 'Active', color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Pending Bookings', value: statsData.pendingBookings.toString(), icon: Clock, change: 'Action Needed', color: 'text-orange-600', bg: 'bg-orange-100' },
        { name: 'Completed Bookings', value: statsData.completedBookings.toString(), icon: CheckCircle2, change: 'History', color: 'text-emerald-600', bg: 'bg-emerald-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Welcome Back!</h1>
                    <p className="text-gray-500 text-sm mt-1">Here is an overview of your rental activities.</p>
                </div>
                <Link href="/customer/dashboard/browse" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all text-sm flex items-center gap-2">
                    Browse Equipment <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-50 text-slate-600">
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

            {/* Recent Activity / Quick Actions Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-hidden relative">
                    <div className="relative z-10">
                        <h3 className="font-bold text-gray-900 mb-2">Need Equipment?</h3>
                        <p className="text-sm text-gray-500 mb-4 max-w-xs">Browse our catalog of tractors, harvesters, and more to find exactly what you need.</p>
                        <Link href="/customer/dashboard/browse" className="text-emerald-600 font-bold text-sm hover:underline">Start Browsing &rarr;</Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Recent Bookings</h3>
                        <Link href="/customer/dashboard/bookings" className="text-xs text-emerald-600 font-bold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {recentBookings.length > 0 ? recentBookings.map((booking) => (
                            <div key={booking.booking_id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{booking.equipments?.equipment_name || 'Equipment'}</p>
                                        <p className="text-xs text-gray-500">Starts {new Date(booking.start_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${booking.status === 'Pending' ? 'text-orange-600 bg-orange-50' : 'text-emerald-600 bg-emerald-50'}`}>
                                    {booking.status}
                                </span>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-500 text-sm italic">No recent bookings</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
