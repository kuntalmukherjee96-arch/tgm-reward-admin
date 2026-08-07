import { NextResponse } from 'next/server';

export async function GET() {
  // 🌍 Multi-currency localization and FX conversion managed by backend (Rule 24 compliant)
  const adminData = {
    exchangeRate: { base: "USD", target: "INR", rate: 83.20 }, // 1 USD = 83.20 INR
    users: [
      { id: "USR_49", email: "user49@tinitri.beta", balanceUSD: 124.50, balanceLocal: "₹10,358.40", localCurrency: "INR", status: "ACTIVE", joined: "2026-06-01" },
      { id: "USR_50", email: "user50@tinitri.beta", balanceUSD: 45.00, balanceLocal: "₹3,744.00", localCurrency: "INR", status: "ACTIVE", joined: "2026-06-02" },
      { id: "USR_12", email: "user12@tinitri.beta", balanceUSD: 310.20, balanceLocal: "₹25,808.64", localCurrency: "INR", status: "PENDING_KYC", joined: "2026-05-15" }
    ],
    withdrawalQueue: [
      { id: "WDL_10923B", user: "USR_12", amountUSD: "$50.00", amountLocal: "₹4,160.00", method: "UPI (INR)", status: "PENDING_REVIEW", timestamp: "2026-08-07 14:10" },
      { id: "WDL_10924C", user: "USR_49", amountUSD: "$25.00", amountLocal: "₹2,080.00", method: "BANK (INR)", status: "PENDING_REVIEW", timestamp: "2026-08-07 15:30" }
    ],
    supportTickets: [
      { id: "TKT_881", user: "USR_50", subject: "Payout delay inquiry", priority: "HIGH", status: "OPEN" },
      { id: "TKT_882", user: "USR_12", subject: "Invite code limit reset", priority: "MEDIUM", status: "IN_PROGRESS" }
    ]
  };

  return NextResponse.json(adminData);
}