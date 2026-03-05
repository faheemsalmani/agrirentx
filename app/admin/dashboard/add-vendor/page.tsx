'use client';

import { Store, User, Mail, Lock, Phone, MapPin, Building, Upload, Check, Loader2, Eye, EyeOff } from 'lucide-react';
import { addVendor } from '@/app/actions/admin';
import { useFormStatus } from 'react-dom';
import { useState, useRef } from 'react';
import Toast from '@/app/components/Toast';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-gray-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                </>
            ) : (
                <>
                    <span>Create Vendor</span>
                    <Check className="w-4 h-4" />
                </>
            )}
        </button>
    );
}

export default function AddVendor() {
    const formRef = useRef<HTMLFormElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    async function clientAction(formData: FormData) {
        // We will now pass id_proof file to server payload.
        const result = await addVendor(formData);
        if (result.success) {
            setToast({ message: 'Vendor added successfully!', type: 'success' });
            formRef.current?.reset();
        } else {
            setToast({ message: result.message || 'Failed to add vendor', type: 'error' });
        }
    }

    return (
        <div className="max-w-2xl mx-auto pb-10">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 font-heading">Add New Vendor</h1>
                    <p className="text-gray-500 text-xs mt-1">Manually register a shop partner</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                <form ref={formRef} action={clientAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <div className="space-y-3 md:col-span-2">
                            <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <Store size={12} /> Shop Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Shop Name</label>
                                    <input name="shop_name" type="text" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Owner Name</label>
                                    <input name="owner_name" type="text" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 md:col-span-2">
                            <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <Phone size={12} /> Contact Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Email</label>
                                    <input name="email" type="email" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Mobile</label>
                                    <input name="mobile_number" type="tel" maxLength={10} className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div className="group relative">
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            className="w-full px-2.5 py-1.5 pr-10 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 md:col-span-2">
                            <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <MapPin size={12} /> Location & ID
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Address</label>
                                    <textarea name="address" rows={2} className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none resize-none" required></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">City</label>
                                    <input name="city" type="text" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">ID Proof</label>
                                    <input name="id_proof" type="file" className="block w-full text-[10px] text-gray-500 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 transition-all" required />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="pt-2 flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
