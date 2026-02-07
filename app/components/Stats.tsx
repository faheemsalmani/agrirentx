'use client';

import { motion } from 'framer-motion';

const stats = [
    { id: 1, name: 'Farming Equipment', value: '5,000+' },
    { id: 2, name: 'Happy Farmers', value: '10,000+' },
    { id: 3, name: 'Acres Harvested', value: '1M+' },
    { id: 4, name: 'Cities Covered', value: '50+' },
];

export default function Stats() {
    return (
        <div className="bg-brand-900 py-24 sm:py-32 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                            Trusted by Farmers Across India
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            Transforming agriculture with reliable machinery and transparent pricing.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                                className="flex flex-col bg-white/5 p-8"
                            >
                                <dt className="text-sm font-semibold leading-6 text-gray-300 uppercase tracking-wider">{stat.name}</dt>
                                <dd className="order-first text-4xl font-bold tracking-tight text-white mb-2">{stat.value}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
