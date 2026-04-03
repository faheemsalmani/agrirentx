'use server';

import { getSupabaseAdmin } from '@/lib/supabase';

export async function submitCallbackForm(formData: FormData) {
    try {
        const supabase = getSupabaseAdmin();
        const data = {
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            number: formData.get('number') as string,
            equipment_needed: formData.get('equipment_needed') as string,
            query: formData.get('query') as string,
            created_at: new Date().toISOString()
        };

        const { error } = await supabase.from('recent_data').insert([data]);

        if (error) {
            console.error('Error inserting callback data:', error);
            return { success: false, message: 'Failed to submit request.' };
        }

        return { success: true, message: 'I will call you later' };
    } catch (e) {
        console.error('Submit callback error:', e);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
