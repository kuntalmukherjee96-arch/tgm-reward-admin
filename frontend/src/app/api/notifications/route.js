import { NextResponse } from 'next/server';

export function GET() {
  const notificationData = {
    unreadCount: 3,
    notifications: [
      { id: "NOTIF_01", type: "WITHDRAWAL_REQUEST", message: "User USR_12 requested a payout of ₹4,160.00 via UPI.", timestamp: "2 mins ago", severity: "warning" },
      { id: "NOTIF_02", type: "SLA_BREACH", message: "Ticket TKT_901 has breached the 2-hour SLA window.", timestamp: "15 mins ago", severity: "danger" },
      { id: "NOTIF_03", type: "SYSTEM_SEC", message: "Idempotency check successfully blocked a duplicate postback.", timestamp: "1 hour ago", severity: "info" }
    ],
    activeChats: [
      { ticketId: "TKT_901", user: "USR_12", lastMessage: "Sir, when will my UPI payout reflect?", time: "10:42 AM" },
      { ticketId: "TKT_902", user: "USR_49", message: "Thanks for resolving my invite limit issue!", time: "9:15 AM" }
    ]
  };

  return NextResponse.json(notificationData);
}