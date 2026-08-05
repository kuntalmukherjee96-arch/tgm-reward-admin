// 🧠 SPRINT 12 PHASE 2: INTELLIGENCE & RISK ENGINE CORE SERVICE
// Headless AI Advisory, Fraud Scoring, and Audit Logging (ADR 012)

class RiskEngineService {
    constructor() {
        // Enterprise rules configuration (Normally loaded from DB/Settings Portal)
        this.rules = {
            highValueThreshold: 1000,
            velocityLimit: 3,
            autoApproveMaxScore: 39,
            highRiskMinScore: 80
        };
    }

    async evaluateTransaction(transaction) {
        let riskScore = 10; // Base risk score
        const auditTrail = [];

        // 1. High-Value Rule
        if (transaction.amount > this.rules.highValueThreshold) {
            riskScore += 40;
            auditTrail.push(`FLAG: High value transaction (> $${this.rules.highValueThreshold})`);
        }

        // 2. Velocity Rule (Too many requests in a short time)
        if (transaction.recentRequestsCount > this.rules.velocityLimit) {
            riskScore += 35;
            auditTrail.push(`FLAG: High velocity detected (${transaction.recentRequestsCount} recent requests)`);
        }

        // 3. New Device/IP Anomaly
        if (transaction.isNewDevice) {
            riskScore += 20;
            auditTrail.push(`FLAG: Action initiated from a new unrecognized device`);
        }

        // Cap the score at 100 max
        riskScore = Math.min(riskScore, 100);

        // Determine Workflow Action (Advisory Only - Alignment with Ledger Rules)
        let recommendedAction;
        if (riskScore >= this.rules.highRiskMinScore) {
            recommendedAction = "REQUIRE_FINANCE_ADMIN_APPROVAL";
        } else if (riskScore > this.rules.autoApproveMaxScore) {
            recommendedAction = "STANDARD_HUMAN_REVIEW";
        } else {
            recommendedAction = "AUTO_APPROVE";
        }

        // Rule 14: Every Business Action Creates History (Immutable Audit)
        this._logToEventBus(transaction.id, riskScore, recommendedAction, auditTrail);

        return {
            transactionId: transaction.id,
            finalScore: riskScore,
            advisory: recommendedAction,
            flags: auditTrail
        };
    }

    _logToEventBus(txId, score, advisory, flags) {
        console.log(`📝 [AUDIT LEDGER] TxID: ${txId} | Risk Score: ${score} | Advisory: ${advisory}`);
        if (flags.length > 0) {
            console.log(`   ↳ Reasons: ${flags.join(' | ')}`);
        }
    }
}

module.exports = RiskEngineService;