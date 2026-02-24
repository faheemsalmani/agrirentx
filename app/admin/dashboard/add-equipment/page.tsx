'use client';

import { Tractor, Info, IndianRupee, Image as ImageIcon, Upload, Check, Loader2, Store } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { addEquipment } from '@/app/actions/admin';
import Toast from '@/app/components/Toast';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding...</span>
                </>
            ) : (
                <>
                    <span>Add Equipment</span>
                    <Check className="w-4 h-4" />
                </>
            )}
        </button>
    );
}

export default function AddEquipment() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    async function clientAction(formData: FormData) {
        const result = await addEquipment(formData);
        if (result.success) {
            setToast({ message: 'Equipment added successfully!', type: 'success' });
            formRef.current?.reset();
            setImagePreview(null);
        } else {
            setToast({ message: result.message || 'Failed to add equipment', type: 'error' });
        }
    }

    return (
        <div className="max-w-2xl mx-auto pb-10">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 font-heading">Add New Equipment</h1>
                    <p className="text-gray-500 text-xs mt-1">List a new machine for rental</p>
                </div>
                <Link href="/admin/dashboard" className="text-xs text-gray-500 hover:text-gray-900 font-medium">Cancel</Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <form ref={formRef} action={clientAction} className="p-4 space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-[10px] font-semibold text-gray-700 mb-1 ml-1">Vendor / Owner ID</label>
                                <div className="relative">
                                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                                    <input name="vendor_id" type="number" placeholder="Enter Vendor ID" className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-semibold text-gray-700 mb-1 ml-1 uppercase tracking-wider">Equipment Name</label>
                                <div className="relative">
                                    <Tractor className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                                    <input name="equipment_name" type="text" placeholder="e.g. John Deere 5310" className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-semibold text-gray-700 mb-1 ml-1">Type / Category</label>
                                <div className="relative">
                                    <select name="type" className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none appearance-none cursor-pointer shadow-sm shadow-gray-100" required>
                                        <option value="">Select Type</option>
                                        <option value="tractor" className="bg-white">Tractor</option>
                                        <option value="harvester" className="bg-white">Harvester</option>
                                        <option value="cultivator" className="bg-white">Cultivator</option>
                                        <option value="rotavator" className="bg-white">Rotavator</option>
                                        <option value="sprayer" className="bg-white">Sprayer</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-semibold text-gray-700 mb-1 ml-1">Price Per Day (₹)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                                    <input name="price_per_day" type="number" placeholder="2000" className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required min="0" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="group h-full flex flex-col">
                                <label className="block text-[10px] font-semibold text-gray-700 mb-1 ml-1">Equipment Image</label>
                                <div className={`relative flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all hover:border-brand-400 hover:bg-brand-50/10 group-hover:border-brand-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] ${imagePreview ? 'border-brand-500 bg-brand-50/20' : ''}`}>
                                    <input name="image_url" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" title="Upload Image" accept=".jpg,.jpeg,.png" required />

                                    {imagePreview ? (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <img src={imagePreview} alt="Preview" className="max-h-32 rounded-lg object-contain shadow-sm" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg text-white font-medium text-xs">
                                                Change Image
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400 group-hover:text-brand-500 group-hover:bg-brand-100 transition-colors">
                                                <ImageIcon size={20} />
                                            </div>
                                            <p className="text-xs font-medium text-gray-900">Click to upload image</p>
                                            <p className="text-[10px] text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-semibold text-gray-700 mb-1 ml-1">Description</label>
                        <div className="relative">
                            <Info className="absolute left-3 top-3 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                            <textarea name="description" rows={3} placeholder="Describe the equipment, its condition, and capabilities..." className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none resize-none" required></textarea>
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
