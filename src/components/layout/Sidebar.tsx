
'use client';

import {
    LayoutDashboard,
    FolderKanban,
    Wallet,
    CheckSquare,
    Settings,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: FolderKanban, label: 'Projetos', href: '/projects' },
    { icon: Wallet, label: 'Finanças', href: '/finance' },
    { icon: CheckSquare, label: 'Aprovações', href: '/approvals' },
    { icon: Settings, label: 'Configurações', href: '/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-dark text-white flex flex-col border-r border-gray-800">
            <div className="p-6 border-b border-gray-800">
                <img src="/logo.svg" alt="Planco Logo" className="h-10 w-auto brightness-200" />
                <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">Painel Administrativo</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive
                                    ? 'bg-primary/10 text-primary border-l-4 border-primary'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={async () => {
                        const { signOut } = await import('@/lib/actions');
                        await signOut();
                        window.location.href = '/login'; // Redirecionamento simples
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Sair</span>
                </button>
            </div>
        </aside>
    );
}
