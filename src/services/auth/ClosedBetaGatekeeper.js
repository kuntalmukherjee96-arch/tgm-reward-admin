// 🔒 SPRINT 15 PHASE 2: CLOSED BETA ACCESS CONTROL
// ADR 027: Closed Beta Access Control & Invite Limits

class ClosedBetaGatekeeper {
    constructor(configManager, userDirectory, eventBus) {
        this.configManager = configManager; // Rule 18: Config Driven
        this.userDirectory = userDirectory; // To check real-time user count
        this.eventBus = eventBus;           // Rule 19: Immutable Audit
    }

    async validateRegistrationAttempt(inviteCode) {
        console.log(`\n[GATEKEEPER] 🔒 Validating Registration Attempt with code: [${inviteCode}]`);

        // Fetching real-time beta configuration
        const betaConfig = this.configManager.getSystemConfig('closed_beta');

        if (!betaConfig || !betaConfig.enabled) {
            throw new Error("403_FORBIDDEN: Registration is currently closed to the public.");
        }

        // 1. Capacity Check (Hard Cap Enforcer)
        const currentUserCount = await this.userDirectory.getTotalUsers();
        if (currentUserCount >= betaConfig.maxUsers) {
            this.eventBus.emit('BETA_CAPACITY_REACHED', { currentCount: currentUserCount });
            throw new Error(`503_CAPACITY_REACHED: Closed Beta limit of ${betaConfig.maxUsers} users has been reached.`);
        }

        // 2. Cryptographic/Invite Code Validation
        if (!betaConfig.validCodes.includes(inviteCode)) {
            this.eventBus.emit('SECURITY_ALERT', { reason: 'Invalid Invite Code', code: inviteCode });
            throw new Error("401_UNAUTHORIZED: Invalid or expired invite code.");
        }

        console.log(`   ✅ Gatekeeper Passed! User allowed to register. (Capacity: ${currentUserCount + 1}/${betaConfig.maxUsers})`);
        
        // Emitting successful entry for the Operations Console
        this.eventBus.emit('BETA_USER_ADMITTED', { inviteCode });
        
        return true;
    }
}

module.exports = ClosedBetaGatekeeper;