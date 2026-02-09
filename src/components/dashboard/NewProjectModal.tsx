
'use client';

import { useState, useTransition } from 'react';
import { Plus, X, Save, MapPin, Wallet } from 'lucide-react';
import { createProject } from '@/lib/actions';

export function NewProjectModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            location: formData.get('location') as string,
            budget_total: Number(formData.get('budget_total')),
            status: 'active'
        };

        if (!data.name || !data.budget_total) {
            setError('Nome e Orçamento são obrigatórios.');
            return;
        }

        startTransition(async () => {
            const result = await createProject(data);
            if (result.success) {
                setIsOpen(false);
                (e.target as HTMLFormElement).reset();
            } else {
                setError(result.error || 'Erro ao criar projeto');
            }
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
            >
                <Plus size={20} />
                Novo Projeto
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Novo Projeto</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">Nome do Projeto</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Ex: Condomínio Mar Azul"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                    <MapPin size={14} className="text-gray-400" /> Localização
                                </label>
                                <input
                                    name="location"
                                    type="text"
                                    placeholder="Ex: Maputo, Costa do Sol"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                    <Wallet size={14} className="text-gray-400" /> Orçamento Inicial (MT)
                                </label>
                                <input
                                    name="budget_total"
                                    type="number"
                                    placeholder="Ex: 5000000"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-all disabled:opacity-50"
                                >
                                    {isPending ? 'Salvando...' : (
                                        <>
                                            <Save size={18} />
                                            Criar Projeto
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
