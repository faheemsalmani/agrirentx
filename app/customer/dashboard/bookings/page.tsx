'use client';

import { Calendar, CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { useState } from 'react';

// Since I don't know if shadcn is installed, I'll build a custom Tab component to be safe and "minimal code"
function CustomTabs({ tabs, activeTab, setActiveTab }: { tabs: string[], activeTab: string, setActiveTab: (t: string) => void }) {
    return (
        <div className="flex space-x-2 bg-slate-100 p-1 rounded-xl mb-6 w-fit">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                        ? 'bg-white text-emerald-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState('All');

    const bookings = [
        { id: 101, equipment: 'John Deere Tractor', vendor: 'Punjab Agro', date: '2024-10-24', status: 'Pending', amount: 1200, image: 'https://images.unsplash.com/photo-1595115206963-cdaeb8ee2913?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 102, equipment: 'Rotavator', vendor: 'Haryana Tools', date: '2024-10-20', status: 'Completed', amount: 800, image: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 103, equipment: 'Harvester', vendor: 'Punjab Agro', date: '2024-10-15', status: 'Completed', amount: 5000, image: 'https://images.unsplash.com/photo-1530267981375-f0de93fe1e91?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 104, equipment: 'Seed Drill', vendor: 'Kisan Seva', date: '2024-10-25', status: 'Active', amount: 500, image: 'https://images.unsplash.com/photo-1625246333195-58197ebd0031?auto=format&fit=crop&q=80&w=100&h=100' },
    ];

    const filteredBookings = activeTab === 'All'
        ? bookings
        : bookings.filter(b => b.status === activeTab);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">My Bookings</h1>

            <CustomTabs
                tabs={['All', 'Pending', 'Active', 'Completed']}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="space-y-4">
                {filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center hover:shadow-md transition-shadow">
                        <div className="h-20 w-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                            <img src={booking.image} alt={booking.equipment} className="h-full w-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg truncate">{booking.equipment}</h3>
                                    <p className="text-sm text-gray-500">Vendor: {booking.vendor}</p>
                                </div>
                                <div className="text-right block md:hidden">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${booking.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                        booking.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                                            booking.status === 'Active' ? 'bg-blue-50 text-blue-700' :
                                                'bg-slate-50 text-slate-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>{booking.date}</span>
                                </div>
                                <div className="font-bold text-emerald-600">₹{booking.amount}</div>
                            </div>
                        </div>

                        <div className="hidden md:block text-right">
                            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 ${booking.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                booking.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                                    booking.status === 'Active' ? 'bg-blue-50 text-blue-700' :
                                        'bg-slate-50 text-slate-700'
                                }`}>
                                {booking.status === 'Completed' && <CheckCircle2 size={14} />}
                                {booking.status === 'Pending' && <Clock size={14} />}
                                {booking.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
