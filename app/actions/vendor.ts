'use server';

import { supabase, getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function registerVendor(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const shop_name = formData.get('shop_name') as string;
    const owner_name = formData.get('owner_name') as string;
    const email = formData.get('email') as string;
    const mobile_number = formData.get('mobile_number') as string;
    const password = formData.get('password') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const id_proof = "placeholder_id.jpg";

    const { error } = await adminClient
        .from('vendors')
        .insert({
            shop_name,
            owner_name,
            email,
            password,
            mobile_number,
            address,
            city,
            id_proof
        });

    if (error) {
        console.error('Vendor registration error:', error.message);
        return { success: false, message: error.message };
    }

    return { success: true, message: 'Registration successful!' };
}

export async function loginVendor(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await adminClient
        .from('vendors')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error || !data) {
        return { success: false, message: 'Invalid email or password' };
    }

    if (data.status === 'Pending') {
        return { success: false, message: 'Your shop is pending approval by the admin.' };
    }

    if (data.status === 'Rejected') {
        return { success: false, message: 'Your shop has been rejected. Please contact support.' };
    }

    return { success: true, message: 'Login successful!', vendor: data };
}
