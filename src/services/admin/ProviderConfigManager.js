// ⚙️ SPRINT 14 PHASE 4: PROVIDER MANAGEMENT CENTER
// ADR 023: Dynamic Provider Management & Runtime Configuration

class ProviderConfigManager {
    constructor() {
        this.providers = new Map();
        
        // Default System State (Before any UI overrides)
        this.providers.set('lootably', {
            enabled: false, 
            mode: 'sandbox', 
            version: 'v1',
            splits: { user: 70, platform: 20, reserve: 10 },
            secret: 'default_secret'
        });
    }

    // 1. Dynamic Config Updater (Rule 18 & Rule 23)
    updateProviderConfig(adminRole, providerName, updates) {
        console.log(`\n[CONFIG CENTER] ⚙️ Update request received for '${providerName}'`);

        // Rule 5: Strict RBAC check (Only Super Admin can change provider configs)
        if (adminRole !== 'SUPER_ADMIN') {
            throw new Error("403_FORBIDDEN: Only SUPER_ADMIN can modify provider configurations.");
        }

        if (!this.providers.has(providerName)) {
            throw new Error(`404_NOT_FOUND: Provider '${providerName}' does not exist.`);
        }

        const currentConfig = this.providers.get(providerName);

        // Validate Revenue Splits (Must equal 100%)
        if (updates.splits) {
            const total = updates.splits.user + updates.splits.platform + updates.splits.reserve;
            if (total !== 100) {
                throw new Error(`400_BAD_REQUEST: Revenue splits must equal exactly 100%. Current total: ${total}%`);
            }
        }

        // Apply Updates
        const newConfig = { ...currentConfig, ...updates, lastUpdated: new Date().toISOString() };
        this.providers.set(providerName, newConfig);

        console.log(`   ✅ Provider updated successfully! Mode: [${newConfig.mode.toUpperCase()}] | Enabled: [${newConfig.enabled}]`);
        if (updates.splits) {
            console.log(`   📊 New Revenue Split -> User: ${newConfig.splits.user}% | Platform: ${newConfig.splits.platform}% | Reserve: ${newConfig.splits.reserve}%`);
        }

        return newConfig;
    }

    // 2. Headless Config Fetcher (For the Adapter Engine to consume)
    getProviderConfig(providerName) {
        return this.providers.get(providerName);
    }
}

module.exports = ProviderConfigManager;