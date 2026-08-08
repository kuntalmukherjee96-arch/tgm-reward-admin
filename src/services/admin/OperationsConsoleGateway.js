// 🌍 SPRINT 14 PHASE 5: PLATFORM OPERATIONS CONSOLE
// ADR 025: Unified Platform Operations Console Architecture

class OperationsConsoleGateway {
    constructor(healthMonitor, financeQueue, ticketSystem, providerManager) {
        // Rule 23: Gateway doesn't calculate, it just aggregates from core domains
        this.healthMonitor = healthMonitor;
        this.financeQueue = financeQueue;
        this.ticketSystem = ticketSystem;
        this.providerManager = providerManager;
    }

    async getUnifiedDashboard(adminRole) {
        console.log(`\n[OPS CONSOLE] 🌍 Aggregating Unified Dashboard for Role: [${adminRole}]`);

        // Rule 5: Strict RBAC
        if (adminRole !== 'SUPER_ADMIN' && adminRole !== 'OPS_ADMIN') {
            throw new Error("403_FORBIDDEN: Access denied to Operations Console.");
        }

        try {
            // Fetching all critical metrics parallelly
            const systemHealth = await this.healthMonitor.getOverallHealth();
            const pendingWithdrawals = await this.financeQueue.getPendingCount();
            const openTickets = await this.ticketSystem.getOpenTicketCount();
            const providerStatus = await this.providerManager.getActiveProviders();

            const dashboardResponse = {
                timestamp: new Date().toISOString(),
                system_health: systemHealth,
                live_queues: {
                    finance_pending_review: pendingWithdrawals,
                    support_open_tickets: openTickets
                },
                providers_active: providerStatus,
                alerts: this._generateAlerts(systemHealth, pendingWithdrawals)
            };

            console.log(`   ✅ Unified Operations Data Aggregated Successfully.`);
            return dashboardResponse;

        } catch (error) {
            console.error(`   ⛔ [ERROR] Console Aggregation Failed: ${error.message}`);
            throw new Error("500_INTERNAL_SERVER_ERROR: Cannot load Operations Console.");
        }
    }

    _generateAlerts(health, pendingWithdrawals) {
        let alerts = [];
        if (health !== 'OK') alerts.push({ level: 'CRITICAL', msg: 'System Health Degradation Detected' });
        if (pendingWithdrawals > 50) alerts.push({ level: 'WARNING', msg: 'High Finance Queue Backlog' });
        return alerts;
    }
}

module.exports = OperationsConsoleGateway;