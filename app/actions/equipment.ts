'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function submitEquipment(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const vendor_id = Number(formData.get('vendor_id'));
    const equipment_name = formData.get('equipment_name') as string;
    const type = formData.get('type') as string;
    const price_per_day = Number(formData.get('price_per_day'));
    const description = formData.get('description') as string;
    const isUpdate = formData.get('is_update') === 'true';
    const equipment_id = formData.get('equipment_id') ? Number(formData.get('equipment_id')) : null;

    let image_url = formData.get('existing_image_url') as string || '';

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `equipments/${fileName}`;

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data, error } = await adminClient.storage
            .from('images')
            .upload(filePath, buffer, {
                contentType: imageFile.type,
                upsert: true,
            });

        if (error) {
            console.error('Storage upload error:', error);
            return { success: false, message: 'Image upload failed: ' + error.message };
        }

        const { data: publicData } = adminClient.storage.from('images').getPublicUrl(filePath);
        image_url = publicData.publicUrl;
    }

    if (!image_url && !isUpdate) {
        image_url = 'placeholder_tractor.png';
    }

    if (isUpdate && equipment_id) {
        const { error } = await adminClient
            .from('equipments')
            .update({
                equipment_name,
                type,
                price_per_day,
                description,
                image_url
            })
            .eq('equipment_id', equipment_id)
            .eq('vendor_id', vendor_id);

        if (error) {
            return { success: false, message: error.message };
        }
    } else {
        const { error } = await adminClient
            .from('equipments')
            .insert({
                vendor_id,
                equipment_name,
                type,
                price_per_day,
                description,
                image_url,
                available: true
            });

        if (error) {
            return { success: false, message: error.message };
        }
    }

    revalidatePath('/vendor/dashboard/manage-equipment');
    return { success: true, message: isUpdate ? 'Equipment updated successfully!' : 'Equipment listed successfully!' };
}

export async function deleteEquipment(equipment_id: number, vendor_id: number) {
    const adminClient = getSupabaseAdmin();
    const { error } = await adminClient
        .from('equipments')
        .delete()
        .eq('equipment_id', equipment_id)
        .eq('vendor_id', vendor_id);

    if (error) {
        return { success: false, message: error.message };
    }
    revalidatePath('/vendor/dashboard/manage-equipment');
    return { success: true, message: 'Equipment deleted' };
}
