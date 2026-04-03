'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function registerCustomer(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile_number = formData.get('mobile_number') as string;
    const password = formData.get('password') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const id_proof = "placeholder_id.jpg"; // In real world, handle file upload

    const { error } = await adminClient
        .from('customers')
        .insert({
            name,
            email,
            password,
            mobile_number,
            address,
            city,
            id_proof
        });

    if (error) {
        console.error('Customer registration error:', error.message);
        return { success: false, message: error.message };
    }

    return { success: true, message: 'Registration successful!' };
}

export async function loginCustomer(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await adminClient
        .from('customers')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error || !data) {
        return { success: false, message: 'Invalid email or password' };
    }

    if (data.status === 'Pending') {
        return { success: false, message: 'Your account is pending approval by the admin.' };
    }

    if (data.status === 'Rejected') {
        return { success: false, message: 'Your account has been rejected. Please contact support.' };
    }

    return { success: true, message: 'Login successful!', customer: data };
}
