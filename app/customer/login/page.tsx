'use client';

import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CustomerLogin() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 relative z-10 transition-all hover:shadow-blue-500/10">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-100 p-3 rounded-xl mb-4 text-blue-700 ring-4 ring-blue-50">
                        <User size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Customer Login</h1>
                    <p className="text-gray-500 text-sm mt-1">Welcome back to AgriRentX</p>
                </div>

                <form className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors h-5 w-5" />
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors h-5 w-5" />
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                placeholder="••••••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors" />
                            <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot Password?</a>
                    </div>

                    <Link href="/" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2 group">
                        <span>Login to Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-4">
                        Don't have an account? {' '}
                        <Link href="/customer/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                            Register now <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
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
