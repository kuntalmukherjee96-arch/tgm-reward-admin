// 📱 SPRINT 12 PHASE 5: USER EXPERIENCE CORE SERVICE
// Headless API Layer for Wallet, Tasks, and Withdrawals (ADR 015)

class UserExperienceService {
    constructor() {
        // Mock injected dependencies for the core service
        this.mockLedger = { getVerifiedBalance: (uid) => 2500 };
        this.mockWorkflow = { createTicket: () => `TKT-${Math.floor(Math.random() * 1000) + 1000}` };
    }

    // Rule 1: Wallet balance is always dynamically read from the Ledger
    async getWalletBalance(userId) {
        const balance = this.mockLedger.getVerifiedBalance(userId);
        return { userId, balance, currency: 'COINS', timestamp: new Date().toISOString() };
    }

    // Rule 12: Zero Trust - Task completions are just "claims" until verified
    async submitTaskClaim(userId, taskId, claimedReward) {
        console.log(`[UX API] Ingesting task claim from ${userId} for ${taskId}`);
        console.log(`[ROUTER] Forwarding claim to Intelligence & Risk Engine...`);
        
        // Simulating Risk Engine routing (No direct ledger mutation allowed)
        return { status: 'UNDER_REVIEW', message: 'Task completion is under automated review.' };
    }

    // Rule 14: Immutable audit for withdrawal requests
    async requestWithdrawal(userId, amount) {
        console.log(`[UX API] Withdrawal request received: ${userId} -> ${amount} Coins`);
        
        const currentBalance = this.mockLedger.getVerifiedBalance(userId);
        if (amount > currentBalance) {
            throw new Error("400_BAD_REQUEST: Insufficient Funds in Ledger.");
        }

        // Push to Kanban Workflow - Do NOT mutate ledger directly
        const ticketId = this.mockWorkflow.createTicket();
        console.log(`📝 [AUDIT LEDGER] Withdrawal ticket ${ticketId} generated. Operations approval required.`);
        
        return { status: 'PENDING_APPROVAL', ticketId, message: 'Withdrawal submitted to Operations queue.' };
    }
}

module.exports = UserExperienceService;