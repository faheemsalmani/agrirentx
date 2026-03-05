'use client';

import { Tractor, Info, IndianRupee, Image as ImageIcon, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import { submitEquipment } from '@/app/actions/equipment';
import { useRouter } from 'next/navigation';

export default function VendorAddEquipment() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const actionClient = async (formData: FormData) => {
        setLoading(true);
        setMessage(null);
        // Assuming vendor_id 1 for now (in a real app, from context/session)
        formData.append('vendor_id', '1');

        const result = await submitEquipment(formData);

        if (result.success) {
            setMessage({ type: 'success', text: result.message || 'Equipment listed successfully!' });
            setImagePreview(null);
            formRef.current?.reset();
            setTimeout(() => {
                router.push('/vendor/dashboard/manage-equipment');
            }, 1000);
        } else {
            setMessage({ type: 'error', text: result.message || 'Failed to list equipment.' });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Add More Equipment</h1>
                    <p className="text-brand-600 text-sm mt-1 font-medium">Earn more by listing more!</p>
                </div>
            </div>

            {message && (
                <div className={`px-4 py-3 rounded-xl border flex items-center shadow-lg animate-bounce-in mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                    {message.type === 'success' ? <Check className="h-5 w-5 mr-2 text-green-500" /> : <Info className="h-5 w-5 mr-2" />}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
                <form ref={formRef} action={actionClient} className="p-5 space-y-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Equipment Name</label>
                                <div className="relative">
                                    <Tractor className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                                    <input name="equipment_name" type="text" placeholder="e.g. Mahindra 575 DI" className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required disabled={loading} />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Type / Category</label>
                                <div className="relative">
                                    <select name="type" className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none appearance-none cursor-pointer" required disabled={loading}>
                                        <option value="">Select Category</option>
                                        <option value="tractor">Tractor</option>
                                        <option value="harvester">Combine Harvester</option>
                                        <option value="cultivator">Cultivator</option>
                                        <option value="rotavator">Rotavator</option>
                                        <option value="plough">Plough</option>
                                        <option value="pump">Water Pump</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Rent Per Day (₹)</label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                                    <input name="price_per_day" type="number" placeholder="1500" className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none" required min="0" disabled={loading} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="group h-full flex flex-col">
                                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Equipment Image</label>
                                <div className={`relative flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all hover:border-brand-400 hover:bg-brand-50/10 group-hover:border-brand-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px] ${imagePreview ? 'border-brand-500 bg-brand-50/20' : ''}`}>
                                    <input name="image" type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" title="Upload Image" accept=".jpg,.jpeg,.png,.webp" required disabled={loading} />

                                    {imagePreview ? (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <img src={imagePreview} alt="Preview" className="max-h-32 rounded-lg object-contain shadow-sm" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg text-white font-medium text-xs">
                                                Change
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-gray-400 group-hover:text-brand-500 group-hover:bg-brand-100 transition-colors">
                                                <ImageIcon size={20} />
                                            </div>
                                            <p className="text-[10px] text-gray-500">
                                                JPG/PNG/WEBP. MAX 10MB.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Description</label>
                        <div className="relative">
                            <Info className="absolute left-3 top-3 text-gray-400 h-4 w-4 group-focus-within:text-brand-600 transition-colors" />
                            <textarea name="description" rows={2} placeholder="Provide details like model year, condition, horsepower..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all outline-none resize-none" required disabled={loading}></textarea>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button type="submit" disabled={loading} className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
                            <span>{loading ? 'Listing...' : 'List Equipment'}</span>
                            {!loading && <Check className="w-4 h-4" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
