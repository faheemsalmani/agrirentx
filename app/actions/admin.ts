'use server';

import { supabase, getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addCustomer(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile_number = formData.get('mobile_number') as string;
    const password = formData.get('password') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    let id_proof = "placeholder_id_proof.jpg";

    try {
        const imageFile = formData.get('id_proof') as File | null;
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = Date.now() + '-id-' + imageFile.name.replace(/[^a-zA-Z0-9.]/g, '');
            const filePath = path.join(process.cwd(), 'public', fileName);
            fs.writeFileSync(filePath, buffer);
            id_proof = '/' + fileName;
        }
    } catch (err) {
        console.error('Error saving id proof file:', err);
    }

    const { error } = await adminClient
        .from('customers')
        .insert({
            name,
            email,
            mobile_number,
            password,
            address,
            city,
            id_proof
        });

    if (error) {
        console.error('Error adding customer:', error.message);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Customer added successfully!' };
}

export async function addVendor(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const shop_name = formData.get('shop_name') as string;
    const owner_name = formData.get('owner_name') as string;
    const email = formData.get('email') as string;
    const mobile_number = formData.get('mobile_number') as string;
    const password = formData.get('password') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    let id_proof = "placeholder_id_proof.jpg";

    try {
        const imageFile = formData.get('id_proof') as File | null;
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = Date.now() + '-vendor-id-' + imageFile.name.replace(/[^a-zA-Z0-9.]/g, '');
            const filePath = path.join(process.cwd(), 'public', fileName);
            fs.writeFileSync(filePath, buffer);
            id_proof = '/' + fileName;
        }
    } catch (err) {
        console.error('Error saving vendor id proof file:', err);
    }

    const { error } = await adminClient
        .from('vendors')
        .insert({
            shop_name,
            owner_name,
            email,
            mobile_number,
            password,
            address,
            city,
            id_proof
        });

    if (error) {
        console.error('Error adding vendor:', error.message);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Vendor added successfully!' };
}

import fs from 'fs';
import path from 'path';

export async function addEquipment(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const equipment_name = formData.get('equipment_name') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const price_per_day = parseFloat(formData.get('price_per_day') as string);
    const vendor_id_str = formData.get('vendor_id') as string;
    let image_url = "placeholder_equipment.jpg";

    if (!vendor_id_str) {
        return { success: false, message: "Please select a vendor" };
    }

    const vendor_id = parseInt(vendor_id_str);

    try {
        const imageFile = formData.get('image_url') as File | null;
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = Date.now() + '-' + imageFile.name.replace(/[^a-zA-Z0-9.]/g, '');
            const filePath = path.join(process.cwd(), 'public', fileName);
            fs.writeFileSync(filePath, buffer);
            image_url = '/' + fileName;
        }
    } catch (err) {
        console.error('Error saving image file:', err);
    }

    const { error } = await adminClient
        .from('equipments')
        .insert({
            vendor_id,
            equipment_name,
            type,
            description,
            price_per_day,
            image_url,
            available: true
        });

    if (error) {
        console.error('Error adding equipment:', error.message);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Equipment added successfully!' };
}

export async function loginAdmin(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Admin login attempt:', email);

    const { data, error } = await adminClient
        .from('admin')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error) {
        console.error('Login database error:', error.message);
        return { success: false, message: 'Access denied. Verify credentials or check database.' };
    }

    if (!data) {
        return { success: false, message: 'Admin record not found.' };
    }

    return { success: true, message: 'Login successful!', admin: data };
}
export async function updateVendorStatus(vendorId: number, status: 'Approved' | 'Rejected') {
    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient
        .from('vendors')
        .update({ status })
        .eq('vendor_id', vendorId);

    if (error) {
        console.error('Error updating vendor status:', error.message);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: `Vendor ${status.toLowerCase()} successfully!` };
}

export async function updateCustomerStatus(customerId: number, status: 'Approved' | 'Rejected') {
    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient
        .from('customers')
        .update({ status })
        .eq('customer_id', customerId);

    if (error) {
        console.error('Error updating customer status:', error.message);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: `Customer ${status.toLowerCase()} successfully!` };
}

export async function updateEquipmentStatus(equipmentId: number, status: 'Approved' | 'Rejected') {
    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient
        .from('equipments')
        .update({ status })
        .eq('equipment_id', equipmentId);

    if (error) {
        console.error('Error updating equipment status:', error.message);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/dashboard');
    return { success: true, message: `Equipment ${status.toLowerCase()} successfully!` };
}
