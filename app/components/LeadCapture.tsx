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
                                    <p className="text-xl font-bold text-white">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-600/20 rounded-full flex items-center justify-center border border-brand-500/30">
                                    <Mail className="w-5 h-5 text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email Us</p>
                                    <p className="text-xl font-bold text-white">faheem@agrirentx.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-brand-600/20 rounded-full flex items-center justify-center border border-brand-500/30">
                                    <MapPin className="w-5 h-5 text-brand-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Headquarters</p>
                                    <p className="text-lg font-bold text-white">Sector 62, Noida, Uttar Pradesh</p>
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

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                        placeholder="Ram"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                        placeholder="Singh"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                    placeholder="+91 99999 99999"
                                />
                            </div>

                            <div>
                                <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">Equipment Needed</label>
                                <select
                                    id="equipment"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                                >
                                    <option>Select Equipment</option>
                                    <option>Tractor (45-55 HP)</option>
                                    <option>Combine Harvester</option>
                                    <option>Rotavator</option>
                                    <option>JCB / Excavator</option>
                                    <option>Transportation Truck</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                    placeholder="Need operator also? For how many days?"
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-brand-500/25 transition-all flex items-center justify-center space-x-2"
                            >
                                <span>Submit Request</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
