// 💸 SPRINT 13 CONDITIONAL UPDATE: FINANCIAL OPERATIONS
// ADR 021: Treasury Approval Stages (Approved -> Treasury -> Paid -> Settled)

class FinanceOperationsEngine {
    constructor(eventBus, configCenter, ledger) {
        this.eventBus = eventBus;
        this.configCenter = configCenter; 
        this.ledger = ledger; 
        this.withdrawalQueue = new Map(); 
    }

    requestWithdrawal(userId, amountCoins) {
        const withdrawalId = `WD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const requestPayload = {
            id: withdrawalId, userId, amountCoins, status: 'PENDING_REVIEW', timestamp: new Date().toISOString()
        };
        this.withdrawalQueue.set(withdrawalId, requestPayload);
        console.log(`\n[FINANCE] 📥 Withdrawal ${withdrawalId} Queued (Status: PENDING_REVIEW)`);
        return requestPayload;
    }

    // Stage 1: Ops Approval (Does NOT send money yet)
    approveForTreasury(adminId, withdrawalId) {
        const request = this.withdrawalQueue.get(withdrawalId);
        if (!request || request.status !== 'PENDING_REVIEW') throw new Error("Invalid state for approval.");
        
        request.status = 'APPROVED_PENDING_TREASURY';
        request.approvedBy = adminId;
        
        console.log(`\n[FINANCE] 🔐 Ops Admin ${adminId} approved ${withdrawalId}. Moved to Treasury Queue.`);
        return request;
    }

    // Stage 2: Treasury Execution (Actual Money Sent via API/Manual)
    processTreasuryPayout(treasuryAdminId, withdrawalId, externalTxHash) {
        const request = this.withdrawalQueue.get(withdrawalId);
        if (!request || request.status !== 'APPROVED_PENDING_TREASURY') {
            throw new Error("409_CONFLICT: Must be approved by Ops first before Treasury payout.");
        }

        request.status = 'PAID_AND_SETTLED';
        request.treasuryAdminId = treasuryAdminId;
        request.externalTxHash = externalTxHash; // Evidence of actual payment
        
        // Rule 1: Only NOW do we touch the Ledger
        this.ledger.decrementBalance(request.userId, request.amountCoins);
        this.eventBus.emit('WITHDRAWAL_SETTLED', request);
        
        console.log(`\n[TREASURY] 💰 Payout executed for ${withdrawalId}. Hash: ${externalTxHash}`);
        console.log(`   ✅ Ledger updated successfully. Status: PAID_AND_SETTLED.`);
        return request;
    }
}

module.exports = FinanceOperationsEngine;