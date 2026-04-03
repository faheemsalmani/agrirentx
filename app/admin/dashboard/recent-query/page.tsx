import { getSupabaseAdmin } from '@/lib/supabase';
import { UserCircle, Phone, Tractor, MessageSquare, Calendar } from 'lucide-react';

export const revalidate = 0; // Disable cache so it always fetches fresh data

export default async function RecentQueryPage() {
    const supabase = getSupabaseAdmin();
    const { data: queries, error } = await supabase.from('recent_data').select('*').order('id', { ascending: false });

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Recent Queries</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and view all callback requests from the landing page.</p>
                </div>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                    <span>Recent Activity</span>
                </div>
                
                {error ? (
                    <div className="p-6 text-red-500">Failed to load queries. Please try again.</div>
                ) : queries && queries.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {queries.map((query: any) => (
                            <div key={query.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium tracking-wider mb-2">
                                            <UserCircle size={14} className="text-brand-500" />
                                            <span>NAME</span>
                                        </div>
                                        <p className="font-medium text-slate-900">{query.first_name || '-'} {query.last_name || ''}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium tracking-wider mb-2">
                                            <Phone size={14} className="text-brand-500" />
                                            <span>CONTACT</span>
                                        </div>
                                        <p className="text-slate-700">{query.number || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium tracking-wider mb-2">
                                            <Tractor size={14} className="text-brand-500" />
                                            <span>EQUIPMENT</span>
                                        </div>
                                        <p className="text-slate-700">{query.equipment_needed || 'Not specified'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium tracking-wider mb-2">
                                            <Calendar size={14} className="text-brand-500" />
                                            <span>DATE</span>
                                        </div>
                                        <p className="text-slate-700">{query.created_at ? new Date(query.created_at).toLocaleDateString() : 'Today'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium tracking-wider mb-2">
                                            <MessageSquare size={14} className="text-brand-500" />
                                            <span>QUERY</span>
                                        </div>
                                        <p className="text-slate-700 text-sm line-clamp-1" title={query.query || ''}>{query.query || 'No message'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-brand-500" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No queries found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">There are no recent callback requests yet. They will appear here once submitted from the website.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
