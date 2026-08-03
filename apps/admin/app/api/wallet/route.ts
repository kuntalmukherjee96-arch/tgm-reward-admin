// /apps/admin/app/api/wallet/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: dbWallet, error } = await supabase.from('user_wallets').select('*').eq('user_id', 'admin-999').single();
    if (dbWallet && !error) return NextResponse.json({ success: true, data: dbWallet }, { status: 200 });
    return NextResponse.json({ success: false, message: 'Wallet not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, amount, reason, idempotency_key, device_id, provider_id } = body;
    
    // IP Extraction for Audit (Point 4)
    const ip_address = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Enterprise Validations
    if (!amount || amount <= 0) return NextResponse.json({ success: false, message: 'Invalid amount' }, { status: 400 });
    if (amount > 100000000) return NextResponse.json({ success: false, message: 'System Rejected: Overflow Protection' }, { status: 400 });
    if (!idempotency_key) return NextResponse.json({ success: false, message: 'Idempotency Key missing (Double Spend Protection)' }, { status: 400 });

    // 2. Execute Stored Procedure (Row Lock, Atomic Update, Ledger Insert)
    const { data, error } = await supabase.rpc('process_wallet_transaction', {
      p_user_id: 'admin-999',
      p_amount: amount,
      p_action: action,
      p_reason: reason || 'Manual Adjustment',
      p_idempotency_key: idempotency_key,
      p_ip_address: ip_address,
      p_device_id: device_id || 'Unknown',
      p_provider_id: provider_id || 'System'
    });

    if (error) {
      if (error.message.includes('Duplicate Transaction') || error.message.includes('duplicate key value')) {
        return NextResponse.json({ success: false, message: '409 Conflict: Double Spending Detected! Transaction blocked.' }, { status: 409 });
      }
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Transaction Successful: ${reason}`,
      transaction_details: data
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + err.message }, { status: 500 });
  }
}