'use client';

import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { getRecentBookings } from '@/app/actions/stats';
import { submitEquipment } from '@/app/actions/booking';

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
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBookings() {
            setLoading(true);
            // Assuming customer_id 1
            const data = await getRecentBookings(20, 1);
            setBookings(data);
            setLoading(false);
        }
        fetchBookings();
    }, []);

    async function handleReturnEquipment(bookingId: number, equipmentId: number) {
        if (!confirm('Are you sure you want to return this equipment?')) return;
        setLoading(true);
        const res = await submitEquipment(bookingId, equipmentId);
        if (res.success) {
            const data = await getRecentBookings(20, 1);
            setBookings(data);
        } else {
            alert(res.message);
        }
        setLoading(false);
    }

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
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading your bookings...</div>
                ) : filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                    <div key={booking.booking_id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-start md:items-center hover:shadow-md transition-shadow">
                        <div className="h-20 w-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center text-emerald-600">
                            {/* Use a placeholder icon if image_url is missing */}
                            <Calendar size={32} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg truncate">{booking.equipments?.equipment_name || 'Generic Equipment'}</h3>
                                    <p className="text-sm text-gray-500">Booking ID: #{1000 + booking.booking_id}</p>
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
                                    <span>{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}</span>
                                </div>
                                <div className="font-bold text-emerald-600">₹{booking.total_price}</div>
                            </div>
                        </div>

                        <div className="hidden md:block text-right flex-col items-end flex gap-2">
                            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 w-fit ${booking.status === 'Completed' ? 'bg-green-50 text-green-700' :
                                booking.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                                    booking.status === 'Active' ? 'bg-blue-50 text-blue-700' :
                                        'bg-slate-50 text-slate-700'
                                }`}>
                                {booking.status === 'Completed' && <CheckCircle2 size={14} />}
                                {booking.status === 'Pending' && <Clock size={14} />}
                                {booking.status}
                            </span>
                            {(booking.status === 'Active' || booking.status === 'Pending') && (
                                <button
                                    onClick={() => handleReturnEquipment(booking.booking_id, booking.equipment_id)}
                                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors mt-2"
                                >
                                    Return Equipment
                                </button>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                        <p className="text-gray-500 italic">No bookings found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
