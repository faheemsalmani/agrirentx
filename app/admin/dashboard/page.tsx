'use client';

import { Users, Store, Tractor, CalendarCheck, PackageCheck, TrendingUp, MoreHorizontal } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { name: 'Total Vendors', value: '124', icon: Store, change: '+12%', color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Total Customers', value: '2,845', icon: Users, change: '+5%', color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Total Equipments', value: '532', icon: Tractor, change: '+18%', color: 'text-brand-600', bg: 'bg-brand-100' },
        { name: 'Available Equipments', value: '315', icon: PackageCheck, change: '-2%', color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Booked Equipments', value: '217', icon: CalendarCheck, change: '+8%', color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-heading">Admin Overview</h1>
                <div className="text-sm text-gray-500">Last updated: Just now</div>
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

            {/* Recent Activity Section (Example content to fill space) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Recent Vendors</h3>
                        <button className="text-sm text-brand-600 font-medium hover:text-brand-700">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                                        V{i}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">AgriShop {i}</div>
                                        <div className="text-xs text-gray-500">Joined 2 days ago</div>
                                    </div>
                                </div>
                                <MoreHorizontal size={16} className="text-gray-400 group-hover:text-gray-600" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">Recent Bookings</h3>
                        <button className="text-sm text-brand-600 font-medium hover:text-brand-700">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors">
                                        <CalendarCheck size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">Booking #{1000 + i}</div>
                                        <div className="text-xs text-gray-500">Scheduled for tomorrow</div>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">Pending</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
