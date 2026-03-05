'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function bookEquipment(formData: FormData) {
    const adminClient = getSupabaseAdmin();
    const customer_id = Number(formData.get('customer_id'));
    const equipment_id = Number(formData.get('equipment_id'));
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    const total_price = Number(formData.get('total_price'));

    // Insert the booking
    const { error: bookingError } = await adminClient
        .from('bookings')
        .insert({
            customer_id,
            equipment_id,
            start_date,
            end_date,
            total_price,
            status: 'Active'
        });

    if (bookingError) {
        console.error('Booking error:', bookingError);
        return { success: false, message: bookingError.message };
    }

    // Update the equipment status to not available
    const { error: equipmentError } = await adminClient
        .from('equipments')
        .update({ available: false })
        .eq('equipment_id', equipment_id);

    if (equipmentError) {
        console.error('Equipment availability update error:', equipmentError);
    }

    revalidatePath('/customer/dashboard/browse');
    revalidatePath('/customer/dashboard/bookings');

    return { success: true, message: 'Equipment booked successfully!' };
}
