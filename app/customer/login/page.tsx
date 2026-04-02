'use client';

import { User, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginCustomer } from '@/app/actions/customer';
import Toast from '@/app/components/Toast';

export default function CustomerLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await loginCustomer(formData);
        setLoading(false);

        if (result.success) {
            if (result.customer) {
                localStorage.setItem('customer', JSON.stringify(result.customer));
            }
            setToast({ message: 'Login Successful! Welcome to AgriRentX.', type: 'success' });
            setTimeout(() => {
                router.push('/customer/dashboard');
            }, 1000);
        } else {
            setToast({ message: result.message, type: 'error' });
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

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
                    <h1 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">Customer Login</h1>
                    <p className="text-gray-500 text-xs mt-1 font-medium italic">Your premium farming experience awaits</p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors h-4 w-4" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors h-4 w-4" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm"
                                placeholder="••••••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        <label className="flex items-center space-x-2 cursor-pointer group hover:text-gray-700 transition-colors">
                            <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">Forgot?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Login to Account</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                        New here? {' '}
                        <Link href="/customer/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                            Register now <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                    <Link href="/" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
