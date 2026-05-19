
import { serviceSupabase } from '@/lib/insforge';
import NewRequestForm from '@/components/portal/NewRequestForm';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewRequest() {
    const projectsRes = await serviceSupabase
        .from('projects')
        .select('id, name')
        .eq('status', 'active');

    const projects = projectsRes.data ?? [];
    if (projectsRes.error) console.error('Error fetching active projects:', JSON.stringify(projectsRes.error, null, 2));

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
                <button className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Fazer Pedido</h2>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                <NewRequestForm projects={projects} />
            </div>
        </div>
    );
}
