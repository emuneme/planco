import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) as string;
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const seedKey = supabaseServiceRoleKey || supabaseAnonKey;
if (!seedKey) {
  console.error('Missing Supabase key for seeding');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, seedKey);

async function run() {
  try {
    console.log('Starting seed...');

    const projects = [
      { name: 'Condomínio Mar Azul', location: 'Maputo - Costa do Sol', status: 'active', budget_total: 5000000, budget_spent: 125000 },
      { name: 'Edifício Sol Nascente', location: 'Beira - Bairro Central', status: 'on_hold', budget_total: 3000000, budget_spent: 1500000 },
      { name: 'Residencial Nova Vida', location: 'Nampula - Zona Norte', status: 'active', budget_total: 2000000, budget_spent: 400000 },
      { name: 'Ponte do Rio Verde', location: 'Tete - Rio Verde', status: 'completed', budget_total: 8000000, budget_spent: 8000000 },
    ];

    const { data: insertedProjects, error: projError } = await supabase.from('projects').insert(projects).select('*');
    if (projError) {
      console.error('Failed to insert projects:', projError);
      process.exit(1);
    }

    console.log(`Inserted ${Array.isArray(insertedProjects) ? insertedProjects.length : 0} projects.`);

    // Build approvals using inserted project ids
    const lookups: Record<string, string> = {};
    (insertedProjects || []).forEach((p: any) => { lookups[p.name] = p.id; });

    const approvals = [
      { project_id: lookups['Condomínio Mar Azul'], requester_name: 'João Encarregado', item_name: 'Cimento - 50 sacos', amount: 25000, status: 'pending', priority: 'normal' },
      { project_id: lookups['Edifício Sol Nascente'], requester_name: 'Maria Obras', item_name: 'Aço - 20 barras', amount: 120000, status: 'approved', priority: 'high' },
      { project_id: lookups['Residencial Nova Vida'], requester_name: 'José Operador', item_name: 'Areia - 10 m3', amount: 15000, status: 'rejected', priority: 'normal' },
      { project_id: lookups['Ponte do Rio Verde'], requester_name: 'Equipa Ponte', item_name: 'Betão Pré-misturado - 200m3', amount: 400000, status: 'approved', priority: 'high' },
      { project_id: lookups['Condomínio Mar Azul'], requester_name: 'Encarregado A', item_name: 'Parafusos - 500 unid', amount: 5000, status: 'pending', priority: 'low' },
      { project_id: lookups['Residencial Nova Vida'], requester_name: 'Encarregado B', item_name: 'Telha - 200 unid', amount: 45000, status: 'pending', priority: 'normal' },
    ].filter(a => !!a.project_id);

    if (approvals.length === 0) {
      console.warn('No approvals to insert (project lookups failed).');
    } else {
      const { data: insertedApprovals, error: apprError } = await supabase.from('approvals').insert(approvals).select('*');
      if (apprError) {
        console.error('Failed to insert approvals:', apprError);
        process.exit(1);
      }
      console.log(`Inserted ${Array.isArray(insertedApprovals) ? insertedApprovals.length : 0} approvals.`);
    }

    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error during seed:', err);
    process.exit(1);
  }
}

run();
