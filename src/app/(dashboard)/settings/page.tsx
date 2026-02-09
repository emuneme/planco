
'use client';

import { User, Shield, Bell, Save } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Perfil', icon: User },
        { id: 'security', label: 'Segurança', icon: Shield },
        { id: 'notifications', label: 'Notificações', icon: Bell },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-display font-bold text-gray-800">Configurações</h2>
                <p className="text-gray-500 mt-1">Gerencie suas preferências de conta e segurança do sistema.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Sidebar de Configurações */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === tab.id
                                ? 'bg-white text-primary shadow-sm border border-gray-100'
                                : 'text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Conteúdo da Tab */}
                <div className="flex-1 p-8">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-4">Informações do Perfil</h3>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-dashed border-primary/30">
                                    <User size={40} />
                                </div>
                                <div>
                                    <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                                        Alterar Foto
                                    </button>
                                    <p className="text-xs text-gray-400 mt-2">JPG, GIF ou PNG. Máximo de 2MB.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Nome Completo</label>
                                    <input type="text" defaultValue="Admin User" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">E-mail</label>
                                    <input type="email" defaultValue="admin@planco.mz" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Cargo</label>
                                    <input type="text" defaultValue="Diretor Financeiro" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Telefone</label>
                                    <input type="text" defaultValue="+258 84 000 0000" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                            </div>

                            <div className="pt-6 border-t mt-8 flex justify-end">
                                <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-all shadow-sm">
                                    <Save size={18} />
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-4">Segurança da Conta</h3>

                            <div className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Senha Atual</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Nova Senha</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Confirmar Nova Senha</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                                </div>
                            </div>

                            <div className="pt-6 border-t mt-8">
                                <h4 className="font-semibold text-gray-800 mb-4">Autenticação de Dois Fatores (2FA)</h4>
                                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Proteger minha conta com 2FA</p>
                                        <p className="text-xs text-gray-500">Adicione uma camada extra de segurança usando seu telefone.</p>
                                    </div>
                                    <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors hover:bg-gray-300">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-all shadow-sm">
                                    <Save size={18} />
                                    Atualizar Senha
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-4">Preferências de Notificação</h3>

                            <div className="space-y-4">
                                {[
                                    { title: 'Novas Aprovações', desc: 'Receber alerta quando houver requisições pendentes.', enabled: true },
                                    { title: 'Alertas de Orçamento', desc: 'Notificar quando um projeto atingir 90% do limite.', enabled: true },
                                    { title: 'Relatórios Semanais', desc: 'Enviar resumo financeiro toda segunda-feira.', enabled: false },
                                    { title: 'Ações de Equipe', desc: 'Notificar quando outros admins aprovarem/rejeitarem.', enabled: false },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 border-dashed">
                                        <div>
                                            <p className="font-semibold text-gray-800">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                        <button className={`w-12 h-6 rounded-full relative transition-colors ${item.enabled ? 'bg-primary' : 'bg-gray-200'}`}>
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.enabled ? 'right-1' : 'left-1'}`}></div>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t mt-8 flex justify-end">
                                <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-all shadow-sm">
                                    <Save size={18} />
                                    Salvar Preferências
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
