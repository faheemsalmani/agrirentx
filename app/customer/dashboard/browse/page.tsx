'use client';

import { Search, Filter, MapPin, Tractor, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllEquipments } from '@/app/actions/stats';
import { bookEquipment } from '@/app/actions/booking';

// Matches the database structure securely
interface Equipment {
    equipment_id: number;
    equipment_name: string;
    type: string;
    price_per_day: number;
    image_url: string;
    status?: string;
    available?: boolean;
    location?: string;
}

export default function BrowseEquipment() {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    // State for booking selection
    const [bookingId, setBookingId] = useState<number | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [billDetails, setBillDetails] = useState<{ equipment: Equipment, days: number, total: number } | null>(null);

    useEffect(() => {
        fetchEquipments();
    }, []);

    async function fetchEquipments() {
        setLoading(true);
        try {
            const data = await getAllEquipments();
            if (data && Array.isArray(data)) {
                // Safely use data directly as there is no status column in equipments schema
                setEquipments(data as Equipment[]);
            }
        } catch (err) {
            console.error('Failed to fetch equipments for browsing', err);
        } finally {
            setLoading(false);
        }
    }

    const filtered = equipments.filter((e) => {
        const q = searchTerm.toLowerCase();
        return (
            (e.equipment_name && e.equipment_name.toLowerCase().includes(q)) ||
            (e.type && e.type.toLowerCase().includes(q))
        );
    });

    const handleBookNow = (id: number) => {
        if (bookingId === id) {
            // Toggle off
            setBookingId(null);
        } else {
            // Reset dates when switching equipment
            setStartDate('');
            setEndDate('');
            setBookingId(id);
        }
    };

    const handleConfirmBooking = (item: Equipment) => {
        if (!startDate || !endDate) return;
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end < start) {
            alert("End date cannot be before Start date");
            return;
        }
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive calculation
        const total = diffDays * item.price_per_day;
        setBillDetails({ equipment: item, days: diffDays, total: total });
    };

    const proceedToPayment = async () => {
        if (!billDetails) return;
        setBookingLoading(true);

        const formData = new FormData();
        // Assume customer_id 1
        formData.append('customer_id', '1');
        formData.append('equipment_id', String(billDetails.equipment.equipment_id));
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('total_price', String(billDetails.total));

        const result = await bookEquipment(formData);

        setBookingLoading(false);
        if (result.success) {
            alert('Booking confirmed!');
            setBillDetails(null);
            setBookingId(null);
            setStartDate('');
            setEndDate('');
            fetchEquipments(); // refresh available equipments
        } else {
            alert('Booking failed: ' + result.message);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up pb-10">
            {/* Search and Filters Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search for tractors, harvesters, etc..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-gray-700 hover:bg-slate-100 transition-colors text-sm font-semibold">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </button>
                    <button className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all text-sm font-semibold">
                        Search
                    </button>
                </div>
            </div>

            {/* Equipments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="font-medium text-sm">Loading available equipment...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                        <Tractor className="w-12 h-12 text-slate-300 mb-3" />
                        <p className="font-semibold text-lg text-slate-600">No equipment found directly matching your search.</p>
                        <p className="text-sm mt-1">Try typing a different name or type.</p>
                    </div>
                ) : (
                    filtered.map((item) => (
                        <div key={item.equipment_id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">

                            {/* Card Image Area */}
                            <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                                {item.image_url && !item.image_url.startsWith('placeholder') ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.equipment_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIgcnk9IjIiLz48Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSIvPjxwYXRoIGQ9Ik0yMSAxNWwtNS01TDUgMjEiLz48L3N2Zz4='; // Fail-safe SVG fallback
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500 bg-slate-100">
                                        <Tractor size={48} className="opacity-20 mb-2" />
                                        <span className="text-xs uppercase font-semibold opacity-50">{item.type}</span>
                                    </div>
                                )}

                                {/* Task 2 overlay Status Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md flex items-center gap-1.5 ${item.available ? 'bg-brand-500/90 text-white border border-brand-400/50' : 'bg-red-500/90 text-white border border-red-400/50'}`}>
                                        {item.available ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                        {item.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>

                                <div className="absolute bottom-3 left-3">
                                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-sm shadow-sm flex items-center">
                                        <Tractor className="h-3 w-3 mr-1.5" />
                                        {item.type}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content Area */}
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={item.equipment_name}>{item.equipment_name}</h3>
                                </div>
                                <div className="text-brand-600 font-bold text-xl mb-3">₹{item.price_per_day}<span className="text-xs text-gray-400 font-normal">/day</span></div>

                                <div className="flex items-center text-gray-500 text-xs mb-4">
                                    <MapPin size={14} className="mr-1 text-gray-400" />
                                    {item.location || 'Local Vendor'}
                                </div>

                                {/* Booking Action Area */}
                                <div className="mt-auto">
                                    {/* Task 2 Booking Fields Expanded State */}
                                    {bookingId === item.equipment_id ? (
                                        <div className="space-y-3 pt-3 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Start Date</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                                        <input
                                                            type="date"
                                                            className="w-full pl-8 pr-2 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-500 outline-none hover:border-brand-300 transition-colors"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">End Date</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                                        <input
                                                            type="date"
                                                            className="w-full pl-8 pr-2 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-500 outline-none hover:border-brand-300 transition-colors"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 pt-1">
                                                <button
                                                    onClick={() => setBookingId(null)}
                                                    className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleConfirmBooking(item)}
                                                    className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                                    disabled={!item.available || !startDate || !endDate}
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleBookNow(item.equipment_id)}
                                            disabled={!item.available}
                                            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-brand-600 transition-colors shadow-sm active:scale-95 transform duration-200 relative overflow-hidden group disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-gray-300"
                                        >
                                            <span className="relative z-10">{item.available ? 'Book Now' : 'Currently Unavailable'}</span>
                                            {item.available && (
                                                <div className="absolute inset-0 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0"></div>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bill Modal */}
            {billDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                                Booking Summary
                            </h3>
                            <button onClick={() => {
                                setBillDetails(null);
                                setBookingId(null);
                                setStartDate('');
                                setEndDate('');
                            }} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50" disabled={bookingLoading}>
                                <XCircle className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex flex-col gap-1 items-center pb-2 border-b border-slate-50">
                                <span className="text-xs uppercase tracking-wider font-bold text-gray-400">Total Payable</span>
                                <span className="font-bold text-brand-600 text-3xl">₹{billDetails.total}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-gray-500">Equipment Name</span>
                                <span className="font-semibold text-gray-900 max-w-[150px] truncate" title={billDetails.equipment.equipment_name}>{billDetails.equipment.equipment_name}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-gray-500">Rate per day</span>
                                <span className="font-semibold text-gray-900">₹{billDetails.equipment.price_per_day}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-gray-500">Duration Scheduled</span>
                                <span className="font-semibold text-gray-900">{billDetails.days} {billDetails.days === 1 ? 'Day' : 'Days'}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-gray-500">Dates Selected</span>
                                <span className="font-mono text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">{startDate} - {endDate}</span>
                            </div>
                        </div>
                        <div className="p-5 pt-0 mt-2">
                            <button onClick={proceedToPayment} disabled={bookingLoading} className="w-full py-3.5 bg-slate-900 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg transition-colors active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed">
                                <span>{bookingLoading ? 'Processing...' : 'Proceed to Payment (Demo)'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
