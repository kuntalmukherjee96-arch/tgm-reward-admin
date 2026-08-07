// 🚀 SPRINT 15 PHASE 1: REAL PROVIDER ACTIVATION
// ADR 026: Real Provider Activation & Production Callback Security (Lootably)

class LootablyProductionAdapter {
    constructor(configManager, ledger, eventBus) {
        this.configManager = configManager; // Dynamic Config
        this.ledger = ledger; // For Idempotency Check
        this.eventBus = eventBus; // For Immutable Audit
    }

    async processCallback(payload) {
        console.log(`\n[LOOTABLY ADAPTER] 📥 Incoming Postback: TX_${payload.txId}`);
        
        const config = this.configManager.getProviderConfig('lootably');

        if (!config || !config.enabled) {
            throw new Error("503_SERVICE_UNAVAILABLE: Lootably is currently disabled in Configuration Center.");
        }

        // Rule 22: Production First (Strict Security)
        if (config.mode === 'production') {
            console.log("   🛡️ Mode: PRODUCTION. Enforcing strict security protocols...");
            
            // 1. Signature / Secret Validation
            if (payload.secret !== config.secret) {
                this.eventBus.emit('SECURITY_ALERT', { provider: 'lootably', reason: 'Invalid Secret Key', txId: payload.txId });
                throw new Error("401_UNAUTHORIZED: Invalid provider secret. Callback rejected.");
            }

            // 2. Idempotency Check (Ledger Truth)
            const isDuplicate = await this.ledger.checkTransactionExists(payload.txId);
            if (isDuplicate) {
                this.eventBus.emit('AUDIT_LOG', { event: 'DUPLICATE_TX_BLOCKED', txId: payload.txId });
                throw new Error("409_CONFLICT: Transaction ID already processed. Double-spend prevented.");
            }
        } else {
            console.log("   ⚠️ Mode: SANDBOX. Bypassing strict security for testing...");
        }

        // Calculate Revenue Splits
        const totalAmount = payload.amount;
        const userReward = (totalAmount * config.splits.user) / 100;
        const platformRevenue = (totalAmount * config.splits.platform) / 100;
        const reserveAmount = (totalAmount * config.splits.reserve) / 100;

        console.log(`   ✅ Callback Validated! Distributing Revenue: User(${userReward}), Platform(${platformRevenue}), Reserve(${reserveAmount})`);
        
        // Finalize transaction
        this.eventBus.emit('REVENUE_DISTRIBUTED', { 
            provider: 'lootably', 
            txId: payload.txId, 
            userId: payload.userId,
            amounts: { user: userReward, platform: platformRevenue, reserve: reserveAmount }
        });

        return { status: "SUCCESS", txId: payload.txId };
    }
}

module.exports = LootablyProductionAdapter;