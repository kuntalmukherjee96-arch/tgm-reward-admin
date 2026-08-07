import { NextResponse } from 'next/server';

export async function GET() {
  const financeData = {
    treasuryReserveUSD: 24589.50,
    treasuryReserveINR: "₹2,045,846.40",
    totalSettledTodayUSD: 1450.00,
    pendingPayoutsUSD: 75.00,
    ledgerAuditTrail: [
      { ref: "LEDGER_DEBIT_WDL_10923B", providerRef: "UPI_TXN_998822", timestamp: "2026-08-07 14:10", operator: "FINANCE_ADMIN", amount: "$50.00 (₹4,160.00)", status: "SETTLED_RULE22" },
      { ref: "LEDGER_DEBIT_WDL_10922A", providerRef: "UPI_TXN_776655", timestamp: "2026-08-07 11:05", operator: "FINANCE_ADMIN", amount: "$25.00 (₹2,080.00)", status: "SETTLED_RULE22" }
    ],
    reserveHealth: "OPTIMAL (100% Backed)"
  };

  return NextResponse.json(financeData);
}