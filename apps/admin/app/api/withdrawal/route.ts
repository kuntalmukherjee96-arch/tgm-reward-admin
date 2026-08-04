import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase Connection
const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

// 🟢 GET: Fetch Withdrawal Requests for Admin Dashboard
export async function GET(req: Request) {
  try {
    // URL থেকে status প্যারামিটার পড়া (ডিফল্ট: PENDING_POLICY_CHECK)
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'PENDING_POLICY_CHECK';

    // 🧠 Supabase থেকে Withdrawal ডেটা ফেচ করা
    const { data: withdrawals, error } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({
        success: false,
        message: 'Failed to retrieve withdrawal requests',
        error: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `${status} withdrawal requests retrieved successfully`,
      data: withdrawals
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ 
        success: false, 
        message: 'Crash: ' + String(err?.message || err) 
    }, { status: 500 });
  }
}