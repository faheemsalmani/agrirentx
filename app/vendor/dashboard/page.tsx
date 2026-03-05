'use client';

import { useEffect, useState } from 'react';
import { Tractor, CalendarCheck, PackageCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { getVendorStats } from '@/app/actions/stats';

export default function VendorDashboard() {
    const [statsData, setStatsData] = useState({
        totalEquipments: 0,
        availableEquipments: 0,
        bookedEquipments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            // Assuming vendor_id 1 for now, or fetch all if not logged in
            // In a real app, this would come from the session
            const data = await getVendorStats(1);
            setStatsData(data);
            setLoading(false);
        }
        fetchStats();
    }, []);

    const stats = [
        { name: 'Total Equipments', value: statsData.totalEquipments.toString(), icon: Tractor, change: '+0', color: 'text-brand-600', bg: 'bg-brand-100' },
        { name: 'Available for Rent', value: statsData.availableEquipments.toString(), icon: PackageCheck, change: 'Now', color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { name: 'Currently Booked', value: statsData.bookedEquipments.toString(), icon: CalendarCheck, change: 'Active', color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 font-heading">My Shop Overview</h1>
                <div className="text-sm text-gray-500">Shop: AgriEquip Traders</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100 hover:border-brand-300 hover:shadow-brand-500/10 transition-all group relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-transparent to-brand-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} shadow-sm`}>
                                    <Icon size={24} />
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-brand-50 text-brand-700'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className="relative z-10">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.name}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-brand-100 p-8 text-center mt-8">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                        <Truck size={32} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Want to earn more?</h2>
                    <p className="text-gray-500 mb-6">Add more equipment to your inventory to reach more customers.</p>
                    <Link href="/vendor/dashboard/add-equipment" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-600 hover:bg-brand-700 shadow-lg hover:shadow-brand-500/30 transition-all">
                        Add New Equipment
                    </Link>
                </div>
            </div>
        </div>
    );
}
