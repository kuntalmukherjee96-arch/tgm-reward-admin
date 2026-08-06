// 🧪 SPRINT 14: PROVIDER CONFIG & RUNTIME UPDATE EVIDENCE (ADR 023)

const ProviderConfigManager = require('../../../src/services/admin/ProviderConfigManager');

console.log("===============================================================");
console.log("⚙️ STARTING SPRINT 14: DYNAMIC PROVIDER CONFIG TEST");
console.log("===============================================================\n");

async function runConfigTest() {
    const configManager = new ProviderConfigManager();

    try {
        console.log("--- SCENARIO 1: SUPER_ADMIN ENABLES LOOTABLY IN PRODUCTION ---");
        configManager.updateProviderConfig('SUPER_ADMIN', 'lootably', {
            enabled: true,
            mode: 'production',
            version: 'v2'
        });

        console.log("\n--- SCENARIO 2: SUPER_ADMIN UPDATES REVENUE SPLIT (VALID) ---");
        // 80% User, 10% Platform, 10% Reserve = 100%
        configManager.updateProviderConfig('SUPER_ADMIN', 'lootably', {
            splits: { user: 80, platform: 10, reserve: 10 }
        });

        console.log("\n--- SCENARIO 3: SUPER_ADMIN ENTERS INVALID SPLIT ---");
        // 90% User, 20% Platform, 0% Reserve = 110% (Should fail)
        configManager.updateProviderConfig('SUPER_ADMIN', 'lootably', {
            splits: { user: 90, platform: 20, reserve: 0 }
        });

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    try {
        console.log("\n--- SCENARIO 4: UNAUTHORIZED ADMIN TRIES TO CHANGE CONFIG ---");
        configManager.updateProviderConfig('FINANCE_ADMIN', 'lootably', { mode: 'sandbox' });
    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 PROVIDER CONFIG EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runConfigTest();