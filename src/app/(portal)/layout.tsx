
'use client';

import { Construction, Home, List, PlusCircle, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { icon: Home, label: 'Início', href: '/portal' },
        { icon: PlusCircle, label: 'Novo Pedido', href: '/portal/new-request' },
        { icon: List, label: 'Meus Pedidos', href: '/portal/history' },
        { icon: User, label: 'Perfil', href: '/portal/profile' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4 sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Planco Logo" className="h-8 w-auto" />
                </div>
                <button
                    onClick={() => router.push('/login')}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <LogOut size={20} />
                </button>
            </header>

            <main className="flex-1 p-5 max-w-md mx-auto w-full">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary scale-110' : 'text-gray-400'}`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
