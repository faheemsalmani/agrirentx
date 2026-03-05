'use client';

import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function PendingFeedback() {
    const pendingReviews = [
        { id: 102, equipment: 'Rotavator 6 Feet', vendor: 'Haryana Tools', date: 'Oct 20, 2024', image: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 103, equipment: 'Harvester Combine', vendor: 'Punjab Agro', date: 'Oct 15, 2024', image: 'https://images.unsplash.com/photo-1530267981375-f0de93fe1e91?auto=format&fit=crop&q=80&w=100&h=100' },
    ];

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Feedback Pending</h1>
            <p className="text-slate-500">Share your experience to help other farmers make better choices.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingReviews.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-start">
                        <img src={item.image} alt={item.equipment} className="w-24 h-24 rounded-xl object-cover bg-slate-100" />

                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{item.equipment}</h3>
                            <p className="text-sm text-gray-500 mb-4">Rented from <span className="font-semibold text-emerald-600">{item.vendor}</span> on {item.date}</p>

                            <Link
                                href={`/customer/dashboard/give-feedback?bookingId=${item.id}`}
                                className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-sm border border-emerald-100"
                            >
                                <Star size={16} className="mr-2" />
                                Rate Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {pendingReviews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No pending feedback</h3>
                    <p className="text-slate-500">You have rated all your completed bookings.</p>
                </div>
            )}
        </div>
    );
}
