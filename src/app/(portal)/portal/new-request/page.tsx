
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Hash, Construction, ClipboardList, Send, ArrowLeft } from 'lucide-react';
import { insforge } from '@/lib/insforge';

export default function NewRequest() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [projects, setProjects] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProjects() {
            const { data } = await (insforge as any).database.from('projects').select('id, name').eq('status', 'active');
            if (data) setProjects(data);
        }
        loadProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            project_id: formData.get('project_id') as string,
            requester_name: 'João Encarregado', // Hardcoded por enquanto
            item_name: `${formData.get('quantity')} x ${formData.get('material')}`,
            amount: 0,
            status: 'pending',
            priority: 'normal',
            created_at: new Date().toISOString()
        };

        if (!data.project_id || !formData.get('material')) {
            setError('Preencha todos os campos obrigatórios.');
            return;
        }

        startTransition(async () => {
            const { error: dbError } = await (insforge as any).database.from('approvals').insert([data]);
            if (dbError) {
                console.error('DB Error:', dbError);
                setError('Erro ao enviar pedido. Verifique os dados e tente novamente.');
            } else {
                router.push('/portal?success=true');
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Header com botão voltar */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">Fazer Pedido</h2>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2">
                            <Hash size={16} /> {error}
                        </div>
                    )}

                    {/* Seleção de Projeto */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <Construction size={16} className="text-primary" /> Selecionar Obra
                        </label>
                        <select
                            name="project_id"
                            required
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none font-medium"
                        >
                            <option value="">Escolha qual a obra...</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Material */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <Package size={16} className="text-primary" /> Material / Item
                        </label>
                        <input
                            name="material"
                            type="text"
                            required
                            placeholder="Ex: Cimento, Areia, Ferro..."
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                            <ClipboardList size={16} className="text-primary" /> Quantidade
                        </label>
                        <input
                            name="quantity"
                            type="text"
                            required
                            placeholder="Ex: 50 sacos, 5 metros, 20 unid..."
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                        >
                            {isPending ? 'Enviando Pedido...' : (
                                <>
                                    <Send size={20} />
                                    Enviar para Aprovação
                                </>
                            )}
                        </button>
                        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">
                            O administrador será notificado imediatamente.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
