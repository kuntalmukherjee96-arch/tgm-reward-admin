// 📱 SPRINT 14 PHASE 2 & 3: USER EXPERIENCE & TELEGRAM CLIENT
// ADR 024: Headless User Dashboard & Aggregated API Gateway

class UserClientGateway {
    constructor(ledgerProjection, ticketSystem, analyticsEngine) {
        this.ledger = ledgerProjection; // Rule 23: Read-only projection
        this.tickets = ticketSystem;
        this.analytics = analyticsEngine; // Rule 19: Observability
    }

    // Aggregated Dashboard API optimized for Telegram Mini App
    async getUserDashboardSummary(userId) {
        console.log(`\n[USER GATEWAY] 📱 Fetching Dashboard Summary for User: ${userId}`);
        
        // Rule 19: Emit observability metric
        this.analytics.logEvent('DASHBOARD_VIEWED', userId);

        try {
            // Fetching all necessary data parallelly for speed (Mocked as sequential here for simplicity)
            const wallet = await this.ledger.getBalance(userId);
            const recentEarnings = await this.ledger.getRecentTransactions(userId, 3);
            const activeTickets = await this.tickets.getActiveTickets(userId);

            // Structuring response explicitly for the Telegram Client UI
            const response = {
                status: "SUCCESS",
                data: {
                    user_id: userId,
                    wallet_balance: wallet.balance,
                    currency: 'COINS',
                    recent_earnings: recentEarnings,
                    support_status: {
                        open_tickets: activeTickets.length,
                        requires_attention: activeTickets.some(t => t.status === 'WAITING_ON_USER')
                    }
                },
                meta: {
                    client_optimized: true,
                    rendered_at: new Date().toISOString()
                }
            };

            console.log(`   ✅ Successfully aggregated data for Telegram Client.`);
            return response;

        } catch (error) {
            console.error(`   ⛔ [ERROR] Failed to aggregate dashboard: ${error.message}`);
            throw new Error("500_INTERNAL_SERVER_ERROR: Unable to load dashboard.");
        }
    }
}

module.exports = UserClientGateway;