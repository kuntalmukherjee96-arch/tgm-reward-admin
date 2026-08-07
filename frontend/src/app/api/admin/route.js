import { NextResponse } from 'next/server';

export async function GET() {
  const adminData = {
    users: [
      { id: "USR_49", email: "user49@tinitri.beta", balance: "$124.50", status: "ACTIVE", joined: "2026-06-01" },
      { id: "USR_50", email: "user50@tinitri.beta", balance: "$45.00", status: "ACTIVE", joined: "2026-06-02" },
      { id: "USR_12", email: "user12@tinitri.beta", balance: "$310.20", status: "PENDING_KYC", joined: "2026-05-15" }
    ],
    withdrawalQueue: [
      { id: "WDL_10923B", user: "USR_12", amount: "$50.00", method: "UPI", status: "PENDING_REVIEW", timestamp: "2026-08-07 14:10" },
      { id: "WDL_10924C", user: "USR_49", amount: "$25.00", method: "BANK_TRANSFER", status: "PENDING_REVIEW", timestamp: "2026-08-07 15:30" }
    ],
    supportTickets: [
      { id: "TKT_881", user: "USR_50", subject: "Payout delay inquiry", priority: "HIGH", status: "OPEN" },
      { id: "TKT_882", user: "USR_12", subject: "Invite code limit reset", priority: "MEDIUM", status: "IN_PROGRESS" }
    ]
  };

  return NextResponse.json(adminData);
}