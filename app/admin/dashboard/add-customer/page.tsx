'use client';

import { User, Phone, MapPin, Building, Upload, Check } from 'lucide-react';

export default function AddCustomer() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Add New Customer</h1>
                    <p className="text-gray-500 text-sm mt-1">Manually register a new customer</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <User size={14} /> Personal Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <Phone size={14} /> Contact Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile</label>
                                    <input type="tel" maxLength={10} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                                    <input type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <MapPin size={14} /> Location & ID
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                                    <textarea rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none" required></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">ID Proof</label>
                                    <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" required />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2">
                            <span>Create Customer</span>
                            <Check className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
