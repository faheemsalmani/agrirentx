'use client';

import { Store, User, Mail, Lock, Phone, MapPin, Building, IdCard, Upload, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VendorRegister() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-4 py-12 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-96 h-96 bg-brand-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 sm:p-12 relative z-10">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-100 text-brand-600 mb-6 shadow-sm ring-4 ring-brand-50">
                        <Store size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading mb-2">Vendor Partner Registration</h1>
                    <p className="text-gray-500 max-w-md mx-auto">Join India's largest rental network. Start earning by renting out your equipment.</p>
                </div>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Shop Details */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-sm uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-2">
                                <Store size={14} /> Shop Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Shop Name</label>
                                    <div className="relative">
                                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <input type="text" placeholder="Agri Equipments Co." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Owner Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <input type="text" placeholder="Suraj Kumar" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4 md:col-span-2 border-t border-gray-100 pt-6">
                            <h3 className="text-sm uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-2">
                                <Phone size={14} /> Contact Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <input type="email" placeholder="shop@agrirentx.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <input type="tel" maxLength={10} placeholder="9876543210" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <input type="password" placeholder="••••••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="space-y-4 md:col-span-2 border-t border-gray-100 pt-6">
                            <h3 className="text-sm uppercase font-semibold text-gray-400 tracking-wider flex items-center gap-2">
                                <MapPin size={14} /> Location
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Shop Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <textarea rows={2} placeholder="Building No, Street, Landmark..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none resize-none" required></textarea>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">City / Town</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-brand-600 transition-colors" />
                                        <input type="text" placeholder="Bhopal" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">ID Proof Upload</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 transition-colors hover:border-brand-400 group-hover:bg-brand-50/30 cursor-pointer flex flex-col items-center justify-center gap-2 text-center h-[52px] !py-0 !pl-0 !pr-0">
                                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="Upload ID Proof" accept=".jpg,.jpeg,.png" required />
                                        <div className="flex items-center gap-2 text-gray-500 pointer-events-none">
                                            <Upload size={18} />
                                            <span className="text-sm font-medium">Upload ID (JPG/PNG)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3 pt-4">
                        <div className="relative flex items-center h-5">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors" required />
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">I agree to the </span>
                            <a href="#" className="font-medium text-brand-600 hover:text-brand-500 underline decoration-brand-200 underline-offset-2">Vendor Terms & Conditions</a>
                            <span className="text-gray-500"> and Privacy Policy.</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link href="/vendor/dashboard" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 group">
                            <span>Create Vendor Account</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        Already have a shop account? {' '}
                        <Link href="/vendor/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-1 group">
                            Login here <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
