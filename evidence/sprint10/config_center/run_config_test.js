// 🚀 SUPER CODER MODE: CONFIGURATION CENTER TEST
// Sprint 10: Dynamic Runtime Configuration & Policy Audit

console.log("==========================================");
console.log("⚙️ STARTING CONFIGURATION CENTER TEST...");
console.log("==========================================\n");

class ConfigurationCenter {
    constructor() {
        // Simulating Supabase system_configurations table in memory
        this.store = new Map([
            ['REVENUE_SPLIT_RATIO', { value: { platform: 0.70, user: 0.30 }, category: 'ECONOMY' }],
            ['GLOBAL_DEPOSIT_ENABLED', { value: false, category: 'FEATURE_TOGGLES' }],
            ['MAX_WITHDRAWAL_LIMIT', { value: 50000, category: 'LIMITS' }]
        ]);
        this.auditLogs = [];
    }

    get(key) {
        const config = this.store.get(key);
        console.log(`📖 FETCH CONFIG [${key}]:`, JSON.stringify(config ? config.value : null));
        return config ? config.value : null;
    }

    update(key, newValue, adminId) {
        console.log(`\n✍️ SUPER ADMIN [${adminId}] attempting to update [${key}]...`);
        if (!this.store.has(key)) {
            console.log(`❌ ERROR: Config key ${key} does not exist.`);
            return;
        }

        const oldConfig = this.store.get(key);
        this.store.set(key, { ...oldConfig, value: newValue });
        
        // Mandatory Audit Logging for Config Mutation
        const auditLog = {
            timestamp: new Date().toISOString(),
            adminId,
            action: 'UPDATE_CONFIG',
            key,
            oldValue: oldConfig.value,
            newValue
        };
        this.auditLogs.push(auditLog);
        console.log(`✅ SUCCESS: Config [${key}] updated at runtime without server restart!`);
        console.log(`📝 POLICY AUDIT RECORDED:`, JSON.stringify(auditLog));
    }
}

async function runTest() {
    const configCenter = new ConfigurationCenter();

    // 1. Fetch initial runtime value
    console.log("Test 1: Fetching initial configs at runtime...");
    configCenter.get('GLOBAL_DEPOSIT_ENABLED');

    // 2. Simulate Super Admin dynamically updating config without restart
    console.log("\nTest 2: Dynamic Runtime Mutation...");
    configCenter.update('GLOBAL_DEPOSIT_ENABLED', true, 'super_admin_007');

    // 3. Verify updated value is immediately active
    console.log("\nTest 3: Verifying updated value...");
    configCenter.get('GLOBAL_DEPOSIT_ENABLED');

    console.log("\n==========================================");
    console.log("🏁 CONFIGURATION CENTER TEST COMPLETED.");
    console.log("==========================================");
}

runTest();