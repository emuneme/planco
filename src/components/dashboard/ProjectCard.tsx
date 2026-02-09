
import { MapPin, Wallet, TrendingUp, MoreVertical } from 'lucide-react';

interface ProjectCardProps {
    project: {
        id: string;
        name: string;
        location: string | null;
        budget_total: number | string;
        budget_spent: number | string;
        status: string | null;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    const total = Number(project.budget_total);
    const spent = Number(project.budget_spent);
    const percentage = Math.min(Math.round((spent / total) * 100), 100);

    const getStatusColor = (status: string | null) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'on_hold': return 'bg-orange-100 text-orange-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string | null) => {
        switch (status) {
            case 'active': return 'Ativo';
            case 'on_hold': return 'Em Espera';
            case 'completed': return 'Concluído';
            default: return status || 'Pendente';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                        </span>
                        <h3 className="text-xl font-display font-bold text-gray-900 mt-2">{project.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <MapPin size={14} />
                            {project.location || 'Localização não definida'}
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Execução Financeira</span>
                            <span className="font-semibold text-gray-900">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${percentage > 90 ? 'bg-error' : 'bg-primary'}`}
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                <Wallet size={12} /> Orçamento
                            </p>
                            <p className="text-sm font-bold text-gray-900">{total.toLocaleString('pt-MZ')} MT</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                <TrendingUp size={12} /> Gasto
                            </p>
                            <p className="text-sm font-bold text-gray-900">{spent.toLocaleString('pt-MZ')} MT</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <button className="text-primary text-sm font-semibold hover:text-primary-hover transition-colors">
                    Ver Detalhes do Projeto
                </button>
            </div>
        </div>
    );
}
