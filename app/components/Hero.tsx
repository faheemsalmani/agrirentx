'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, ShieldCheck, Users, Tractor } from 'lucide-react';

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 w-full h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center space-x-2 bg-brand-500/20 backdrop-blur-md border border-brand-400/30 rounded-full px-4 py-1.5 text-brand-100 text-sm font-semibold tracking-wide uppercase shadow-glow">
                            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                            <span>India's #1 Agri-Rental Network</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-heading text-white leading-tight drop-shadow-xl">
                            Empowering Every <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-yellow-400">
                                Harvest Season
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-200 max-w-xl font-light leading-relaxed">
                            Access premium, heavy-duty agriculture machinery instantly. From tractors to harvesters, we provide the tools to cultivate your success at minimal rental costs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-2xl hover:shadow-brand-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 group">
                                <span>Browse Equipment</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-2xl hover:shadow-brand-500/50 transition-all flex items-center justify-center space-x-3 group">
                                <div className="w-8 h-8 rounded-full bg-white text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                </div>
                                <span>Watch How It Works</span>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/10 mt-8">
                            {[
                                { icon: ShieldCheck, label: "Insured Fleet", value: "100%" },
                                { icon: Users, label: "Happy Farmers", value: "10k+" },
                                { icon: Star, label: "Top Rated", value: "4.9/5" },
                            ].map((stat, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <div className="flex items-center space-x-2 text-brand-300 mb-1">
                                        <stat.icon className="w-4 h-4" />
                                        <span className="text-xs uppercase tracking-wider font-semibold opacity-80">{stat.label}</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Visual (Interactive Card Concept) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="hidden lg:block relative ml-auto"
                    >
                        {/* Abstract Floating Card */}
                        <div className="relative z-10 glass-dark text-white p-8 rounded-3xl shadow-2xl max-w-sm transform rotate-3 hover:rotate-0 transition-transform duration-500 group cursor-pointer hover:shadow-brand-500/20">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>

                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Tractor className="w-8 h-8 text-brand-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">Featured Machine</h3>
                                    <p className="text-brand-300 text-sm">John Deere 5050D Turbo</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-brand-100 bg-brand-800">
                                                Performance
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-brand-100">
                                                95%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-brand-900 border border-brand-700">
                                        <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-400 w-[95%]"></div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                    <div className="text-sm">
                                        <p className="text-gray-400">Hourly Rate</p>
                                        <p className="text-xl font-bold text-yellow-400">₹499</p>
                                    </div>
                                    <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold shadow border border-brand-500 hover:bg-brand-500 transition-colors">
                                        Reserve Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white/80 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
}
