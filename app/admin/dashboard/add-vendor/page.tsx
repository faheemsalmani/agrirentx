'use client';

import { Store, User, Mail, Lock, Phone, MapPin, Building, Upload, Check } from 'lucide-react';

export default function AddVendor() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Add New Vendor</h1>
                    <p className="text-gray-500 text-sm mt-1">Manually register a shop partner</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
                <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <Store size={12} /> Shop Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Shop Name</label>
                                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Owner Name</label>
                                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <Phone size={12} /> Contact Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile</label>
                                    <input type="tel" maxLength={10} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                                    <input type="password" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <MapPin size={12} /> Location & ID
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                                    <textarea rows={2} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none resize-none" required></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                                    <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">ID Proof</label>
                                    <input type="file" className="block w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition-all" required />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="pt-2 flex justify-end">
                        <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-gray-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 text-sm">
                            <span>Create Vendor</span>
                            <Check className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
