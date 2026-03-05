'use client';

import { User, Mail, Lock, Phone, MapPin, Building, IdCard, Upload, Check, ArrowRight, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { registerCustomer } from '@/app/actions/customer';
import Toast from '@/app/components/Toast';

export default function CustomerRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const result = await registerCustomer(formData);
        setLoading(false);

        if (result.success) {
            setToast({ message: 'Registration Successful! You can now login.', type: 'success' });
            formRef.current?.reset();
            setTimeout(() => {
                router.push('/customer/login');
            }, 2000);
        } else {
            setToast({ message: result.message, type: 'error' });
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 py-12 relative overflow-hidden">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-200/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 sm:p-12 relative z-10 transition-all hover:shadow-blue-500/10">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6 shadow-sm ring-4 ring-blue-50">
                        <User size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading mb-2">Customer Registration</h1>
                    <p className="text-gray-500 max-w-md mx-auto italic">Join the AgriRentX community today!</p>
                </div>

                <form ref={formRef} action={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Details */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <User size={14} /> Personal Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                                        <input name="name" type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <Phone size={14} /> Contact Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                                        <input name="email" type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                                        <input name="mobile_number" type="tel" maxLength={10} placeholder="9876543210" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••••••"
                                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                            required
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
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-xs uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <MapPin size={14} /> Location Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="group md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">Full Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3.5 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                                        <textarea name="address" rows={2} placeholder="House No, Street, Area..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none" required></textarea>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">City / Town</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                                        <input name="city" type="text" placeholder="Ludhiana" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase">ID Proof</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 flex items-center justify-center gap-2 text-center h-[52px] transition-all hover:border-blue-400 hover:bg-blue-50/10 cursor-pointer">
                                        <input name="id_proof" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".jpg,.jpeg,.png" required />
                                        <Upload size={18} className="text-gray-400" />
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Upload JPG/PNG</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Free Account</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account? {' '}
                        <Link href="/customer/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                            Login here <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
