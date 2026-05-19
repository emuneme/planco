'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Hash, Construction, ClipboardList, Send } from 'lucide-react';

type ProjectOption = {
  id: string;
  name: string;
};

type NewRequestFormProps = {
  projects: ProjectOption[];
};

export default function NewRequestForm({ projects }: NewRequestFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const project_id = formData.get('project_id') as string;
    const material = formData.get('material') as string;
    const quantity = formData.get('quantity') as string;

    if (!project_id || !material || !quantity) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    const data = {
      project_id,
      requester_name: 'João Encarregado',
      item_name: `${quantity} x ${material}`,
      amount: 0,
      status: 'pending',
      priority: 'normal',
      created_at: new Date().toISOString(),
    };

    startTransition(async () => {
      try {
        const response = await fetch('/api/approvals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error('API Error:', result);
          setError('Erro ao enviar pedido. Verifique os dados e tente novamente.');
          return;
        }

        router.push('/portal?success=true');
      } catch (err) {
        console.error('Submit Error:', err);
        setError('Erro ao enviar pedido. Verifique sua conexão e tente novamente.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2">
          <Hash size={16} /> {error}
        </div>
      )}

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
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

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
  );
}
