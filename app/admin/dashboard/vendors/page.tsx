'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Store, Check, X, CheckCircle2, XCircle, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getAllVendors } from '@/app/actions/stats';
import { updateVendor, deleteVendor } from '@/app/actions/admin';
import Modal from '@/app/components/Modal';

// Keep the interface to match our front-end table
interface Vendor {
    vendor_id: number;
    shop_name: string;
    owner_name: string;
    email: string;
    mobile_number: string;
    city: string;
    id_proof?: string;
    status?: string;
    created_at: string;
}

export default function VendorsPage() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    // Edit Form State
    const [formData, setFormData] = useState({ shop_name: '', owner_name: '', email: '', mobile_number: '', city: '' });


    useEffect(() => {
        async function fetchVendors() {
            setLoading(true);
            try {
                const data = await getAllVendors();
                if (data && Array.isArray(data)) {
                    // Mapped missing DB columns safely so UI does not crash or hide data
                    const formattedData = data.map((v: any) => ({
                        ...v,
                        status: v.status || 'Pending',
                        id_proof: v.id_proof || ''
                    }));
                    setVendors(formattedData as Vendor[]);
                } else {
                    setVendors([]);
                }
            } catch (err) {
                console.error('Failed to fetch vendors', err);
                setVendors([]);
            } finally {
                setLoading(false);
            }
        }
        fetchVendors();
    }, []);

    const filtered = vendors.filter((v) => {
        const q = search.toLowerCase();
        return (
            (v.shop_name && v.shop_name.toLowerCase().includes(q)) ||
            (v.owner_name && v.owner_name.toLowerCase().includes(q)) ||
            (v.email && v.email.toLowerCase().includes(q)) ||
            (v.mobile_number && v.mobile_number.includes(q)) ||
            (v.city && v.city.toLowerCase().includes(q)) ||
            (v.status && v.status.toLowerCase().includes(q))
        );
    });

    const openEditForm = () => {
        if (!selectedVendor) return;
        setFormData({
            shop_name: selectedVendor.shop_name,
            owner_name: selectedVendor.owner_name,
            email: selectedVendor.email,
            mobile_number: selectedVendor.mobile_number,
            city: selectedVendor.city,
        });
        setActionModalOpen(false);
        setEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVendor) return;
        setVendors(vendors.map(v => v.vendor_id === selectedVendor.vendor_id ? { ...v, ...formData } : v));
        setEditModalOpen(false);
        await updateVendor(selectedVendor.vendor_id, formData);
    };

    const handleDelete = async () => {
        if (!selectedVendor) return;
        setVendors(vendors.filter(v => v.vendor_id !== selectedVendor.vendor_id));
        setDeleteModalOpen(false);
        await deleteVendor(selectedVendor.vendor_id);
    };

    const handleApprove = (id: number) => {
        setVendors(vendors.map(v => v.vendor_id === id ? { ...v, status: 'Approved' } : v));
        // Add actual backend approve logic here if needed
    };

    const handleReject = (id: number) => {
        setVendors(vendors.map(v => v.vendor_id === id ? { ...v, status: 'Rejected' } : v));
        // Add actual backend reject logic here if needed
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading flex items-center gap-2">
                        <Store className="w-6 h-6 text-brand-600" />
                        Vendors
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all vendors available in the system</p>
                </div>
                {/* Task 5: Add Vendors button */}
                <Link
                    href="/admin/dashboard/add-vendor"
                    className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-sm self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Add Vendors
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
                            {/* Task 3 & 6: Show explicit columns, must be visible */}
                            <tr className="border-b border-slate-100 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-slate-50/50">
                                <th className="px-5 py-4">Shop Name</th>
                                <th className="px-5 py-4">Owner Name</th>
                                <th className="px-5 py-4">Email</th>
                                <th className="px-5 py-4">Mobile</th>
                                <th className="px-5 py-4">City</th>
                                <th className="px-5 py-4">ID Proof</th>
                                <th className="px-5 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-16 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm">Loading vendors…</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-16 text-center text-gray-500 text-sm">
                                        No vendors found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((v) => (
                                    <tr 
                                        key={v.vendor_id} 
                                        className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                                        onDoubleClick={() => {
                                            setSelectedVendor(v);
                                            setActionModalOpen(true);
                                        }}
                                    >
                                        <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{v.shop_name}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">{v.owner_name}</td>
                                        <td className="px-5 py-4 text-gray-500">{v.email}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-gray-600">{v.mobile_number}</td>
                                        <td className="px-5 py-4 text-gray-600">{v.city}</td>
                                        <td className="px-5 py-4">
                                            {v.id_proof ? (
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={v.id_proof?.startsWith('http') ? v.id_proof : `/${v.id_proof}`}
                                                        alt="ID Proof"
                                                        className="w-8 h-8 rounded object-cover bg-gray-100 border border-gray-200"
                                                        onError={(img) => {
                                                            img.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                    <a href={v.id_proof?.startsWith('http') ? v.id_proof : `/${v.id_proof}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-brand-600 hover:text-brand-700 hover:underline font-medium text-xs">
                                                        View Doc
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs text-center w-full block">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            {/* Task 3 & 6: Display status clearly. (rejected [red color with icon] and approved [green color with icon]) */}
                                            {v.status === 'Approved' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                                                </span>
                                            )}
                                            {v.status === 'Rejected' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-100">
                                                    <XCircle className="w-3.5 h-3.5" /> Rejected
                                                </span>
                                            )}
                                            {v.status === 'Pending' && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleApprove(v.vendor_id)}
                                                        className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors group border border-emerald-100"
                                                        title="Approve Vendor"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(v.vendor_id)}
                                                        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors group border border-red-100"
                                                        title="Reject Vendor"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                            {!['Approved', 'Rejected', 'Pending'].includes(v.status || '') && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                                                    {v.status}
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
                        <span>Showing {filtered.length} of {vendors.length} vendors</span>
                    </div>
                )}
            </div>
            {/* Action Modal */}
            <Modal isOpen={actionModalOpen} onClose={() => setActionModalOpen(false)} title="Manage Vendor">
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={openEditForm}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-xl font-semibold transition-colors"
                    >
                        <Edit2 size={18} /> Edit Vendor
                    </button>
                    <button 
                        onClick={() => { setActionModalOpen(false); setDeleteModalOpen(true); }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-colors"
                    >
                        <Trash2 size={18} /> Delete Vendor
                    </button>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Vendor">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Shop Name</label>
                        <input type="text" value={formData.shop_name} onChange={e => setFormData({ ...formData, shop_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Owner Name</label>
                        <input type="text" value={formData.owner_name} onChange={e => setFormData({ ...formData, owner_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile</label>
                        <input type="tel" value={formData.mobile_number} onChange={e => setFormData({ ...formData, mobile_number: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                        <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition">Save Changes</button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm">Are you sure you want to delete this vendor? This action cannot be undone.</p>
                    <div className="flex gap-3 justify-end pt-2">
                        <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                        <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
