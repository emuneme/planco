
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background-light">
            <Sidebar />

            <div className="flex-1 ml-64">
                <TopBar />

                <main className="pt-24 px-8 pb-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
