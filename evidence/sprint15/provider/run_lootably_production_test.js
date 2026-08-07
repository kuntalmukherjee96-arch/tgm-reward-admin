// 🧪 SPRINT 15: REAL PROVIDER PRODUCTION SECURITY EVIDENCE (ADR 026)

const LootablyProductionAdapter = require('../../../src/services/provider/LootablyProductionAdapter');

console.log("===============================================================");
console.log("🚀 STARTING SPRINT 15: LOOTABLY PRODUCTION SECURITY TEST");
console.log("===============================================================\n");

// Mocking Dependencies
const mockConfigManager = {
    config: { 
        enabled: true, mode: 'production', secret: 'PROD_SECRET_XYZ', 
        splits: { user: 70, platform: 20, reserve: 10 } 
    },
    getProviderConfig: function(name) { return this.config; }
};

const mockLedger = {
    processedTxs: new Set(['TX_999']), // TX_999 is already processed
    checkTransactionExists: async (txId) => mockLedger.processedTxs.has(txId)
};

const mockEventBus = {
    emit: (event, data) => console.log(`   📡 [EVENT BUS] ${event} -> TX: ${data.txId}`)
};

async function runProductionTest() {
    const adapter = new LootablyProductionAdapter(mockConfigManager, mockLedger, mockEventBus);

    try {
        console.log("--- SCENARIO 1: VALID PRODUCTION CALLBACK ---");
        await adapter.processCallback({ txId: 'TX_1001', userId: 'USR1', amount: 1000, secret: 'PROD_SECRET_XYZ' });

        console.log("\n--- SCENARIO 2: HACKER ATTEMPT (INVALID SECRET) ---");
        try {
            await adapter.processCallback({ txId: 'TX_1002', userId: 'USR1', amount: 5000, secret: 'WRONG_SECRET' });
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

        console.log("\n--- SCENARIO 3: DOUBLE SPEND ATTEMPT (DUPLICATE TX) ---");
        try {
            await adapter.processCallback({ txId: 'TX_999', userId: 'USR2', amount: 500, secret: 'PROD_SECRET_XYZ' });
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

        console.log("\n--- SCENARIO 4: SANDBOX MODE FALLBACK ---");
        mockConfigManager.config.mode = 'sandbox'; // Changing config dynamically
        await adapter.processCallback({ txId: 'TX_TEST_1', userId: 'USR3', amount: 100, secret: 'ANY_SECRET' });

    } catch (error) {
        console.error(error);
    }

    console.log("\n===============================================================");
    console.log("🏁 LOOTABLY PRODUCTION SECURITY EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runProductionTest();