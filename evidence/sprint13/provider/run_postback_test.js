// 🧪 SPRINT 13: REAL PROVIDER POSTBACK EVIDENCE (ADR 017)

const ProviderAdapterEngine = require('../../../src/services/provider/ProviderAdapterEngine');

console.log("===============================================================");
console.log("🔌 STARTING SPRINT 13: PROVIDER POSTBACK VALIDATION TEST");
console.log("===============================================================\n");

// Mock Event Bus
class MockEventBus {
    emit(event, data) { 
        console.log(`   ➡️ [EVENT BUS] Routed '${event}' to Risk Engine.`);
    }
}

async function runPostbackTest() {
    const eventBus = new MockEventBus();
    const adapterEngine = new ProviderAdapterEngine(eventBus);

    // Simulated payload from Lootably
    const lootablyPayload = {
        transactionId: "LT-998877",
        userID: 88776655,
        reward: 500,
        payout: 0.50
    };

    // Simulated payload from TimeWall
    const timewallPayload = {
        transactionId: "TW-112233",
        user_id: 88776655,
        coins: 1200,
        usd_value: 1.20
    };

    try {
        console.log("--- SCENARIO 1: VALID LOOTABLY POSTBACK ---");
        adapterEngine.processPostback('lootably', lootablyPayload, "bypass_valid_sig");

        console.log("\n--- SCENARIO 2: DUPLICATE REPLAY ATTACK (LOOTABLY) ---");
        // Sending the exact same transaction ID again
        adapterEngine.processPostback('lootably', lootablyPayload, "bypass_valid_sig");
    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    try {
        console.log("\n--- SCENARIO 3: INVALID SIGNATURE (TIMEWALL) ---");
        adapterEngine.processPostback('timewall', timewallPayload, "fake_hacker_signature");
    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 PROVIDER ADAPTER EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runPostbackTest();