'use client';

import { Search, MapPin, Phone, Mail, User } from 'lucide-react';
import { useState } from 'react';

export default function MyCustomers() {
    // Mock customer data
    const customers = [
        { id: 1, name: 'Rahul Sharma', email: 'rahul.farmer@example.com', phone: '+91 98765 43210', location: 'Punjab, India', totalRentals: 15, lastRental: '2 Days ago', status: 'Active' },
        { id: 2, name: 'Priya Singh', email: 'priya.s@example.com', phone: '+91 87654 32109', location: 'Haryana, India', totalRentals: 8, lastRental: '1 Week ago', status: 'Inactive' },
        { id: 3, name: 'Amit Verma', email: 'amit.v@example.com', phone: '+91 76543 21098', location: 'Uttar Pradesh, India', totalRentals: 22, lastRental: 'Yesterday', status: 'Active' },
        { id: 4, name: 'Suresh Kumar', email: 'suresh.k@example.com', phone: '+91 65432 10987', location: 'Madhya Pradesh, India', totalRentals: 5, lastRental: '1 Month ago', status: 'Active' },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">My Customers</h1>
                    <p className="text-gray-500 text-sm">View and manage the farmers who rent your equipment.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-full sm:w-64 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-brand-50 p-3 rounded-full text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                <User size={24} />
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${customer.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                {customer.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1">{customer.name}</h3>

                        <div className="space-y-2 mt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" />
                                <span className="truncate">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" />
                                <span>{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-gray-400" />
                                <span>{customer.location}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center text-sm">
                            <div>
                                <span className="block text-gray-400 text-xs uppercase font-bold tracking-wider">Rentals</span>
                                <span className="font-semibold text-gray-900">{customer.totalRentals}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-gray-400 text-xs uppercase font-bold tracking-wider">Last Interaction</span>
                                <span className="font-semibold text-gray-900">{customer.lastRental}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
