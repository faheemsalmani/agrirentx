'use client';

import { Store, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginVendor } from '@/app/actions/vendor';
import Toast from '@/app/components/Toast';

export default function VendorLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await loginVendor(formData);
        setLoading(false);

        if (result.success) {
            if (result.vendor) {
                localStorage.setItem('vendor', JSON.stringify(result.vendor));
            }
            setToast({ message: 'Login Successful! Welcome Vendor.', type: 'success' });
            setTimeout(() => {
                router.push('/vendor/dashboard');
            }, 1000);
        } else {
            setToast({ message: result.message, type: 'error' });
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-4 relative overflow-hidden">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10 transition-all hover:shadow-brand-500/10">
                <div className="flex flex-col items-center mb-6 text-center">
                    <div className="bg-brand-100 p-2.5 rounded-xl mb-3 text-brand-700 ring-4 ring-brand-50">
                        <Store size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">Vendor Portal Login</h1>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Manage your shop and fleet</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors h-4 w-4" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                                placeholder="shop@agrirentx.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-600 transition-colors h-4 w-4" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full pl-9 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 focus:ring-brand-500 transition-colors" />
                            <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Keep me active</span>
                        </label>
                        <a href="#" className="text-brand-600 hover:text-brand-700 transition-colors">Forgot?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-brand-500/30 flex items-center justify-center space-x-2 group text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Access Dashboard</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                        New partner? {' '}
                        <Link href="/vendor/register" className="font-bold text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-1 group">
                            Enroll shop <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                    <Link href="/" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
