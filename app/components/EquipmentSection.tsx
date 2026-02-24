'use client';

import { motion } from 'framer-motion';
import { Tractor, MapPin, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const equipments = [
    { id: 1, name: 'John Deere 5050D', type: 'Tractor', price: 1200, location: 'Punjab', image: '/Sonalika 745.jpg', available: true },
    { id: 2, name: 'Kubota Harvester', type: 'Harvester', price: 5000, location: 'Haryana', image: '/Kubota Harvester.jpg', available: true },
    { id: 3, name: 'Rotavator 6 Feet', type: 'Rotavator', price: 800, location: 'Punjab', image: '/Rotavator 6 Feet.jpg', available: true },
    { id: 4, name: 'Sonalika 745', type: 'Tractor', price: 1100, location: 'UP', image: '/Sonalika 745.jpg', available: true },
];

export default function EquipmentSection() {
    return (
        <section id="equipment" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-2">Our Premium Fleet</h2>
                        <h3 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 leading-tight">
                            Ready for Your <span className="text-brand-600">Next Harvest</span>
                        </h3>
                        <p className="mt-4 text-gray-600 text-lg font-light leading-relaxed">
                            Explore our range of heavy-duty machinery maintained to the highest standards.
                        </p>
                    </div>
                    <Link href="/customer/register" className="inline-flex items-center space-x-2 text-brand-600 font-bold hover:text-brand-700 transition-colors group">
                        <span>View All Equipment</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {equipments.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-md text-brand-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                                        {item.type}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-white/20">
                                        <ShieldCheck size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{item.name}</h4>
                                </div>

                                <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                                    <div className="flex items-center">
                                        <MapPin size={14} className="mr-1 text-brand-500" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Tractor size={14} className="mr-1 text-brand-500" />
                                        <span>Verified</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Starting from</p>
                                        <div className="text-2xl font-bold text-gray-900">
                                            ₹{item.price}<span className="text-xs text-gray-400 font-normal">/day</span>
                                        </div>
                                    </div>
                                    <Link href="/customer/login" className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-brand-600 transition-colors shadow-lg shadow-slate-200">
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
