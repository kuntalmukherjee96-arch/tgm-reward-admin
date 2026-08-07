import { NextResponse } from 'next/server';

export async function POST() {
  // 🧠 Mentor's Demo Dataset Mode: 50 Users, 200 Transactions, 25 Withdrawals, 10 Tickets, 5 Incidents
  const demoDataset = {
    status: "SUCCESS",
    message: "Demo Dataset Mode Activated Successfully.",
    stats: {
      usersLoaded: 50,
      transactionsLoaded: 200,
      withdrawalsLoaded: 25,
      ticketsLoaded: 10,
      incidentsLoaded: 5
    },
    sampleSupportTickets: [
      { id: "TKT_901", user: "USR_12", subject: "Payout delay on UPI", priority: "HIGH", status: "OPEN", sla: "BREACHED" },
      { id: "TKT_902", user: "USR_49", subject: "Invite code limit reached", priority: "MEDIUM", status: "IN_PROGRESS", sla: "WARNING" },
      { id: "TKT_903", user: "USR_22", subject: "KYC verification status", priority: "LOW", status: "CLOSED", sla: "HEALTHY" }
    ]
  };

  return NextResponse.json(demoDataset);
}