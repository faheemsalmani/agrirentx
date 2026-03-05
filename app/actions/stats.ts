'use server';

import { getSupabaseAdmin } from '@/lib/supabase';

export async function getAdminStats() {
    const supabase = getSupabaseAdmin();

    try {
        const [
            { count: totalVendors },
            { count: totalCustomers },
            { count: totalEquipments },
            { count: availableEquipments },
            { count: bookedEquipments }
        ] = await Promise.all([
            supabase.from('vendors').select('*', { count: 'exact', head: true }),
            supabase.from('customers').select('*', { count: 'exact', head: true }),
            supabase.from('equipments').select('*', { count: 'exact', head: true }),
            supabase.from('equipments').select('*', { count: 'exact', head: true }).eq('available', true),
            supabase.from('equipments').select('*', { count: 'exact', head: true }).eq('available', false)
        ]);

        return {
            totalVendors: totalVendors || 0,
            totalCustomers: totalCustomers || 0,
            totalEquipments: totalEquipments || 0,
            availableEquipments: availableEquipments || 0,
            bookedEquipments: bookedEquipments || 0
        };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return {
            totalVendors: 0,
            totalCustomers: 0,
            totalEquipments: 0,
            availableEquipments: 0,
            bookedEquipments: 0
        };
    }
}

export async function getVendorStats(vendorId: number) {
    const supabase = getSupabaseAdmin();

    try {
        const [
            { count: totalEquipments },
            { count: availableEquipments },
            { count: bookedEquipments }
        ] = await Promise.all([
            supabase.from('equipments').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId),
            supabase.from('equipments').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId).eq('available', true),
            supabase.from('equipments').select('*', { count: 'exact', head: true }).eq('vendor_id', vendorId).eq('available', false)
        ]);

        return {
            totalEquipments: totalEquipments || 0,
            availableEquipments: availableEquipments || 0,
            bookedEquipments: bookedEquipments || 0
        };
    } catch (error) {
        console.error('Error fetching vendor stats:', error);
        return {
            totalEquipments: 0,
            availableEquipments: 0,
            bookedEquipments: 0
        };
    }
}

export async function getCustomerStats(customerId: number) {
    const supabase = getSupabaseAdmin();

    try {
        const [
            { count: totalBookings },
            { count: activeBookings },
            { count: pendingBookings },
            { count: completedBookings }
        ] = await Promise.all([
            supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('customer_id', customerId),
            supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('customer_id', customerId).eq('status', 'Active'),
            supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('customer_id', customerId).eq('status', 'Pending'),
            supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('customer_id', customerId).eq('status', 'Completed')
        ]);

        return {
            totalBookings: totalBookings || 0,
            activeBookings: activeBookings || 0,
            pendingBookings: pendingBookings || 0,
            completedBookings: completedBookings || 0
        };
    } catch (error) {
        console.error('Error fetching customer stats:', error);
        return {
            totalBookings: 0,
            activeBookings: 0,
            pendingBookings: 0,
            completedBookings: 0
        };
    }
}

export async function getRecentBookings(limit = 5, customerId?: number) {
    const supabase = getSupabaseAdmin();

    let query = supabase
        .from('bookings')
        .select(`
            *,
            equipments (equipment_name)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (customerId) {
        query = query.eq('customer_id', customerId);
    }

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching recent bookings:', error);
        return [];
    }
    return data;
}

export async function getRecentVendors(limit = 5) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent vendors:', error);
        return [];
    }
    return data;
}

export async function getVendorEquipments(vendorId: number) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('equipments')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching vendor equipments:', error);
        return [];
    }
    return data;
}
export async function getPendingVendors() {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('status', 'Pending')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pending vendors:', error);
        return [];
    }
    return data;
}

export async function getPendingCustomers() {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('status', 'Pending')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pending customers:', error);
        return [];
    }
    return data;
}

export async function getAllVendors() {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all vendors:', error);
        return [];
    }
    return data;
}

export async function getAllCustomers() {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all customers:', error);
        return [];
    }
    return data;
}

export async function getAllEquipments() {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
        .from('equipments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all equipments:', error);
        return [];
    }
    return data;
}
