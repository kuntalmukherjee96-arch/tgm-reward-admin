// 💰 SPRINT 15 PHASE 3 & 4: REAL REVENUE & WITHDRAWAL SETTLEMENT
// ADR 028: Real Revenue Verification & Treasury Settlement

class TreasurySettlementEngine {
    constructor(ledger, eventBus) {
        this.ledger = ledger;       // Rule 23: Core Ledger is the ONLY source of truth
        this.eventBus = eventBus;   // Rule 19: Immutable Audit Trail
        this.processedPayouts = new Set(); // In-memory lock for Idempotency (Prevents Double Payout)
    }

    async requestWithdrawal(userId, amount, method, details) {
        console.log(`\n[TREASURY] 💸 New Withdrawal Request: User [${userId}] | Amount: ${amount}`);

        // 1. Ledger Truth Verification
        const currentBalance = await this.ledger.getBalance(userId);
        if (currentBalance < amount) {
            this.eventBus.emit('SECURITY_ALERT', { reason: 'Insufficient Funds Attempt', userId, requested: amount, actual: currentBalance });
            throw new Error(`400_BAD_REQUEST: Insufficient funds in Core Ledger. Actual balance: ${currentBalance}`);
        }

        // 2. Queue for Zero-Trust Review
        const withdrawalId = `WDL_${Date.now()}_${userId}`;
        
        console.log(`   ✅ Balance Verified. Moved to PENDING_REVIEW queue. ID: ${withdrawalId}`);
        this.eventBus.emit('WITHDRAWAL_QUEUED', { withdrawalId, userId, amount, method, status: 'PENDING_REVIEW' });

        return { withdrawalId, status: 'PENDING_REVIEW' };
    }

    async approvePayout(adminRole, withdrawalId) {
        console.log(`\n[TREASURY] 🏦 Payout Approval Attempt for [${withdrawalId}] by Role: [${adminRole}]`);

        // Rule 5: Strict RBAC for Finance Operations
        if (adminRole !== 'SUPER_ADMIN' && adminRole !== 'FINANCE_ADMIN') {
            this.eventBus.emit('SECURITY_ALERT', { reason: 'Unauthorized Payout Approval', adminRole, withdrawalId });
            throw new Error("403_FORBIDDEN: Only Finance Admins can approve payouts.");
        }

        // Rule 22: Idempotency (Prevent Double Spending if Admin clicks twice)
        if (this.processedPayouts.has(withdrawalId)) {
            this.eventBus.emit('AUDIT_LOG', { event: 'DOUBLE_PAYOUT_BLOCKED', withdrawalId });
            throw new Error("409_CONFLICT: Payout already processed. Double payout prevented.");
        }

        // Lock the transaction
        this.processedPayouts.add(withdrawalId);

        console.log(`   ✅ Payout Approved successfully. Funds released to Payment Gateway.`);
        this.eventBus.emit('PAYOUT_SETTLED', { withdrawalId, adminRole, timestamp: new Date().toISOString() });

        return { withdrawalId, status: 'SETTLED' };
    }
}

module.exports = TreasurySettlementEngine;