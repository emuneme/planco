
import { ApprovalList } from '@/components/dashboard/ApprovalList';
import { insforge } from '@/lib/insforge';
import { Search, History, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Approvals({ searchParams }: { searchParams: Promise<{ limit?: string }> }) {
    const { limit: limitParam } = await searchParams;
    const limit = Number(limitParam) || 10;

    // 1. Buscar Aprovações Pendentes
    const { data: pending = [] } = await insforge.database
        .from('approvals')
        .select('*, projects(name)')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

    // 2. Buscar Histórico (Aprovados/Rejeitados)
    const { data: history = [] } = await insforge.database
        .from('approvals')
        .select('*, projects(name)')
        .neq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(limit);

    const formatApproval = (app: any) => ({
        ...app,
        project_name: app.projects?.name
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-display font-bold text-gray-800">Aprovações de Reaquisição</h2>
                <p className="text-gray-500 mt-1">Gerencie solicitações de materiais, equipamentos e serviços.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Coluna Principal: Pendentes */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Clock size={20} />
                        <h3>Pendentes de Revisão</h3>
                    </div>
                    <ApprovalList approvals={(pending as any[]).map(formatApproval)} />
                </div>

                {/* Coluna Lateral: Histórico Recente */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="flex items-center gap-2 text-gray-600 font-semibold mb-2">
                        <History size={20} />
                        <h3>Histórico Recente</h3>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                        {(history as any[]).length > 0 ? (
                            (history as any[]).map((item: any) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${item.status === 'approved' ? 'bg-secondary/10 text-secondary' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {item.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            {new Date(item.created_at).toLocaleDateString('pt-MZ')}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{item.item_name}</h4>
                                    <p className="text-xs text-gray-500">{item.projects?.name}</p>
                                    <p className="text-xs font-medium text-primary mt-1">{Number(item.amount).toLocaleString('pt-MZ')} MT</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-sm text-gray-500">Sem histórico nas últimas 24h.</p>
                            </div>
                        )}
                        <div className="p-4 bg-gray-50 text-center">
                            {limit < 50 ? (
                                <a
                                    href="/approvals?limit=50"
                                    className="text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-wider block"
                                >
                                    Ver Relatório Completo
                                </a>
                            ) : (
                                <a
                                    href="/approvals"
                                    className="text-xs font-bold text-primary hover:text-primary-hover transition-colors uppercase tracking-wider block"
                                >
                                    Ver Menos
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
