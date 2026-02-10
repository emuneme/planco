
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@insforge/sdk';

const supabaseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables');
    process.exit(1);
}

const insforge = createClient({
    baseUrl: supabaseUrl,
    anonKey: supabaseAnonKey,
});

async function main() {
    console.log('🔄 Testing InsForge connection...');
    console.log(`📡 URL: ${supabaseUrl}`);

    try {
        // Try to get the server health or just a simple query
        const { data, error } = await (insforge as any).database.from('_test_connection_').select('*').limit(1);

        // It's expected to fail if the table doesn't exist, but if it connects it's a success in terms of network
        // Better: check auth
        const { data: authData, error: authError } = await insforge.auth.getSession();

        if (authError) {
            console.error('❌ Auth Check Failed:', authError.message);
        } else {
            console.log('✅ Auth Service Connection: Success');
        }

    } catch (error) {
        console.error('❌ Connection Error:', error);
    }
}

main();
