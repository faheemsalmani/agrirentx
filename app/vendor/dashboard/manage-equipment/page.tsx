'use client';

import { useEffect, useState } from 'react';
import { Tractor, Edit, Trash2, MoreHorizontal, Image as ImageIcon, X, Upload } from 'lucide-react';
import Link from 'next/link';
import { getVendorEquipments } from '@/app/actions/stats';
import { deleteEquipment, submitEquipment } from '@/app/actions/equipment';

export default function ManageEquipment() {
    const [equipments, setEquipments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingEquipment, setEditingEquipment] = useState<any | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchEquipments();
    }, []);

    async function fetchEquipments() {
        setLoading(true);
        // Assuming vendor_id 1
        const data = await getVendorEquipments(1);
        setEquipments(data);
        setLoading(false);
    }

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this equipment?')) {
            setDeletingId(id);
            const res = await deleteEquipment(id, 1);
            if (res.success) {
                setEquipments(equipments.filter(e => e.equipment_id !== id));
            } else {
                alert('Failed to delete equipment: ' + res.message);
            }
            setDeletingId(null);
        }
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
        const formData = new FormData(e.currentTarget);
        formData.append('is_update', 'true');
        formData.append('equipment_id', editingEquipment.equipment_id.toString());
        formData.append('vendor_id', editingEquipment.vendor_id?.toString() || '1');
        formData.append('existing_image_url', editingEquipment.image_url || '');

        const res = await submitEquipment(formData);
        if (res.success) {
            setEditingEquipment(null);
            fetchEquipments();
        } else {
            alert('Failed to update equipment: ' + res.message);
        }
        setIsUpdating(false);
    };

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
                                <tr key={item.equipment_id} className={`group hover:bg-brand-50/30 transition-colors ${deletingId === item.equipment_id ? 'opacity-50' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden">
                                            {item.image_url && !item.image_url.startsWith('placeholder') ? (
                                                <img src={item.image_url} alt={item.equipment_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={20} />
                                            )}
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
                                            <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Update"
                                                onClick={() => setEditingEquipment(item)}>
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                title="Delete"
                                                onClick={() => handleDelete(item.equipment_id)}
                                                disabled={deletingId === item.equipment_id}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {equipments.length === 0 && !loading && (
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

            {editingEquipment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 font-heading">Update Equipment</h2>
                            <button onClick={() => setEditingEquipment(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 col-span-1 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700">Equipment Name*</label>
                                        <input required type="text" name="equipment_name" defaultValue={editingEquipment.equipment_name} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 bg-gray-50 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Type*</label>
                                        <input required type="text" name="type" defaultValue={editingEquipment.type} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 bg-gray-50 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Price Per Day (₹)*</label>
                                        <input required type="number" name="price_per_day" defaultValue={editingEquipment.price_per_day} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 bg-gray-50 outline-none transition-all" min="0" />
                                    </div>
                                    <div className="space-y-2 col-span-1 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700">Description</label>
                                        <textarea required name="description" defaultValue={editingEquipment.description} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 bg-gray-50 outline-none transition-all"></textarea>
                                    </div>
                                    <div className="space-y-2 col-span-1 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700">Equipment Image (Optional)</label>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                                                {editingEquipment.image_url && !editingEquipment.image_url.startsWith('placeholder') ? (
                                                    <img src={editingEquipment.image_url} alt="Current" className="w-full h-full object-cover" />
                                                ) : <ImageIcon size={24} className="text-gray-400" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="relative border-2 border-dashed border-gray-300 rounded-xl px-4 py-4 hover:border-brand-500 transition-colors bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer">
                                                    <input type="file" name="image" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                    <Upload size={20} className="text-gray-400 mb-1" />
                                                    <p className="text-sm text-gray-500 font-medium">Click or drag new image</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
                                    <button type="button" onClick={() => setEditingEquipment(null)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isUpdating} className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 shadow-lg hover:shadow-brand-500/30 transition-all flex items-center space-x-2 disabled:opacity-70">
                                        {isUpdating ? 'Updating...' : 'Update Equipment'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
