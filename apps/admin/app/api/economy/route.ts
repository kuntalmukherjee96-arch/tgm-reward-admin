// /apps/admin/app/api/economy/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { BUSINESS_RULES } from '../../../config/business-rules';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';

// Now directly connecting with the hardcoded URL and Key
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: dbEconomy, error } = await supabase
      .from('economy_versions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // 1. If success, show Live Database
    if (dbEconomy && !error) {
      return NextResponse.json({
        success: true,
        message: 'Active Economy Config Retrieved from TRIP Database',
        data: {
          version: dbEconomy.version_name,
          points_per_inr: dbEconomy.points_per_inr,
          min_withdrawal_inr: dbEconomy.min_withdrawal_inr,
          coin_equivalent: dbEconomy.min_withdrawal_inr * dbEconomy.points_per_inr,
          status: 'active',
          source: 'Live Supabase Database'
        }
      }, { status: 200 });
    }

    // 2. If it fails, fall back BUT show exactly WHY it failed
    return NextResponse.json({
      success: true,
      message: 'Active Economy Config Retrieved (Fallback Rule)',
      data: {
        version: BUSINESS_RULES.ECONOMY.CURRENT_VERSION,
        points_per_inr: BUSINESS_RULES.ECONOMY.POINTS_PER_INR,
        min_withdrawal_inr: BUSINESS_RULES.WITHDRAWAL.MIN_AMOUNT_INR,
        coin_equivalent: BUSINESS_RULES.WITHDRAWAL.COIN_EQUIVALENT,
        status: 'active',
        source: 'Fallback Config'
      },
      DEBUG_INFO: {
        // Strict Type Casting to prevent TypeScript Build Errors in Vercel
        error_message: error ? String(error.message || JSON.stringify(error)) : "No error, but no data found",
        is_url_loaded: Boolean(supabaseUrl),
        is_key_loaded: Boolean(supabaseKey)
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + String(err?.message || err) }, { status: 500 });
  }
}