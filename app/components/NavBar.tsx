'use client';

import { Menu, X, Tractor, User, Store, ShieldCheck, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Marquee Header */}
            <div className="bg-gradient-to-r from-brand-800 to-brand-900 text-white text-xs sm:text-sm font-medium py-2 overflow-hidden shadow-sm relative z-50">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    <span className="mx-8 font-bold text-yellow-300 tracking-wider drop-shadow-sm">
                        जय जवान, जय किसान, जय विज्ञान
                    </span>
                    <span className="mx-8 border-l border-brand-600 pl-8 opacity-90">
                        Start Your Rental Journey Today - Only Premium Agriculture Equipment
                    </span>
                    <span className="mx-8 border-l border-brand-600 pl-8 opacity-90">
                        Call Now: +91 9026684407
                    </span>
                    <span className="mx-8 font-bold text-yellow-300 tracking-wider drop-shadow-sm">

                    </span>
                    <span className="mx-8 border-l border-brand-600 pl-8 opacity-90">
                        Partner with India&apos;s Largest Rental Network
                    </span>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className="sticky top-0 w-full z-40 bg-white py-3 shadow-lg transition-all duration-300"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
                            <div className="bg-brand-600 p-2 rounded-xl group-hover:bg-brand-500 transition-colors shadow-lg ring-2 ring-brand-100/50">
                                <Tractor className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-brand-900">
                                AgriRent<span className="text-brand-500">X</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                            {['Home', 'About Us', 'Equipment', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-sm font-medium transition-colors hover:text-brand-500 relative group text-gray-700"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                </a>
                            ))}

                            <div className="flex items-center space-x-3 ml-4">
                                <Link href="/admin/login" className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all border-gray-200 text-gray-500 hover:border-brand-500 hover:text-brand-600">
                                    Admin
                                </Link>

                                {/* Vendor Dropdown */}
                                <div className="relative group">
                                    <button
                                        className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all text-brand-900 hover:bg-brand-50"
                                    >
                                        <Store className="h-4 w-4" />
                                        <span>Vendor</span>
                                        <ChevronDown className="h-3 w-3 opacity-70" />
                                    </button>
                                    <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transform scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                                        <div className="p-1">
                                            <Link href="/vendor/login" className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg">
                                                <LogIn className="h-4 w-4" />
                                                <span>Login</span>
                                            </Link>
                                            <Link href="/vendor/register" className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg">
                                                <UserPlus className="h-4 w-4" />
                                                <span>Register</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Dropdown */}
                                <div className="relative group">
                                    <button
                                        className="flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>Customer</span>
                                        <ChevronDown className="h-3 w-3 opacity-70" />
                                    </button>
                                    <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden transform scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right">
                                        <div className="p-1">
                                            <Link href="/customer/login" className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg">
                                                <LogIn className="h-4 w-4" />
                                                <span>Login</span>
                                            </Link>
                                            <Link href="/customer/register" className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg">
                                                <UserPlus className="h-4 w-4" />
                                                <span>Register</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-3">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
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
                            className="lg:hidden bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100 overflow-hidden"
                        >
                            <div className="px-4 pt-4 pb-8 space-y-1">
                                {['Home', 'About Us', 'Equipment', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </a>
                                ))}

                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 px-2">
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">Access Portals</div>

                                    <Link href="/admin/login" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl">
                                        <ShieldCheck className="h-5 w-5 text-gray-400" />
                                        <span className="font-medium">Admin Login</span>
                                    </Link>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/vendor/login" className="flex flex-col items-center justify-center p-3 text-center bg-gray-50 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition-colors border border-gray-100">
                                            <Store className="h-5 w-5 mb-1" />
                                            <span className="text-xs font-semibold">Vendor Login</span>
                                        </Link>
                                        <Link href="/customer/login" className="flex flex-col items-center justify-center p-3 text-center bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-xl transition-colors border border-brand-100">
                                            <User className="h-5 w-5 mb-1" />
                                            <span className="text-xs font-semibold">Customer Login</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
