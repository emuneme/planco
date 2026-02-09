
import { insforge } from '@/lib/insforge';
import { ArrowDownRight, ArrowUpRight, BarChart3, CreditCard } from 'lucide-react';
import { ExportPdfButton } from '@/components/dashboard/ExportPdfButton';

export const dynamic = 'force-dynamic';

export default async function Finance() {
    // 1. Buscar dados financeiros dos projetos
    const { data: projects = [] } = await (insforge as any).database
        .from('projects')
        .select('name, budget_total, budget_spent');

    const totalBudget = (projects as any[])?.reduce((acc, p) => acc + Number(p.budget_total), 0) || 0;
    const totalSpent = (projects as any[])?.reduce((acc, p) => acc + Number(p.budget_spent), 0) || 0;

    return (
        <div className="space-y-8 print:p-0">
            <div className="hidden print:block mb-8 border-b-2 border-primary pb-4">
                <h1 className="text-2xl font-bold text-primary">PLANCO CONST - Relatório Financeiro</h1>
                <p className="text-gray-500 text-sm">Gerado em {new Date().toLocaleDateString('pt-MZ')}</p>
            </div>

            <div className="print:hidden">
                <h2 className="text-3xl font-display font-bold text-gray-800">Financeiro</h2>
                <p className="text-gray-500 mt-1">Gestão de fluxo de caixa, orçamentos e custos operacionais.</p>
            </div>

            {/* Resumo Financeiro */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Entradas (Budget)', value: totalBudget, icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-50' },
                    { title: 'Saídas (Realizado)', value: totalSpent, icon: ArrowDownRight, color: 'text-red-600', bg: 'bg-red-50' },
                    { title: 'A Pagar', value: 12400000, icon: CreditCard, color: 'text-primary', bg: 'bg-primary/10' },
                    { title: 'Margem Bruta', value: totalBudget - totalSpent, icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                            {stat.value.toLocaleString('pt-MZ')} MT
                        </h3>
                    </div>
                ))}
            </div>

            {/* Tabela de Custos por Projeto */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center print:border-none">
                    <h3 className="font-bold text-gray-800 text-lg">Distribuição de Orçamento por Obra</h3>
                    <div className="print:hidden">
                        <ExportPdfButton />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Projeto</th>
                                <th className="px-6 py-4">Orçamento (MT)</th>
                                <th className="px-6 py-4">Gasto Atual (MT)</th>
                                <th className="px-6 py-4">Status Financeiro</th>
                                <th className="px-6 py-4 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {(projects as any[]).map((p, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-800">{p.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{Number(p.budget_total).toLocaleString('pt-MZ')}</td>
                                    <td className="px-6 py-4 text-gray-600">{Number(p.budget_spent).toLocaleString('pt-MZ')}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 w-24 bg-gray-100 rounded-full h-1.5">
                                                <div
                                                    className="bg-primary h-1.5 rounded-full"
                                                    style={{ width: `${Math.min((Number(p.budget_spent) / Number(p.budget_total)) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-500">
                                                {Math.round((Number(p.budget_spent) / Number(p.budget_total)) * 100)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-primary transition-colors">
                                            Ver Extrato
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
