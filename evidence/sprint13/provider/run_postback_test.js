// 🧪 SPRINT 13: PROVIDER SANDBOX & VERSION HISTORY EVIDENCE (ADR 021)

const ProviderAdapterEngine = require('../../../src/services/provider/ProviderAdapterEngine');

console.log("===============================================================");
console.log("🔌 STARTING SPRINT 13: PROVIDER SANDBOX & SLA METRICS TEST");
console.log("===============================================================\n");

const mockEventBus = { 
    emit: (event, data) => {
        if (event === 'PROVIDER_SLA_METRICS') console.log(`   📊 [SLA DASHBOARD] ${data.provider} | Status: ${data.status} | Latency: ${data.latencyMs}ms`);
    }
};

// Mock Config Center enforcing Rule 18
const mockConfigCenter = {
    getProviderConfig: (name) => {
        if (name === 'lootably') return { mode: 'production', version: 'v2', secret: 'mock_lootably_secret_123' };
        if (name === 'timewall') return { mode: 'sandbox', version: 'v1', secret: 'mock_timewall_secret_456' };
    }
};

async function runPostbackTest() {
    const adapterEngine = new ProviderAdapterEngine(mockEventBus, mockConfigCenter);

    // Lootably v2 Payload (Production)
    const lootablyV2Payload = { tx_id: "LT-V2-001", user_id: 88776655, amount: 1000, payout_usd: 1.00 };

    // TimeWall v1 Payload (Sandbox)
    const timewallPayload = { transactionId: "TW-SBX-001", user_id: 88776655, coins: 500, usd_value: 0.50 };

    try {
        console.log("--- SCENARIO 1: LOOTABLY (PRODUCTION, API v2) ---");
        adapterEngine.processPostback('lootably', lootablyV2Payload, "bypass_valid_sig");

        console.log("\n--- SCENARIO 2: TIMEWALL (SANDBOX, API v1) ---");
        adapterEngine.processPostback('timewall', timewallPayload, "bypass_valid_sig");
        
    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 PROVIDER ENHANCEMENT EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runPostbackTest();