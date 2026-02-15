'use client';

import { Search, Filter, MapPin, Tractor } from 'lucide-react';
import { useState } from 'react';

export default function BrowseEquipment() {
    const equipments = [
        { id: 1, name: 'John Deere 5050D', type: 'Tractor', price: 1200, location: 'Punjab', image: 'https://images.unsplash.com/photo-1595115206963-cdaeb8ee2913?auto=format&fit=crop&q=80&w=300&h=200', available: true },
        { id: 2, name: 'Kubota Harvester', type: 'Harvester', price: 5000, location: 'Haryana', image: 'https://images.unsplash.com/photo-1530267981375-f0de93fe1e91?auto=format&fit=crop&q=80&w=300&h=200', available: true },
        { id: 3, name: 'Rotavator 6 Feet', type: 'Rotavator', price: 800, location: 'Punjab', image: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?auto=format&fit=crop&q=80&w=300&h=200', available: true },
        { id: 4, name: 'Sonalika 745', type: 'Tractor', price: 1100, location: 'UP', image: 'https://images.unsplash.com/photo-1605218457336-92748b6c4533?auto=format&fit=crop&q=80&w=300&h=200', available: false },
        { id: 5, name: 'Seed Drill', type: 'Seeder', price: 500, location: 'Punjab', image: 'https://images.unsplash.com/photo-1625246333195-58197ebd0031?auto=format&fit=crop&q=80&w=300&h=200', available: true },
        { id: 6, name: 'Mahindra Thresher', type: 'Thresher', price: 1500, location: 'Haryana', image: 'https://images.unsplash.com/photo-1515266591878-5a89d1e9e03d?auto=format&fit=crop&q=80&w=300&h=200', available: true },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search for tractors, harvesters, etc..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-gray-700 hover:bg-slate-100 transition-colors">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </button>
                    <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all">
                        Search
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {equipments.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${item.available ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
                                    } shadow-sm backdrop-blur-sm`}>
                                    {item.available ? 'Available' : 'Booked'}
                                </span>
                            </div>
                            <div className="absolute bottom-3 left-3">
                                <span className="px-2 py-1 rounded-lg text-xs font-bold bg-black/60 text-white backdrop-blur-sm shadow-sm flex items-center">
                                    <Tractor className="h-3 w-3 mr-1" />
                                    {item.type}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={item.name}>{item.name}</h3>
                                <div className="text-emerald-600 font-bold">₹{item.price}<span className="text-xs text-gray-400 font-normal">/day</span></div>
                            </div>

                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                <MapPin size={14} className="mr-1 text-gray-400" />
                                {item.location}
                            </div>

                            <button className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-brand-600 transition-colors shadow-sm active:scale-95 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!item.available}>
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
