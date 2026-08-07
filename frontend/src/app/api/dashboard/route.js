import { NextResponse } from 'next/server';

export async function GET() {
  // 🧠 Rule 21 & 23: Backend providing pure JSON data. No UI logic here.
  const dashboardData = {
    systemStatus: "SYSTEMS OPERATIONAL",
    treasuryReserve: 24589.50,
    activeBetaUsers: 48,
    maxBetaUsers: 50,
    activeProviders: 1,
    providerName: "Lootably (Production Security)",
    pendingWithdrawals: 3,
    ledgerStream: [
      { ref: "TX_9cd405a1", entity: "USR_49", type: "REVENUE_LOOTABLY", value: "+$12.50", status: "SETTLED", color: "blue" },
      { ref: "WDL_10923B", entity: "USR_12", type: "WITHDRAWAL_UPI", value: "-$50.00", status: "PENDING_REVIEW", color: "amber" },
      { ref: "SEC_99X01", entity: "SYSTEM", type: "INVALID_SECRET", value: "--", status: "BLOCKED", color: "red" }
    ],
    incidents: [
      { severity: "CRITICAL", icon: "⚠️", title: "Double Spend Blocked", desc: "Lootably Postback TX_9cd405a1 prevented by Ledger Idempotency check. No payout occurred.", color: "red" },
      { severity: "WARNING", icon: "⚡", title: "Capacity Nearing", desc: "Closed beta at 96% capacity (48/50). Only 2 valid invite slots remaining.", color: "amber" },
      { severity: "INFO", icon: "ℹ️", title: "Admin Login", desc: "Super Admin session verified via secure Headless Gateway.", color: "blue" }
    ]
  };

  return NextResponse.json(dashboardData);
}