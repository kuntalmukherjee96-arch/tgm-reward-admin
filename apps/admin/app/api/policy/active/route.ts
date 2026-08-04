import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase Connection (Collected from your economy route)
const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';

const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 🧠 Fetching the Active Master Policy from Database
    const { data: dbPolicy, error } = await supabase
      .from('system_policies')
      .select('*')
      .eq('is_active', true)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    // If fetching fails, we strictly error out. No Hardcoded Fallback!
    if (error || !dbPolicy) {
      return NextResponse.json({
        success: false,
        message: 'Failed to retrieve active enterprise policy',
        error: error ? String(error.message) : "No active policy found"
      }, { status: 500 });
    }

    // 🚀 Success: Returning the Live Dashboard Config
    return NextResponse.json({
      success: true,
      message: 'Active Enterprise Policy Retrieved',
      data: {
        version: dbPolicy.version,
        currency: dbPolicy.platform_currency,
        coin_conversion_rate: dbPolicy.coin_conversion_rate,
        revenue_split: {
          platform_percent: dbPolicy.platform_share_percent,
          user_percent: dbPolicy.user_share_percent
        },
        funds_allocation: {
          salary_percent: dbPolicy.salary_fund_percent,
          emergency_percent: dbPolicy.emergency_fund_percent,
          operating_percent: dbPolicy.operating_fund_percent,
          reserve_percent: dbPolicy.withdrawal_reserve_percent
        },
        withdrawal_rules: {
          min_amount: dbPolicy.min_withdrawal_amount,
          max_amount: dbPolicy.max_withdrawal_amount,
          daily_limit: dbPolicy.daily_withdrawal_limit,
          auto_approval_threshold: dbPolicy.auto_approval_threshold
        },
        status: 'active',
        source: 'Live System Policies Table'
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ 
        success: false, 
        message: 'Crash: ' + String(err?.message || err) 
    }, { status: 500 });
  }
}