'use client';

import { Menu, Search, Phone, Tractor, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Marquee Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white text-sm font-medium py-2 overflow-hidden shadow-sm relative z-50">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="mx-8 font-bold text-yellow-300 trekking-wide tracking-wider text-base drop-shadow-sm">
                        जय जवान, जय किसान, जय विज्ञान (Jai Jawan, Jai Kisan, Jai Vigyan)
                    </span>
                    <span className="mx-8 border-l border-brand-400 pl-8">
                        Start Your Rental Journey Today - Only Premium Agriculture Equipment
                    </span>
                    <span className="mx-8 border-l border-brand-400 pl-8">
                        Call Now: +91 98765 43210
                    </span>
                    <span className="mx-8 font-bold text-yellow-300 trekking-wide tracking-wider text-base drop-shadow-sm">
                        जय जवान, जय किसान, जय विज्ञान (Jai Jawan, Jai Kisan, Jai Vigyan)
                    </span>
                    <span className="mx-8 border-l border-brand-400 pl-8">
                        Partner with India's Largest Rental Network
                    </span>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 group cursor-pointer">
                            <div className="bg-brand-600 p-2 rounded-lg group-hover:bg-brand-500 transition-colors shadow-lg">
                                <Tractor className="h-8 w-8 text-white animate-bounce-slow" />
                            </div>
                            <span className={`text-2xl font-bold font-heading tracking-tight ${scrolled ? 'text-brand-900' : 'text-white drop-shadow-lg'}`}>
                                AgriRent<span className="text-brand-500">X</span>
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {['Home', 'About Us', 'Equipment', 'Services', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className={`text-sm font-medium transition-colors hover:text-brand-500 relative group overflow-hidden ${scrolled ? 'text-gray-700' : 'text-white shadow-black drop-shadow-md'
                                        }`}
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                </a>
                            ))}

                            <button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>Get a Quote</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-md ${scrolled ? 'text-gray-700' : 'text-white'}`}
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-white shadow-xl overflow-hidden glass"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                {['Home', 'About Us', 'Equipment', 'Services', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </a>
                                ))}
                                <button className="w-full mt-4 bg-brand-600 text-white py-3 rounded-lg font-semibold shadow-md">
                                    Get a Quote Now
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
