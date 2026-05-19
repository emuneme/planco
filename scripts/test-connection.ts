
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local if available, otherwise .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_URL and SUPABASE_ANON_KEY.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
    console.log('🔄 Testing Supabase connection...');
    console.log(`📡 URL: ${supabaseUrl}`);

    try {
        // Try a simple DB query against a known table to verify connectivity
        const { data, error } = await supabase.from('projects').select('*').limit(1);

        if (error) {
            console.error('❌ DB Query Failed:', error);
        } else {
            console.log('✅ Database Connection: Success', Array.isArray(data) ? `returned ${data.length} rows` : '');
        }

    } catch (error) {
        console.error('❌ Connection Error:', error);
    }
}

main();
