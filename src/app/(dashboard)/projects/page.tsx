
import { NewProjectModal } from '@/components/dashboard/NewProjectModal';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { serviceSupabase } from '@/lib/insforge';
import { Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Projects({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const query = q || '';

    // 1. Buscar todos os projetos com filtro opcional
    let dbQuery = serviceSupabase
        .from('projects')
        .select('*');

    if (query) {
        // Como o SDK usa PostgREST, podemos filtrar usando or ou ilike
        dbQuery = dbQuery.ilike('name', `%${query}%`);
    }

    const projectsRes = await dbQuery.order('created_at', { ascending: false });
    const projects = projectsRes.data ?? [];
    if (projectsRes.error) console.error('Error fetching projects:', JSON.stringify(projectsRes.error, null, 2));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-800">Projetos</h2>
                    <p className="text-gray-500 mt-1">Gerencie e acompanhe a execução financeira de todas as obras.</p>
                </div>
                <NewProjectModal />
            </div>

            {/* Filtros e Busca */}
            <form className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Buscar projeto por nome ou localização..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all">
                        Buscar
                    </button>
                    {query && (
                        <a href="/projects" className="bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center">
                            Limpar
                        </a>
                    )}
                </div>
            </form>

            {/* Grid de Projetos */}
            {(projects as any[]).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(projects as any[]).map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-20 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Nenhum projeto encontrado</h3>
                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                        Não existem projetos cadastrados ou que correspondam à sua busca no momento.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <NewProjectModal />
                    </div>
                </div>
            )}
        </div>
    );
}
