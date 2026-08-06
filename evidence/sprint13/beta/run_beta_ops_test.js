// 🧪 SPRINT 13: CLOSED BETA & FEATURE FLAG EVIDENCE (ADR 020)

const BetaOperationsEngine = require('../../../src/services/beta/BetaOperationsEngine');

console.log("===============================================================");
console.log("🚀 STARTING SPRINT 13: BETA ONBOARDING & FEATURE FLAG TEST");
console.log("===============================================================\n");

const mockEventBus = { emit: (event, data) => console.log(`   ➡️ [EVENT BUS] Broadcasted: ${event}`) };

async function runBetaTest() {
    const betaEngine = new BetaOperationsEngine(mockEventBus, {});

    try {
        console.log("--- SCENARIO 1: VALID BETA INVITE ---");
        betaEngine.processBetaRegistration(88776655, 'TINITRI-BETA-01');

        console.log("\n--- SCENARIO 2: REUSED/INVALID BETA INVITE ---");
        // Trying to use the same code again (it was deleted in Scenario 1) or a fake code
        betaEngine.processBetaRegistration(99999999, 'TINITRI-BETA-01');
    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    try {
        console.log("\n--- SCENARIO 3: FEATURE FLAG CHECK (ENABLED) ---");
        betaEngine.checkFeatureAccess('isLootablyEnabled');
        console.log("   ✅ Lootably module is accessible.");

        console.log("\n--- SCENARIO 4: FEATURE FLAG CHECK (DISABLED) ---");
        betaEngine.checkFeatureAccess('isWithdrawalEnabled'); // This is false by default
    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 BETA OPERATIONS EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runBetaTest();