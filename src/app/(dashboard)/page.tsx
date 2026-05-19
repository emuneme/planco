
import { StatCard } from '@/components/dashboard/StatCard';
import { ApprovalList } from '@/components/dashboard/ApprovalList';
import { CostChart } from '@/components/dashboard/CostChart';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';
import { serviceSupabase } from '@/lib/insforge';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
    // 1. Buscar Projetos
    const projectsRes = await serviceSupabase
        .from('projects')
        .select('*');
    const projects = projectsRes.data ?? [];
    if (projectsRes.error) console.error('Error fetching projects:', JSON.stringify(projectsRes.error, null, 2));

    // 2. Buscar Aprovações Pendentes
    const approvalsRes = await serviceSupabase
        .from('approvals')
        .select('*, projects(name)')
        .eq('status', 'pending');
    const approvals = approvalsRes.data ?? [];
    if (approvalsRes.error) console.error('Error fetching approvals:', JSON.stringify(approvalsRes.error, null, 2));

    // Mapear approvals para incluir o nome do projeto
    const formattedApprovals = (approvals as any[]).map(app => ({
        ...app,
        project_name: app.projects?.name
    }));

    // 3. Calcular Estatísticas
    const totalBudget = projects?.reduce((acc, p) => acc + Number(p.budget_total), 0) || 0;
    const totalSpent = projects?.reduce((acc, p) => acc + Number(p.budget_spent), 0) || 0;
    const totalBalance = totalBudget - totalSpent;

    // 4. Preparar dados para o gráfico
    const chartData = (projects as any[]).map(p => ({
        name: p.name,
        value: Number(p.budget_spent),
        color: p.status === 'on_hold' ? '#6B7280' : undefined as string | undefined
    }));

    return (
        <>
            <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-gray-800">Visão Geral de Custos</h2>
                <p className="text-gray-500">Resumo financeiro e operacional dos projetos ativos.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Orçamento Total"
                    value={`${totalBudget.toLocaleString('pt-MZ')} MT`}
                    icon={Wallet}
                    trend={{ value: "Atualizado", isPositive: true }}
                />
                <StatCard
                    title="Total Gasto (Realizado)"
                    value={`${totalSpent.toLocaleString('pt-MZ')} MT`}
                    icon={TrendingUp}
                    className="border-l-4 border-l-primary"
                />
                <StatCard
                    title="Saldo Disponível"
                    value={`${totalBalance.toLocaleString('pt-MZ')} MT`}
                    icon={AlertCircle}
                    trend={{ value: "Saldo", isPositive: totalBalance > 0 }}
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section - Takes up 2 columns */}
                <div className="lg:col-span-2 h-[400px]">
                    <CostChart data={chartData} />
                </div>

                {/* Approvals Section - Takes up 1 column */}
                <div className="lg:col-span-1">
                    <ApprovalList approvals={formattedApprovals} />
                </div>
            </div>

            {/* Alertas */}
            {projects?.some(p => Number(p.budget_spent) / Number(p.budget_total) > 0.9) && (
                <div className="mt-8">
                    <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="text-warning mt-1" size={20} />
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">Alerta de Orçamento</h3>
                                <p className="text-sm text-gray-600">
                                    Alguns projetos atingiram mais de 90% do orçamento planejado. Verifique os custos realizados.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
