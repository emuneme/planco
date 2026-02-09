
'use client';

import { FileText } from 'lucide-react';

export function ExportPdfButton() {
    return (
        <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-primary font-semibold text-sm hover:bg-primary/5 px-3 py-2 rounded-lg transition-all"
        >
            <FileText size={18} />
            Exportar PDF
        </button>
    );
}
