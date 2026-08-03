// /apps/admin/app/api/provider/callback/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider_id, transaction_id, user_id, gross_revenue_inr } = body;

    if (!provider_id || !transaction_id || !user_id || !gross_revenue_inr) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // 1. Fetch Economy Config
    const { data: config } = await supabase.from('economy_config').select('*').single();
    
    const userShareInr = (gross_revenue_inr * config.user_share_pct) / 100;
    const platformShareInr = (gross_revenue_inr * config.platform_share_pct) / 100;
    const coinsToReward = Math.floor(userShareInr / config.coin_value_inr);

    // 2. Insert into Platform Ledger
    const { data: platformLedger, error: platformLedgerError } = await supabase.from('platform_ledger').insert([{
      provider_id, transaction_id, gross_revenue_inr, user_share_inr: userShareInr, platform_share_inr: platformShareInr
    }]).select('id').single();

    if (platformLedgerError) {
      if (platformLedgerError.code === '23505') {
        // Log Duplicate Blocked to Audit Feed
        await supabase.from('audit_timeline_feed').insert([{
            actor: provider_id, action_type: 'Duplicate Blocked', amount: gross_revenue_inr, status: 'failed', details: `Txn: ${transaction_id}`
        }]);
        return NextResponse.json({ success: false, message: '409 Conflict: Duplicate Blocked!' }, { status: 409 });
      }
      throw platformLedgerError;
    }

    // 3. Insert into Advanced Distribution Ledger (Mentor Point 1)
    await supabase.from('revenue_distribution_ledger').insert([{
        platform_ledger_id: platformLedger.id, provider_id, gross_revenue: gross_revenue_inr, user_share: userShareInr, platform_share: platformShareInr
    }]);

    // 4. Trigger Wallet RPC
    await supabase.rpc('process_wallet_transaction', {
      p_user_id: user_id, p_amount: coinsToReward, p_action: 'ADD_COINS', p_reason: `Offer via ${provider_id}`,
      p_idempotency_key: transaction_id, p_ip_address: req.headers.get('x-forwarded-for') || '127.0.0.1',
      p_device_id: 'Server Callback', p_provider_id: provider_id
    });

    // 5. Insert into Live Audit Feed (Mentor Point 4)
    await supabase.from('audit_timeline_feed').insert([{
        actor: provider_id, action_type: 'Revenue Distributed', amount: gross_revenue_inr, status: 'success', details: `User received ${coinsToReward} coins`
    }]);

    return NextResponse.json({
      success: true, message: 'Revenue Distributed & Audit Logged Successfully'
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + err.message }, { status: 500 });
  }
}