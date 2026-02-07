'use client';

import { Sprout, Tractor, Cog, Truck, Hammer, Thermometer } from 'lucide-react';

const features = [
    {
        name: 'Heavy Duty Tractors',
        description: '45-75 HP tractors suitable for all terrain types. Includes rotavator and plow attachments.',
        icon: Tractor,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
    },
    {
        name: 'Combine Harvesters',
        description: 'Efficient grain harvesting for wheat, paddy, and soybean. Minimize grain loss.',
        icon: Sprout,
        color: 'text-green-500',
        bg: 'bg-green-50',
    },
    {
        name: 'Earth Movers & Excavators',
        description: 'JCBs and excavators for land preparation, ditching, and construction needs.',
        icon: Hammer,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50',
    },
    {
        name: 'Logistics & Transport',
        description: 'Trucks and trolleys for transporting harvest to the mandi safely and on time.',
        icon: Truck,
        color: 'text-red-500',
        bg: 'bg-red-50',
    },
    {
        name: 'Precision Farming',
        description: 'Laser land levelers and crop sensors for maximizing yield per acre.',
        icon: Cog,
        color: 'text-purple-500',
        bg: 'bg-purple-50',
    },
    {
        name: 'Cold Storage Units',
        description: 'Portable cold storage solutions to keep your produce fresh longer.',
        icon: Thermometer,
        color: 'text-cyan-500',
        bg: 'bg-cyan-50',
    },
];

export default function Services() {
    return (
        <div id="equipment" className="py-24 sm:py-32 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-600 uppercase tracking-widest">Premium Fleet</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-heading">
                        Everything You Need for a Productive Harvest
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Choose from our diverse range of well-maintained, high-performance equipment.
                        All machines come with optional expert operators.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col group cursor-pointer">
                                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg} mb-6 transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                                    <feature.icon className={`h-8 w-8 ${feature.color}`} aria-hidden="true" />
                                </div>
                                <div className="flex-auto">
                                    <h3 className="text-lg font-bold leading-8 text-gray-900 group-hover:text-brand-600 transition-colors">
                                        {feature.name}
                                    </h3>
                                    <p className="mt-2 text-base leading-7 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                                <p className="mt-6 flex items-center text-sm font-bold leading-6 text-brand-600 group-hover:translate-x-2 transition-transform">
                                    Check Availability <span aria-hidden="true">→</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
