
'use server';

import { serviceSupabase } from './insforge';
import { revalidatePath } from 'next/cache';

export async function updateApprovalStatus(id: string, status: 'approved' | 'rejected') {
    try {
        const { error } = await serviceSupabase
            .from('approvals')
            .update({ status })
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/(dashboard)');
        return { success: true };
    } catch (error) {
        console.error('Error updating approval status:', error);
        return { success: false, error: 'Falha ao atualizar status' };
    }
}

export async function createProject(formData: { name: string; location: string; budget_total: number; status: string }) {
    try {
const { error } = await serviceSupabase
            .from('projects')
            .insert([{
                ...formData,
                budget_spent: 0,
                created_at: new Date().toISOString()
            }]);

        if (error) throw error;

        revalidatePath('/projects');
        revalidatePath('/(dashboard)');
        return { success: true };
    } catch (error) {
        console.error('Error creating project:', error);
        return { success: false, error: 'Falha ao criar projeto' };
    }
}

export async function signOut() {
    try {
        // Redirecionamento simples para login
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}
