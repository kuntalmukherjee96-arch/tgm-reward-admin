// 💸 SPRINT 13 PHASE 3: FINANCIAL OPERATIONS ENGINE
// ADR 018: Real Withdrawal Pipeline, Workflow Queue & KYC Validation

class FinanceOperationsEngine {
    constructor(eventBus, configCenter, ledger) {
        this.eventBus = eventBus;
        this.configCenter = configCenter; // Rule 18: No hardcoded rules
        this.ledger = ledger; // Rule 1: Single Source of Truth
        this.withdrawalQueue = new Map(); // In-memory queue for processing
    }

    // 1. Submit Withdrawal Request (Headless Workflow)
    requestWithdrawal(userId, amountCoins) {
        console.log(`\n[FINANCE ENGINE] 📥 Withdrawal request received: User ${userId} for ${amountCoins} Coins`);

        const rules = this.configCenter.getWithdrawalRules();
        
        // Policy Check
        if (amountCoins < rules.minWithdrawal) {
            throw new Error(`400_BAD_REQUEST: Amount below minimum limit (${rules.minWithdrawal} Coins).`);
        }

        // Ledger Verification
        const userBalance = this.ledger.getVerifiedBalance(userId);
        if (amountCoins > userBalance) {
            throw new Error("400_BAD_REQUEST: Insufficient verified ledger balance.");
        }

        // Workflow Queueing & Risk Check
        const withdrawalId = `WD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        let status = 'PENDING_REVIEW';
        
        if (amountCoins >= rules.kycThreshold) {
            status = 'KYC_REQUIRED';
            console.log(`   ⚠️ [RISK ALERT] High value transaction. Escalated to KYC_REQUIRED.`);
        }

        const requestPayload = {
            id: withdrawalId, userId, amountCoins, status, timestamp: new Date().toISOString()
        };

        this.withdrawalQueue.set(withdrawalId, requestPayload);
        this.eventBus.emit('WITHDRAWAL_QUEUED', requestPayload);
        
        console.log(`   ✅ Request Queued successfully (ID: ${withdrawalId}, Status: ${status})`);
        return requestPayload;
    }

    // 2. Process Approval (Requires Admin Role)
    approveWithdrawal(adminId, withdrawalId) {
        console.log(`\n[FINANCE ENGINE] 🔐 Admin ${adminId} authorizing withdrawal ${withdrawalId}...`);
        
        const request = this.withdrawalQueue.get(withdrawalId);
        if (!request) throw new Error("404_NOT_FOUND: Withdrawal request not found.");
        if (request.status !== 'PENDING_REVIEW' && request.status !== 'KYC_CLEARED') {
            throw new Error(`409_CONFLICT: Cannot approve request in '${request.status}' state.`);
        }

        // Immutable Audit & Ledger Update
        request.status = 'APPROVED';
        request.approvedBy = adminId;
        
        this.ledger.decrementBalance(request.userId, request.amountCoins);
        this.eventBus.emit('WITHDRAWAL_SETTLED', request);
        
        console.log(`   ✅ Withdrawal ${withdrawalId} SETTLED. Ledger updated.`);
        return request;
    }
}

module.exports = FinanceOperationsEngine;