// 🚀 SPRINT 13 PHASE 5: CLOSED BETA & FEATURE FLAGS
// ADR 020: Zero-Trust Invite Gateway & Config-Driven Feature Toggles

class BetaOperationsEngine {
    constructor(eventBus, configCenter) {
        this.eventBus = eventBus;
        this.configCenter = configCenter; // Rule 18: Configurations injected
        
        // Mocking the Config Center for Beta
        this.featureFlags = {
            isLootablyEnabled: true,
            isWithdrawalEnabled: false, // Turned off by default in early beta
            isBetaRegistrationOpen: true
        };
        
        this.validInviteCodes = new Set(['TINITRI-BETA-01', 'MENTOR-VIP-02']);
    }

    // 1. Feature Flag Gateway (Rule 18 Enforced)
    checkFeatureAccess(featureName) {
        const isEnabled = this.featureFlags[featureName];
        if (!isEnabled) {
            console.log(`   ⛔ [FEATURE FLAG] Access blocked for '${featureName}'. Feature is currently disabled.`);
            throw new Error(`503_SERVICE_UNAVAILABLE: ${featureName} is temporarily disabled.`);
        }
        return true;
    }

    // 2. Zero-Trust Beta Onboarding
    processBetaRegistration(telegramId, inviteCode) {
        console.log(`\n[BETA ENGINE] 📥 Registration attempt for ID: ${telegramId} with code: ${inviteCode}`);
        
        this.checkFeatureAccess('isBetaRegistrationOpen');

        if (!this.validInviteCodes.has(inviteCode)) {
            this.eventBus.emit('UNAUTHORIZED_BETA_ATTEMPT', { telegramId, inviteCode });
            throw new Error("403_FORBIDDEN: Invalid or expired Beta Invite Code.");
        }

        // Consume the invite code to prevent reuse (One-time use logic)
        this.validInviteCodes.delete(inviteCode);

        console.log(`   ✅ Beta Invite Validated! Welcome to the Financial OS.`);
        
        // Trigger downstream identity creation
        this.eventBus.emit('BETA_USER_ONBOARDED', { telegramId, status: 'CLOSED_BETA_USER' });
        
        return { status: "SUCCESS", message: "Beta registration complete." };
    }
}

module.exports = BetaOperationsEngine;