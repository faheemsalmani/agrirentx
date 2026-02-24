'use client';

import { useEffect, useState } from 'react';
import { Tractor, Edit, Trash2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { getVendorEquipments } from '@/app/actions/stats';

export default function ManageEquipment() {
    const [equipments, setEquipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEquipments() {
            setLoading(true);
            // Assuming vendor_id 1
            const data = await getVendorEquipments(1);
            setEquipments(data);
            setLoading(false);
        }
        fetchEquipments();
    }, []);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this equipment?')) {
            setEquipments(equipments.filter(e => e.equipment_id !== id));
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading">Manage Equipment</h1>
                    <p className="text-gray-500 text-sm mt-1">Update availability or remove items</p>
                </div>
                <Link href="/vendor/dashboard/add-equipment" className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg hover:shadow-brand-500/30 transition-all flex items-center space-x-2">
                    <span>Add New</span>
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name / Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price/Day</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">Loading equipment...</td></tr>
                            ) : equipments.map((item) => (
                                <tr key={item.equipment_id} className="group hover:bg-brand-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                            <ImageIcon size={20} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{item.equipment_name}</div>
                                        <div className="text-xs text-gray-500">{item.type}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">₹{item.price_per_day}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.available ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {item.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Update">
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                                onClick={() => handleDelete(item.equipment_id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {equipments.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No equipment listed yet. <Link href="/vendor/dashboard/add-equipment" className="text-brand-600 hover:underline">Add your first item</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
