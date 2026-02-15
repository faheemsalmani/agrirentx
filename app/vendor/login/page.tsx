'use client';

import { Store, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function VendorLogin() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 relative z-10 transition-all hover:shadow-brand-500/10">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-brand-100 p-3 rounded-xl mb-4 text-brand-700 ring-4 ring-brand-50">
                        <Store size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Vendor Login</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your shop and equipment</p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors h-5 w-5" />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                                placeholder="shop@agrirentx.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors h-5 w-5" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors" />
                            <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-brand-600 hover:text-brand-700 font-medium transition-colors">Forgot Password?</a>
                    </div>

                    <Link href="/vendor/dashboard" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-brand-500/30 flex items-center justify-center space-x-2 group">
                        <span>Log In to Dashboard</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-4">
                        New to AgriRentX? {' '}
                        <Link href="/vendor/register" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-1 group">
                            Register your shop <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                    <Link href="/" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
