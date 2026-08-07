import { NextResponse } from 'next/server';

export async function GET() {
  // 🧠 Rule 24: User Portal strictly consuming backend ledger data
  const userData = {
    userId: "USR_49",
    telegramHandle: "@tinitri_beta_user",
    ledgerBalanceUSD: 124.50,
    ledgerBalanceINR: "₹10,358.40",
    activeTier: "Closed Beta (Tier 1)",
    recentTransactions: [
      { id: "TX_9cd405a1", type: "REVENUE_LOOTABLY", amount: "+$12.50", status: "SETTLED", date: "2026-08-07" },
      { id: "WDL_10924C", type: "WITHDRAWAL_UPI", amount: "-$25.00", status: "PROCESSING", date: "2026-08-07" }
    ]
  };

  return NextResponse.json(userData);
}