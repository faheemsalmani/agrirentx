'use client';

import { Star, Send, XCircle } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPendingFeedbackBookings, submitFeedback } from '@/app/actions/booking';

function GiveFeedbackContent() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [bookingId, setBookingId] = useState<number | ''>('');
    const [pendingBookings, setPendingBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchOptions() {
            setLoading(true);
            const data = await getPendingFeedbackBookings(1); // Assuming customer_id 1
            setPendingBookings(data);

            const initialBookingId = searchParams.get('bookingId');
            if (initialBookingId) {
                setBookingId(Number(initialBookingId));
            } else if (data.length > 0) {
                setBookingId(data[0].booking_id);
            }
            setLoading(false);
        }
        fetchOptions();
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingId || rating === 0) return;
        setLoading(true);
        const res = await submitFeedback(Number(bookingId), rating, comment);

        if (res.success) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                router.push('/customer/dashboard/pending-feedback');
            }, 2000);
        } else {
            alert(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto space-y-6 animate-fade-in-up">
            <h1 className="text-xl font-bold text-gray-900 font-heading">Give Feedback</h1>

            {showSuccess && (
                <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl border border-emerald-100 flex items-center shadow-lg animate-bounce-in">
                    <Star className="h-5 w-5 mr-2 text-emerald-500 fill-current" />
                    <span>Feedback submitted successfully!</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4 relative overflow-hidden">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 block">Select Booking</label>
                    <select
                        value={bookingId}
                        onChange={(e) => setBookingId(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        disabled={pendingBookings.length === 0}
                    >
                        {pendingBookings.length === 0 ? (
                            <option value="">No pending feedback available</option>
                        ) : (
                            pendingBookings.map((b) => (
                                <option key={b.booking_id} value={b.booking_id}>
                                    {b.equipments?.equipment_name || 'Equipment'} - Returned on {new Date(b.end_date).toLocaleDateString()}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 block">Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`p-1 rounded-full transition-transform hover:scale-110 focus:outline-none ${rating >= star ? 'text-amber-400' : 'text-slate-300'
                                    }`}
                            >
                                <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 block">Comment</label>
                    <textarea
                        rows={3}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400"
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={rating === 0 || !bookingId || loading}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium shadow-md shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
                    >
                        <Send size={16} className="mr-2" />
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function GiveFeedback() {
    return (
        <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading feedback form...</div>}>
            <GiveFeedbackContent />
        </Suspense>
    );
}
