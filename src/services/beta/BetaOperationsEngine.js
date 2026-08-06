// 🚀 SPRINT 13 CONDITIONAL UPDATE: CLOSED BETA
// ADR 021: Percentage-based Feature Rollouts & Beta Analytics Telemetry

class BetaOperationsEngine {
    constructor(eventBus, configCenter) {
        this.eventBus = eventBus;
        
        // Rule 18: Mocking Config Center for Feature Rollout Percentages
        this.configCenter = configCenter || {
            getFeatureFlags: () => ({
                isLootablyEnabled: { enabled: true, rolloutPercent: 100 },
                newWithdrawalUI: { enabled: true, rolloutPercent: 20 }, // Only 20% users get this
                isBetaRegistrationOpen: { enabled: true, rolloutPercent: 100 }
            })
        };
        
        this.validInviteCodes = new Set(['TINITRI-BETA-01', 'MENTOR-VIP-02']);
    }

    // Stage 1: Feature Rollout % Logic (Item 3)
    checkFeatureAccess(featureName, userId) {
        const feature = this.configCenter.getFeatureFlags()[featureName];
        
        if (!feature || !feature.enabled) {
            throw new Error(`503_SERVICE_UNAVAILABLE: ${featureName} is completely disabled.`);
        }

        // Simple predictable hash for A/B testing distribution (0 to 99)
        const userHash = (userId * 7) % 100; 
        
        if (userHash >= feature.rolloutPercent) {
            throw new Error(`403_FORBIDDEN: ${featureName} is not rolled out to this user. (Current Rollout: ${feature.rolloutPercent}%)`);
        }

        return true;
    }

    // Stage 2: Beta Registration with Analytics (Item 6)
    processBetaRegistration(userId, inviteCode) {
        console.log(`\n[BETA ENGINE] 📥 Registration attempt for User: ${userId}`);
        
        this.checkFeatureAccess('isBetaRegistrationOpen', userId);

        if (!this.validInviteCodes.has(inviteCode)) {
            this.logAnalytics('ONBOARDING_FAILED', userId, { reason: 'Invalid Code' });
            throw new Error("403_FORBIDDEN: Invalid Beta Invite Code.");
        }

        // Consume code
        this.validInviteCodes.delete(inviteCode);
        
        // Trigger core onboarding
        this.eventBus.emit('BETA_USER_ONBOARDED', { userId, status: 'CLOSED_BETA_USER' });
        
        // Push to Dedicated Beta Analytics Dashboard
        this.logAnalytics('USER_JOINED', userId, { inviteCode });
        
        console.log(`   ✅ Beta Invite Validated! Welcome to the Financial OS.`);
        return { status: "SUCCESS" };
    }

    // Stage 3: Dedicated Analytics Telemetry
    logAnalytics(metricName, userId, extraData = {}) {
        this.eventBus.emit('BETA_ANALYTICS_EVENT', {
            metric: metricName,
            userId: userId,
            timestamp: new Date().toISOString(),
            ...extraData
        });
    }
}

module.exports = BetaOperationsEngine;