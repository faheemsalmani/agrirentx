'use client';

import { motion } from 'framer-motion';
import { Target, Leaf, History, Award } from 'lucide-react';

export default function About() {
    return (
        <section id="about-us" className="py-24 bg-brand-50 relative overflow-hidden">

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-20"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-2">Our Legacy</h2>
                    <h3 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 leading-tight">
                        Cultivating Trust Since 1995
                    </h3>
                    <div className="w-24 h-1 bg-brand-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 text-lg text-gray-700 leading-relaxed font-light"
                    >
                        <p>
                            <strong className="text-brand-700 font-semibold">AgriRentX (Agriculture Equipment Rental Private Limited)</strong> stands at the forefront of India's agricultural revolution. We are not merely a rental service; we are a partner in every farmer's journey towards prosperity.
                        </p>
                        <p>
                            Founded with the vision of <span className="italic text-gray-900">"Mechanization for All,"</span> we bridge the gap between small-scale farmers and high-end technological machinery. Understanding that capital investment in heavy machinery is a significant burden, we provide a shared economy model that democratizes access to state-of-the-art tractors, harvesters, and precision farming tools.
                        </p>
                        <p>
                            Our fleet is meticulously maintained by certified engineers to ensure zero downtime during critical harvest windows. From the fertile plains of Punjab to the rich delta of the Godavari, AgriRentX is the silent engine powering India's food security.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-500 hover:shadow-lg transition-shadow">
                                <History className="w-8 h-8 text-brand-600 mb-3" />
                                <h4 className="font-bold text-gray-900 mb-1">25+ Years</h4>
                                <p className="text-sm text-gray-500">Of Industry Excellence</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                                <Award className="w-8 h-8 text-yellow-600 mb-3" />
                                <h4 className="font-bold text-gray-900 mb-1">ISO 9001:2015</h4>
                                <p className="text-sm text-gray-500">Certified Quality</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="/farmer1.jpg"
                                alt="Farmer in field"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8"
                            />
                            <img
                                src="/sonalika1.png"
                                alt="High Tech Tractor"
                                className="rounded-2xl shadow-xl w-full h-64 object-cover transform -translate-y-8"
                            />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-2xl border-4 border-brand-100 flex items-center justify-center">
                                <Leaf className="w-12 h-12 text-brand-600 fill-current" />
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Mission & Vision */}
                <div className="mt-24 grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:border-brand-300 transition-colors">
                        <div className="absolute top-0 right-0 bg-brand-50 w-32 h-32 rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-start space-x-4 relative z-10">
                            <div className="bg-brand-100 p-3 rounded-lg text-brand-700">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    To empower Indian farmers by providing affordable, accessible, and advanced agricultural machinery, thereby increasing productivity, reducing manual labor, and improving the quality of life for the farming community.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:border-yellow-300 transition-colors">
                        <div className="absolute top-0 right-0 bg-yellow-50 w-32 h-32 rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="flex items-start space-x-4 relative z-10">
                            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-700">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    To be the global leader in agricultural equipment rental services, fostering a sustainable ecosystem where technology and tradition coexist to feed the world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
