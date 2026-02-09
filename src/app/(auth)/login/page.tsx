
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Construction } from 'lucide-react';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulação de login baseado no cargo sugerido pelo e-mail
        // manager@planco.mz -> Portal
        // admin@planco.mz -> Dashboard
        setTimeout(() => {
            if (email.includes('manager')) {
                router.push('/portal');
            } else {
                router.push('/');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-[440px] relative z-10">
                {/* Logo & Branding */}
                <div className="text-center mb-10">
                    <div className="mb-6 hover:scale-105 transition-transform duration-300">
                        <img src="/logo.svg" alt="Planco Logo" className="h-16 w-auto" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
                        Planco<span className="text-primary italic">.</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Gestão Inteligente de Obras</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Bem-vindo de volta</h2>
                        <p className="text-gray-500 text-sm mt-1">Insira suas credenciais para acessar o sistema.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 ml-1">E-mail Corporativo</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-gray-700">Senha</label>
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Esqueceu a senha?</a>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-1 pb-2">
                            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <label htmlFor="remember" className="text-xs text-gray-500 font-medium cursor-pointer">Lembrar neste dispositivo</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Entrar no Sistema
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Info */}
                <p className="text-center text-gray-400 text-sm mt-10">
                    Não tem acesso? <a href="#" className="text-primary font-bold hover:underline">Contacte o Administrador</a>
                </p>
            </div>
        </div>
    );
}
