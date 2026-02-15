'use client';

import { CalendarCheck, History, Clock, FileCheck } from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboard() {
    // Premium Design: Using card layout with vibrant, harmonious colors
    const stats = [
        { name: 'Total Bookings', value: '12', icon: History, change: 'All time', color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-200' },
        { name: 'Pending Bookings', value: '2', icon: Clock, change: 'Awaiting Vendor', color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
        { name: 'Completed Bookings', value: '8', icon: FileCheck, change: 'Succesfully Done', color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
        { name: 'My Bookings', value: '2', icon: CalendarCheck, change: 'Active Now', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
    ];

    const recentBookings = [
        { id: 101, equipment: 'John Deere Tractor 5050D', date: 'Oct 24, 2024', status: 'Pending', amount: '₹1200' },
        { id: 102, equipment: 'Rotavator 6 Feet', date: 'Oct 20, 2024', status: 'Completed', amount: '₹800' },
        { id: 103, equipment: 'Harvester Combine', date: 'Oct 15, 2024', status: 'Completed', amount: '₹5000' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading tracking-tight">Welcome back, Farmer!</h1>
                    <p className="text-slate-500 mt-1">Here is what is happening with your rentals today.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className={`bg-white rounded-2xl p-6 shadow-sm border ${stat.border} hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}>
                            <div className={`absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-transparent to-current opacity-5 rounded-bl-full transition-transform group-hover:scale-110 ${stat.color.replace('text-', 'text-')}`} />

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shadow-sm group-hover:rotate-6 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{stat.value}</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{stat.name}</div>
                                <div className={`text-xs font-medium inline-flex items-center px-2 py-0.5 rounded-full ${stat.bg} ${stat.color} bg-opacity-50`}>
                                    {stat.change}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Bookings Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">My Recent Bookings</h2>
                    <Link href="/customer/dashboard/bookings" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Booking ID</th>
                                <th className="px-6 py-4">Equipment</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">#{booking.id}</td>
                                    <td className="px-6 py-4">{booking.equipment}</td>
                                    <td className="px-6 py-4">{booking.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">{booking.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
