'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function LeadCapture() {
    return (
        <section id="contact" className="py-24 relative bg-gray-900 overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1605000797499-95a05f52636c?q=80&w=2940&auto=format&fit=crop"
                    alt="Field at night"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">

                    <div className="space-y-8 text-white">
                        <h2 className="text-4xl font-bold font-heading">
                            Ready to Upgrade Your Harvest?
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Get a customized quote for your farm's needs. Our team of agricultural experts will help you choose the right machinery for your specific crop and terrain.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-600/20 rounded-full flex items-center justify-center border border-brand-500/30">
                                    <Phone className="w-5 h-5 text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Call Us 24/7</p>
                                    <p className="text-xl font-bold text-white">+91 9026684407</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-600/20 rounded-full flex items-center justify-center border border-brand-500/30">
                                    <Mail className="w-5 h-5 text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email Us</p>
                                    <p className="text-xl font-bold text-white">faheembug237@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-600/20 rounded-full flex items-center justify-center border border-brand-500/30">
                                    <MapPin className="w-5 h-5 text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Headquarters</p>
                                    <p className="text-lg font-bold text-white">Lucknow ,Uttar Pradesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Callback</h3>
                        <p className="text-gray-500 mb-6 text-sm">Fill in your details and we'll contact you within 15 minutes.</p>

                        <form action={async (formData) => {
                            const { submitCallbackForm } = await import('@/app/actions/callback');
                            const toast = (await import('react-hot-toast')).default;
                            const res = await submitCallbackForm(formData);
                            if (res.success) {
                                toast.success(res.message);
                                const formElement = document.getElementById('lead-callback-form') as HTMLFormElement;
                                formElement?.reset();
                            } else {
                                toast.error(res.message);
                            }
                        }} id="lead-callback-form" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        pattern="[A-Za-z\s]+"
                                        title="Only alphabets are allowed"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Enter First Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name </label>
                                    <input
                                        required
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        pattern="[A-Za-z\s]+"
                                        title="Only alphabets are allowed"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    id="number"
                                    name="number"
                                    pattern="[0-9]{10}"
                                    title="Please enter a 10-digit phone number"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="e.g. 9876543210"
                                />
                            </div>

                            <div>
                                <label htmlFor="equipment_needed" className="block text-sm font-medium text-gray-700 mb-1">Select Equipment</label>
                                <select
                                    required
                                    id="equipment_needed"
                                    name="equipment_needed"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                                >
                                    <option value="">Select Machinery</option>
                                    <option value="Tractor (45-55 HP)">Tractor (45-55 HP)</option>
                                    <option value="Combine Harvester">Combine Harvester</option>
                                    <option value="Rotavator">Rotavator</option>
                                    <option value="JCB / Excavator">JCB / Excavator</option>
                                    <option value="Transportation Truck">Transportation Truck</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements (Optional)</label>
                                <textarea
                                    id="query"
                                    name="query"
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="Briefly describe your needs..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-500/25 transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
                            >
                                <span>Request Callback Now</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
