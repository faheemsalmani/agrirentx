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
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/bookings');

    return { success: true, message: 'Equipment booked successfully!' };
}

export async function submitEquipment(booking_id: number, equipment_id: number) {
    const adminClient = getSupabaseAdmin();
    const today = new Date().toISOString().split('T')[0];

    // Update booking to completed and update end date to today
    const { error: bookingError } = await adminClient
        .from('bookings')
        .update({ status: 'Completed', end_date: today })
        .eq('booking_id', booking_id);

    if (bookingError) {
        console.error('Submit equip error:', bookingError);
        return { success: false, message: bookingError.message };
    }

    // Update equipment to available
    const { error: equipError } = await adminClient
        .from('equipments')
        .update({ available: true })
        .eq('equipment_id', equipment_id);

    if (equipError) {
        console.error('Equip avail update error:', equipError);
    }

    revalidatePath('/customer/dashboard/bookings');
    revalidatePath('/customer/dashboard/browse');
    revalidatePath('/customer/dashboard');
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/bookings');

    return { success: true, message: 'Equipment submitted successfully!' };
}

export async function getPendingFeedbackBookings(customerId: number) {
    const supabase = getSupabaseAdmin();

    const { data: completedBookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*, equipments(equipment_name, image_url)')
        .eq('customer_id', customerId)
        .eq('status', 'Completed');

    if (bookingsError || !completedBookings) {
        return [];
    }

    const bookingIds = completedBookings.map(b => b.booking_id);

    if (bookingIds.length === 0) return [];

    const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('booking_id')
        .in('booking_id', bookingIds);

    const reviewedBookingIds = new Set(reviews?.map(r => r.booking_id) || []);

    return completedBookings.filter(b => !reviewedBookingIds.has(b.booking_id));
}

export async function submitFeedback(bookingId: number, rating: number, comment: string) {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
        .from('reviews')
        .insert({
            booking_id: bookingId,
            rating,
            comment
        });

    if (error) {
        return { success: false, message: error.message };
    }

    revalidatePath('/customer/dashboard/pending-feedback');
    revalidatePath('/customer/dashboard/give-feedback');

    return { success: true, message: 'Review submitted successfully!' };
}
