// /apps/admin/app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Core Configs Fetch
    const { data: config } = await supabase.from('economy_config').select('coin_value_inr').single();
    const coinValue = config?.coin_value_inr || 0.01;

    // 2. Fetch Ledger (For Revenue & Forecast)
    const { data: ledgerEntries } = await supabase.from('platform_ledger').select('*');
    let grossRevenue = 0, platformRevenue = 0, todayRevenue = 0;
    const providerWise: Record<string, any> = {};

    const today = new Date().toISOString().split('T')[0];

    (ledgerEntries || []).forEach((entry: any) => {
      grossRevenue += Number(entry.gross_revenue_inr);
      platformRevenue += Number(entry.platform_share_inr);
      
      // Provider Analytics (Mentor Point 3)
      if (!providerWise[entry.provider_id]) {
         providerWise[entry.provider_id] = { total_revenue: 0, transactions: 0 };
      }
      providerWise[entry.provider_id].total_revenue += Number(entry.gross_revenue_inr);
      providerWise[entry.provider_id].transactions += 1;

      // Today's Revenue Calculation
      if (entry.created_at.startsWith(today)) {
         todayRevenue += Number(entry.gross_revenue_inr);
      }
    });

    // 3. Liabilities Fetch
    const { data: wallets } = await supabase.from('user_wallets').select('tinitri_coins');
    let totalCoins = 0;
    (wallets || []).forEach((w: any) => totalCoins += Number(w.tinitri_coins));
    const userLiability = totalCoins * coinValue;

    // 4. Fixed Salary Fetch
    const { data: salaries } = await supabase.from('salary_config').select('fixed_salary_inr');
    let salaryExpense = 0;
    (salaries || []).forEach((s: any) => salaryExpense += Number(s.fixed_salary_inr));

    const netProfit = platformRevenue - salaryExpense;

    // 5. FORECAST ENGINE (Mentor Point 5)
    // Predicting monthly revenue based on today's performance
    const projectedMonthly = todayRevenue > 0 ? todayRevenue * 30 : grossRevenue * 30;
    const expectedProfit = (projectedMonthly * 0.70) - salaryExpense; // Assuming avg 70% platform share

    // 6. RESERVE ENGINE (Mentor Point 6)
    // Auto-calculating reserves from Platform Revenue based on DB percentages
    const { data: reserveConfig } = await supabase.from('reserve_engine_config').select('*');
    const reserves: Record<string, string> = {};
    (reserveConfig || []).forEach((r: any) => {
       reserves[r.fund_name] = `₹${((platformRevenue * Number(r.allocation_percentage)) / 100).toFixed(2)} (${r.allocation_percentage}%)`;
    });

    // 7. LIVE AUDIT FEED (Mentor Point 4)
    const { data: auditFeed } = await supabase.from('audit_timeline_feed')
      .select('event_time, actor, action_type, amount, status')
      .order('event_time', { ascending: false }).limit(5);

    // 8. Output Final Enterprise Dashboard
    return NextResponse.json({
      success: true,
      enterprise_operating_system: {
        financial_statement: {
          gross_revenue_inr: `₹${grossRevenue.toFixed(2)}`,
          platform_revenue_inr: `₹${platformRevenue.toFixed(2)}`,
          salary_expense_inr: `₹${salaryExpense.toFixed(2)}`,
          net_profit_inr: `₹${netProfit.toFixed(2)}`
        },
        forecast_engine: {
          today_revenue: `₹${todayRevenue.toFixed(2)}`,
          projected_monthly_revenue: `₹${projectedMonthly.toFixed(2)}`,
          expected_monthly_profit: `₹${expectedProfit.toFixed(2)}`
        },
        reserve_engine: reserves,
        liabilities: {
          total_coins_minted: totalCoins,
          outstanding_user_liability: `₹${userLiability.toFixed(2)}`
        },
        provider_analytics: providerWise,
        live_audit_feed: auditFeed || []
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + err.message }, { status: 500 });
  }
}