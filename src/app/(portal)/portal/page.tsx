
import { Construction, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PortalHome() {
    return (
        <div className="space-y-6">
            {/* Boas Vindas */}
            <div className="bg-primary rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative z-10">
                    <p className="text-white/80 font-medium">Boa tarde,</p>
                    <h2 className="text-3xl font-bold mt-1">Encarregado João</h2>
                    <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
                        <Construction size={16} />
                        Obra: Costa do Sol II
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-3">
                        <Clock size={20} />
                    </div>
                    <p className="text-2xl font-bold text-gray-800">03</p>
                    <p className="text-xs text-gray-500 font-medium">Pendentes</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
                        <CheckCircle2 size={20} />
                    </div>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                    <p className="text-xs text-gray-500 font-medium">Aprovados</p>
                </div>
            </div>

            {/* CTA */}
            <Link
                href="/portal/new-request"
                className="block bg-white border-2 border-dashed border-gray-200 p-6 rounded-3xl text-center hover:border-primary hover:bg-primary/5 transition-all group"
            >
                <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Plus size={24} />
                </div>
                <p className="font-bold text-gray-800">Fazer Novo Pedido</p>
                <p className="text-xs text-gray-500 mt-1">Solicitar materiais para a obra ativa.</p>
            </Link>

            {/* Recent Requests */}
            <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                    <h3 className="font-bold text-gray-800 text-lg">Pedidos Recentes</h3>
                    <Link href="/portal/history" className="text-xs font-bold text-primary uppercase">Ver todos</Link>
                </div>

                {[
                    { item: 'Cimento Portland', qty: '50 Sacos', date: 'Hoje, 14:20', status: 'pending' },
                    { item: 'Areia Lavada', qty: '5m³', date: 'Ontem, 09:15', status: 'approved' },
                    { item: 'Ferro 12mm', qty: '20 Varões', date: '07 Fev, 11:30', status: 'rejected' },
                ].map((req, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${req.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                req.status === 'approved' ? 'bg-green-50 text-green-600' :
                                    'bg-red-50 text-red-600'
                            }`}>
                            {req.status === 'pending' ? <Clock size={22} /> :
                                req.status === 'approved' ? <CheckCircle2 size={22} /> :
                                    <AlertCircle size={22} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 truncate">{req.item}</p>
                            <p className="text-xs text-gray-500 font-medium">{req.qty} • {req.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                req.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    'bg-red-100 text-red-700'
                            }`}>
                            {req.status === 'pending' ? 'Pendente' :
                                req.status === 'approved' ? 'Aprovado' :
                                    'Recusado'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
