// 🔒 SPRINT 15 PATCH: CLOSED BETA ACCESS CONTROL
// Upgraded with Expiry, Max Uses, and Revocation Support

class ClosedBetaGatekeeper {
    constructor(configManager, userDirectory, eventBus) {
        this.configManager = configManager;
        this.userDirectory = userDirectory;
        this.eventBus = eventBus;
    }

    async validateRegistrationAttempt(inviteCodeString, userId) {
        const betaConfig = this.configManager.getSystemConfig('closed_beta');

        if (!betaConfig || !betaConfig.enabled) {
            throw new Error("403_FORBIDDEN: Registration closed.");
        }

        const currentUserCount = await this.userDirectory.getTotalUsers();
        if (currentUserCount >= betaConfig.maxUsers) {
            this.eventBus.emit('BETA_CAPACITY_REACHED', { currentCount: currentUserCount });
            throw new Error("503_CAPACITY_REACHED: Closed Beta limit reached.");
        }

        // Advanced Invite Code Validation
        const inviteCode = betaConfig.validCodes.find(c => c.code === inviteCodeString);
        
        if (!inviteCode) {
            throw new Error("401_UNAUTHORIZED: Invalid invite code.");
        }
        if (inviteCode.revoked) {
            throw new Error("401_UNAUTHORIZED: Invite code has been revoked.");
        }
        if (new Date() > new Date(inviteCode.expiry)) {
            throw new Error("401_UNAUTHORIZED: Invite code expired.");
        }
        if (inviteCode.usedBy.length >= inviteCode.maxUses) {
            throw new Error("401_UNAUTHORIZED: Invite code usage limit exceeded.");
        }

        // Register usage
        inviteCode.usedBy.push(userId);
        
        this.eventBus.emit('BETA_USER_ADMITTED', { inviteCode: inviteCodeString, creator: inviteCode.creator });
        return true;
    }
}

module.exports = ClosedBetaGatekeeper;