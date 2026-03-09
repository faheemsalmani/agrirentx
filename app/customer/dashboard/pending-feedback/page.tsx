'use client';

import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPendingFeedbackBookings } from '@/app/actions/booking';

export default function PendingFeedback() {
    const [pendingReviews, setPendingReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPending() {
            setLoading(true);
            const data = await getPendingFeedbackBookings(1); // Assuming customerId 1
            setPendingReviews(data);
            setLoading(false);
        }
        fetchPending();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Feedback Pending</h1>
            <p className="text-slate-500">Share your experience to help other farmers make better choices.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-12 text-slate-500">Loading your feedback pending list...</div>
                ) : (
                    pendingReviews.map((item) => (
                        <div key={item.booking_id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-600 flex-shrink-0">
                                <Star size={32} />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.equipments?.equipment_name || 'Equipment'}</h3>
                                <p className="text-sm text-gray-500 mb-4">Returned on <span className="font-semibold text-emerald-600">{new Date(item.end_date).toLocaleDateString()}</span></p>

                                <Link
                                    href={`/customer/dashboard/give-feedback?bookingId=${item.booking_id}`}
                                    className="inline-flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-sm border border-emerald-100"
                                >
                                    <Star size={16} className="mr-2" />
                                    Rate Now
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!loading && pendingReviews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No pending feedback</h3>
                    <p className="text-slate-500">You have rated all your completed bookings.</p>
                </div>
            )}
        </div>
    );
}
