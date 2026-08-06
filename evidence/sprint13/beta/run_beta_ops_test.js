// 🧪 SPRINT 13: FEATURE ROLLOUT & BETA ANALYTICS EVIDENCE (ADR 021)

const BetaOperationsEngine = require('../../../src/services/beta/BetaOperationsEngine');

console.log("===============================================================");
console.log("🚀 STARTING SPRINT 13: BETA ANALYTICS & A/B ROLLOUT TEST");
console.log("===============================================================\n");

const mockEventBus = { 
    emit: (event, data) => {
        if (event === 'BETA_ANALYTICS_EVENT') {
            console.log(`   📈 [BETA ANALYTICS] Metric: ${data.metric} | User: ${data.userId}`);
        } else {
            console.log(`   ➡️ [EVENT BUS] Broadcasted: ${event}`);
        }
    }
};

async function runBetaUpdateTest() {
    const betaEngine = new BetaOperationsEngine(mockEventBus);

    try {
        console.log("--- SCENARIO 1: BETA ONBOARDING & ANALYTICS TRIGGER ---");
        betaEngine.processBetaRegistration(88776655, 'TINITRI-BETA-01');

        console.log("\n--- SCENARIO 2: A/B TESTING FEATURE ROLLOUT (20% ACCESS) ---");
        
        // User 5: (5 * 7) % 100 = 35. (35 >= 20 -> BLOCKED)
        try {
            console.log("Checking access for User 5...");
            betaEngine.checkFeatureAccess('newWithdrawalUI', 5);
        } catch (e) {
            console.error(`   ⛔ User 5 [BLOCKED]: ${e.message}`);
        }

        // User 2: (2 * 7) % 100 = 14. (14 < 20 -> ALLOWED)
        try {
            console.log("Checking access for User 2...");
            betaEngine.checkFeatureAccess('newWithdrawalUI', 2);
            console.log("   ✅ User 2 has access to newWithdrawalUI (falls within 20% rollout).");
        } catch (e) {
            console.error(e.message);
        }

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 BETA ENHANCEMENT EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runBetaUpdateTest();