'use client';

import { User, Phone, MapPin, Building, Upload, Check, Loader2 } from 'lucide-react';
import { addCustomer } from '@/app/actions/admin';
import { useFormStatus } from 'react-dom';
import { useState, useRef } from 'react';
import Toast from '@/app/components/Toast';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                </>
            ) : (
                <>
                    <span>Create Customer</span>
                    <Check className="w-4 h-4" />
                </>
            )}
        </button>
    );
}

export default function AddCustomer() {
    const formRef = useRef<HTMLFormElement>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    async function clientAction(formData: FormData) {
        const result = await addCustomer(formData);
        if (result.success) {
            setToast({ message: 'Customer added successfully!', type: 'success' });
            formRef.current?.reset();
        } else {
            setToast({ message: result.message || 'Failed to add customer', type: 'error' });
        }
    }

    return (
        <div className="max-w-2xl mx-auto pb-10">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 font-heading">Add New Customer</h1>
                    <p className="text-gray-500 text-xs mt-1">Manually register a new customer</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                <form ref={formRef} action={clientAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <div className="space-y-3 md:col-span-2">
                            <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                                <User size={12} /> Personal Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input name="name" type="text" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
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
                                    <input name="email" type="email" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Mobile</label>
                                    <input name="mobile_number" type="tel" maxLength={10} className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">Password</label>
                                    <input name="password" type="password" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
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
                                    <textarea name="address" rows={2} className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none" required></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">City</label>
                                    <input name="city" type="text" className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-700 mb-1">ID Proof (Optional)</label>
                                    <input name="id_proof" type="file" className="block w-full text-[10px] text-gray-500 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" required />
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
