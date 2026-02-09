'use client';

import { Bell, Search, User, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TopBar() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/projects?q=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10 transition-all duration-300">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
                    <Menu size={24} />
                </button>
                <form onSubmit={handleSearch} className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar projeto..."
                        className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-colors w-64"
                    />
                </form>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-gray-700">Admin User</p>
                        <p className="text-xs text-gray-500">Maputo, MZ</p>
                    </div>
                    <a href="/settings" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
                        <User size={20} />
                    </a>
                </div>
            </div>
        </header>
    );
}
