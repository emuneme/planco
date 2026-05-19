import { NextResponse } from 'next/server';
import { serviceSupabase } from '@/lib/insforge';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      project_id,
      requester_name,
      item_name,
      amount,
      status,
      priority,
      created_at,
    } = payload;

    if (!project_id || !requester_name || !item_name || !status || !priority || !created_at) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
    }

    const { error } = await serviceSupabase
      .from('approvals')
      .insert([
        {
          project_id,
          requester_name,
          item_name,
          amount,
          status,
          priority,
          created_at,
        },
      ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno ao processar request' }, { status: 500 });
  }
}
