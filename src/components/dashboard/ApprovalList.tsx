
'use client';

import { Check, X, Loader2 } from 'lucide-react';
import { updateApprovalStatus } from '@/lib/actions';
import { useTransition } from 'react';

interface Approval {
    id: string;
    requester_name: string;
    item_name: string;
    amount: number | string;
    status: string;
    priority: string;
    project_name?: string;
    created_at: string;
}

interface ApprovalListProps {
    approvals: Approval[];
}

export function ApprovalList({ approvals }: ApprovalListProps) {
    const [isPending, startTransition] = useTransition();

    const handleAction = (id: string, status: 'approved' | 'rejected') => {
        startTransition(async () => {
            await updateApprovalStatus(id, status);
        });
    };

    if (approvals.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500">Nenhuma aprovação pendente.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-display font-semibold text-lg text-gray-800">Aprovações Pendentes</h3>
                <button className="text-sm text-primary hover:text-primary-hover font-medium">Ver todas</button>
            </div>

            <div className="divide-y divide-gray-100">
                {approvals.map((approval) => (
                    <div key={approval.id} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {approval.requester_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-gray-900">{approval.requester_name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{approval.project_name || 'Projeto'}</p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(approval.created_at).toLocaleDateString('pt-MZ')}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded border border-gray-100">
                                Solicitou: <span className="font-semibold">{approval.item_name}</span> - <span className="text-primary font-medium">{Number(approval.amount).toLocaleString('pt-MZ')} MT</span>
                            </p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handleAction(approval.id, 'approved')}
                                    disabled={isPending}
                                    className="flex-1 bg-secondary hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {isPending ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                                    Aprovar
                                </button>
                                <button
                                    onClick={() => handleAction(approval.id, 'rejected')}
                                    disabled={isPending}
                                    className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {isPending ? <Loader2 className="animate-spin" size={16} /> : <X size={16} />}
                                    Rejeitar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
