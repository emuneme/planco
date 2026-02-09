

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    icon?: React.ElementType;
    className?: string;
}

export function StatCard({ title, value, trend, icon: Icon, className = '' }: StatCardProps) {
    return (
        <div className={`p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-1">
                        {value}
                    </h3>
                </div>
                {Icon && (
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <Icon size={24} />
                    </div>
                )}
            </div>

            {trend && (
                <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{trend.value}</span>
                    <span className="text-gray-400 font-normal ml-1">vs mês anterior</span>
                </div>
            )}
        </div>
    );
}
