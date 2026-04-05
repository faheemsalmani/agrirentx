'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Tractor, Check, X, CheckCircle2, XCircle, ImageIcon, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getAllEquipments } from '@/app/actions/stats';
import { updateEquipment, deleteEquipment } from '@/app/actions/admin';
import Modal from '@/app/components/Modal';

interface Equipment {
    equipment_id: number;
    equipment_name: string;
    type: string;
    price_per_day: number;
    image_url: string;
    status?: string;
    available?: boolean;
    created_at: string;
}

export default function EquipmentPage() {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    // Edit Form State
    const [formData, setFormData] = useState({ equipment_name: '', type: '', price_per_day: 0 });


    useEffect(() => {
        fetchEquipments();
    }, []);

    async function fetchEquipments() {
        setLoading(true);
        try {
            const data = await getAllEquipments();
            if (data && Array.isArray(data)) {
                setEquipments(data as Equipment[]);
            } else {
                setEquipments([]);
            }
        } catch (err) {
            console.error('Failed to fetch equipments', err);
            setEquipments([]);
        } finally {
            setLoading(false);
        }
    }

    const filtered = equipments.filter((e) => {
        const q = search.toLowerCase();
        return (
            (e.equipment_name && e.equipment_name.toLowerCase().includes(q)) ||
            (e.type && e.type.toLowerCase().includes(q))
        );
    });

    const openEditForm = () => {
        if (!selectedEquipment) return;
        setFormData({
            equipment_name: selectedEquipment.equipment_name,
            type: selectedEquipment.type,
            price_per_day: selectedEquipment.price_per_day,
        });
        setActionModalOpen(false);
        setEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEquipment) return;
        setEquipments(equipments.map(eq => eq.equipment_id === selectedEquipment.equipment_id ? { ...eq, ...formData } : eq));
        setEditModalOpen(false);
        await updateEquipment(selectedEquipment.equipment_id, formData);
    };

    const handleDelete = async () => {
        if (!selectedEquipment) return;
        setEquipments(equipments.filter(eq => eq.equipment_id !== selectedEquipment.equipment_id));
        setDeleteModalOpen(false);
        await deleteEquipment(selectedEquipment.equipment_id);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading flex items-center gap-2">
                        <Tractor className="w-6 h-6 text-brand-600" />
                        Equipment
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all Equipment available in the system</p>
                </div>
                {/* Task 5: Add Equipments button */}
                <Link
                    href="/admin/dashboard/add-equipment"
                    className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-700 hover:brightness-95 active:bg-brand-800 transition-all shadow-sm self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Add Equipments
                </Link>
            </div>

            {/* Search + Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                {/* Task 4: Search Bar aligned to the right */}
                <div className="p-4 sm:p-5 flex justify-end border-b border-slate-100">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search vendors...."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            {/* Equiments name,price/day,Type,image , Status */}
                            <tr className="border-b border-slate-100 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-slate-50/50">
                                <th className="px-5 py-4">Image</th>
                                <th className="px-5 py-4">Equipments Name</th>
                                <th className="px-5 py-4">Type</th>
                                <th className="px-5 py-4">Price/Day</th>
                                <th className="px-5 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-16 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm">Loading equipments…</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-16 text-center text-gray-500 text-sm">
                                        No equipments found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((e) => (
                                    <tr 
                                        key={e.equipment_id} 
                                        className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                                        onDoubleClick={() => {
                                            setSelectedEquipment(e);
                                            setActionModalOpen(true);
                                        }}
                                    >
                                        <td className="px-5 py-4">
                                            {e.image_url && !e.image_url.startsWith('placeholder') ? (
                                                <img
                                                    src={e.image_url}
                                                    alt={e.equipment_name}
                                                    className="w-12 h-12 object-cover rounded-md bg-gray-100 border border-gray-200"
                                                    onError={(img) => {
                                                        img.currentTarget.onerror = null;
                                                        img.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB4PSIzIiB5PSIzIiByeD0iMiIgcnk9IjIiLz48Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEuNSIvPjxwYXRoIGQ9Ik0yMSAxNWwtNS01TDUgMjEiLz48L3N2Zz4=';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 border border-gray-200">
                                                    <ImageIcon size={20} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{e.equipment_name}</td>
                                        <td className="px-5 py-4 text-gray-600 capitalize">{e.type}</td>
                                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">₹{e.price_per_day}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            {e.available ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Available
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200">
                                                    Unavailable
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer count */}
                {!loading && (
                    <div className="px-5 py-4 border-t border-slate-100 text-xs text-gray-500 flex justify-end items-center bg-slate-50/50 rounded-b-2xl">
                        <span>Showing {filtered.length} of {equipments.length} equipments</span>
                    </div>
                )}
            </div>
            {/* Action Modal */}
            <Modal isOpen={actionModalOpen} onClose={() => setActionModalOpen(false)} title="Manage Equipment">
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={openEditForm}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-xl font-semibold transition-colors"
                    >
                        <Edit2 size={18} /> Edit Equipment
                    </button>
                    <button 
                        onClick={() => { setActionModalOpen(false); setDeleteModalOpen(true); }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-colors"
                    >
                        <Trash2 size={18} /> Delete Equipment
                    </button>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Equipment">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Equipment Name</label>
                        <input type="text" value={formData.equipment_name} onChange={e => setFormData({ ...formData, equipment_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Type</label>
                        <input type="text" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Price / Day (₹)</label>
                        <input type="number" value={formData.price_per_day} onChange={e => setFormData({ ...formData, price_per_day: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition">Save Changes</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">Are you sure you want to delete this equipment? This action cannot be undone.</p>
                    <div className="flex gap-3 justify-end pt-2">
                        <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                        <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
