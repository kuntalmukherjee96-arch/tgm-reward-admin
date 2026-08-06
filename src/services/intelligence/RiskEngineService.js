// 🧠 SPRINT 12: RISK ENGINE (UPDATED FOR FREEZE)
// Expanded Risk Model: Geo, VPN, Impossible Travel, History Cluster

class RiskEngineService {
    async evaluateTransaction(transaction) {
        let riskScore = 10; 
        const auditTrail = [];

        // 1. Basic Rules
        if (transaction.amount > 1000) { riskScore += 20; auditTrail.push("High value transaction"); }
        if (transaction.recentRequestsCount > 3) { riskScore += 15; auditTrail.push("High velocity"); }

        // 2. Advanced Enterprise Fraud Indicators (New Additions)
        if (transaction.isNewDevice) { riskScore += 10; auditTrail.push("New Device Signature"); }
        if (transaction.vpnProbability > 0.8) { riskScore += 25; auditTrail.push("High VPN/Proxy Probability"); }
        if (transaction.geoDistanceKm > 500 && transaction.timeSinceLastLoginHrs < 2) { 
            riskScore += 40; 
            auditTrail.push("Impossible Travel Detected"); 
        }
        if (transaction.historicalFraudCluster) {
            riskScore += 30;
            auditTrail.push("Matched Historical Fraud Cluster (IP/Device)");
        }

        riskScore = Math.min(riskScore, 100);

        let recommendedAction = "AUTO_APPROVE";
        if (riskScore >= 80) recommendedAction = "REQUIRE_FINANCE_ADMIN_APPROVAL";
        else if (riskScore > 39) recommendedAction = "STANDARD_HUMAN_REVIEW";

        this._logToEventBus(transaction.id, riskScore, recommendedAction, auditTrail);
        return { transactionId: transaction.id, finalScore: riskScore, advisory: recommendedAction, flags: auditTrail };
    }

    _logToEventBus(txId, score, advisory, flags) {
        console.log(`📝 [AUDIT] TxID: ${txId} | Score: ${score} | Advisory: ${advisory}`);
        console.log(`   ↳ Triggers: ${flags.join(' | ')}`);
    }
}

module.exports = RiskEngineService;