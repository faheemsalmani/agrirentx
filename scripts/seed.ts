
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
// Since this file is in scripts/, .env.local is one directory up
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

// Create Supabase client with admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const seedData = async () => {
    console.log('🌱 Starting seed process (1 Admin)...');

    const email = 'admin@agrirentx.com';
    const password = 'password123';
    const username = 'admin';

    console.log(`Creating Admin user: ${email}...`);

    const { data: adminUser, error: adminError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'admin', username: username }
    });

    if (adminError) {
        console.error(`Error creating auth for ${email}:`, adminError.message);
    } else {
        console.log(`Admin Auth created successfully for ${email}. ID:`, adminUser.user.id);

        const { error: insertAdminError } = await supabase
            .from('admin')
            .insert({
                email: email,
                password: password
            });

        if (insertAdminError) {
            console.log(`Note: Could not insert ${email} into public.admin.`);
            console.error('Details:', insertAdminError.message);
        } else {
            console.log(`Admin record inserted into public.admin table for ${email}.`);
        }
    }

    console.log('🌱 Seed process finished.');
};

seedData().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
