'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
    return (
        <section className="py-24 bg-brand-50 overflow-hidden" id="testimonials">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h2 className="text-center text-4xl font-bold font-heading text-gray-900 mb-16">
                    Words from Our Farmers
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {[
                        {
                            text: "AgriRentX saved my harvest this year. The harvester arrived within 2 hours of booking, and the operator was very skilled. Increased my yield by 20% compared to manual labor.",
                            author: "Rajesh Kumar",
                            role: "Wheat Farmer, Punjab",
                            initial: "R"
                        },
                        {
                            text: "Renting a laser leveler was never this easy. The app is simple to use, and customer support speaks my language. Truly 'Jai Kisan' in spirit!",
                            author: "Sita Devi",
                            role: "Organic Farmer, Uttar Pradesh",
                            initial: "S"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
                        >
                            <div className="absolute top-6 right-8 text-brand-200 text-6xl font-serif">"</div>
                            <p className="text-lg text-gray-600 italic mb-6 relative z-10">
                                {item.text}
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl">
                                    {item.initial}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.author}</h4>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
