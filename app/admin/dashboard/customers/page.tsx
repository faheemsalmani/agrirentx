'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Users, Check, X, CheckCircle2, XCircle, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getAllCustomers } from '@/app/actions/stats';
import { updateCustomerStatus, updateCustomer, deleteCustomer } from '@/app/actions/admin';
import Modal from '@/app/components/Modal';

interface Customer {
    customer_id: number;
    name: string;
    email: string;
    mobile_number: string;
    city: string;
    id_proof?: string;
    status?: string;
    created_at: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    
    // Edit Form State
    const [formData, setFormData] = useState({ name: '', email: '', mobile_number: '', city: '' });


    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        setLoading(true);
        try {
            const data = await getAllCustomers();
            if (data && Array.isArray(data)) {
                const formattedData = data.map((v: any) => ({
                    ...v,
                    status: v.status || 'Pending',
                    id_proof: v.id_proof || ''
                }));
                setCustomers(formattedData as Customer[]);
            } else {
                setCustomers([]);
            }
        } catch (err) {
            console.error('Failed to fetch customers', err);
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    }

    const filtered = customers.filter((c) => {
        const q = search.toLowerCase();
        return (
            (c.name && c.name.toLowerCase().includes(q)) ||
            (c.email && c.email.toLowerCase().includes(q)) ||
            (c.mobile_number && c.mobile_number.includes(q)) ||
            (c.city && c.city.toLowerCase().includes(q)) ||
            (c.status && c.status.toLowerCase().includes(q))
        );
    });

    const openEditForm = () => {
        if (!selectedCustomer) return;
        setFormData({
            name: selectedCustomer.name,
            email: selectedCustomer.email,
            mobile_number: selectedCustomer.mobile_number,
            city: selectedCustomer.city,
        });
        setActionModalOpen(false);
        setEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCustomer) return;
        setCustomers(customers.map(c => c.customer_id === selectedCustomer.customer_id ? { ...c, ...formData } : c));
        setEditModalOpen(false);
        await updateCustomer(selectedCustomer.customer_id, formData);
    };

    const handleDelete = async () => {
        if (!selectedCustomer) return;
        setCustomers(customers.filter(c => c.customer_id !== selectedCustomer.customer_id));
        setDeleteModalOpen(false);
        await deleteCustomer(selectedCustomer.customer_id);
    };

    const handleApprove = async (id: number) => {
        // Optimistic update
        setCustomers(customers.map(c => c.customer_id === id ? { ...c, status: 'Approved' } : c));
        // Server update
        await updateCustomerStatus(id, 'Approved');
    };

    const handleReject = async (id: number) => {
        // Optimistic update
        setCustomers(customers.map(c => c.customer_id === id ? { ...c, status: 'Rejected' } : c));
        // Server update
        await updateCustomerStatus(id, 'Rejected');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-heading flex items-center gap-2">
                        <Users className="w-6 h-6 text-brand-600" />
                        Customers
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all customers available in the system</p>
                </div>
                {/* Task 5: Add Customer button */}
                <Link
                    href="/admin/dashboard/add-customer"
                    className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-700 hover:brightness-95 active:bg-brand-800 transition-all shadow-sm self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    Add Customer
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
                            <tr className="border-b border-slate-100 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-slate-50/50">
                                <th className="px-5 py-4">Name</th>
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
                                    <td colSpan={6} className="px-5 py-16 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm">Loading customers…</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-16 text-center text-gray-500 text-sm">
                                        No customers Found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((c) => (
                                    <tr 
                                        key={c.customer_id} 
                                        className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                                        onDoubleClick={() => {
                                            setSelectedCustomer(c);
                                            setActionModalOpen(true);
                                        }}
                                    >
                                        <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">{c.name}</td>
                                        <td className="px-5 py-4 text-gray-500">{c.email}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-gray-600">{c.mobile_number}</td>
                                        <td className="px-5 py-4 text-gray-600">{c.city}</td>
                                        <td className="px-5 py-4">
                                            {c.id_proof ? (
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={c.id_proof?.startsWith('http') ? c.id_proof : `/${c.id_proof}`}
                                                        alt="ID Proof"
                                                        className="w-8 h-8 rounded object-cover bg-gray-100 border border-gray-200"
                                                        onError={(img) => {
                                                            img.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                    <a href={c.id_proof?.startsWith('http') ? c.id_proof : `/${c.id_proof}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-brand-600 hover:text-brand-700 hover:underline font-medium text-xs">
                                                        View Doc
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs text-center w-full block">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            {c.status === 'Approved' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                                                </span>
                                            )}
                                            {c.status === 'Rejected' && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold border border-red-100">
                                                    <XCircle className="w-3.5 h-3.5" /> Rejected
                                                </span>
                                            )}
                                            {c.status === 'Pending' && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleApprove(c.customer_id)}
                                                        className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors group border border-emerald-100"
                                                        title="Approve Customer"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(c.customer_id)}
                                                        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors group border border-red-100"
                                                        title="Reject Customer"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                            {!['Approved', 'Rejected', 'Pending'].includes(c.status || '') && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                                                    {c.status}
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
                        <span>Showing {filtered.length} of {customers.length} customers</span>
                    </div>
                )}
            </div>
            {/* Action Modal */}
            <Modal isOpen={actionModalOpen} onClose={() => setActionModalOpen(false)} title="Manage Customer">
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={openEditForm}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-xl font-semibold transition-colors"
                    >
                        <Edit2 size={18} /> Edit Customer
                    </button>
                    <button 
                        onClick={() => { setActionModalOpen(false); setDeleteModalOpen(true); }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-semibold transition-colors"
                    >
                        <Trash2 size={18} /> Delete Customer
                    </button>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Customer">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" required />
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
                    <p className="text-gray-600 text-sm">Are you sure you want to delete this customer? This action cannot be undone.</p>
                    <div className="flex gap-3 justify-end pt-2">
                        <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
                        <button onClick={handleDelete} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
