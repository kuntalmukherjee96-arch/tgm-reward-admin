// 👤 SPRINT 13 PHASE 1: IDENTITY & PROFILE CENTER
// Event-Driven Profile & Referral Identity Creation (Constitution Compliant)

class ProfileCenterService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.profilesDb = {}; // Mock DB for Projections
        
        // 1. Rule 1: Event-Driven Architecture (Listening to Auth Gateway)
        this.eventBus.on('USER_IDENTITY_CREATED', this.handleNewUser.bind(this));
    }

    handleNewUser(eventData) {
        console.log(`\n[PROFILE CENTER] 📥 Received 'USER_IDENTITY_CREATED' event for ID: ${eventData.userId}`);
        
        // 2. Idempotency Check (Ensure we don't create duplicate profiles)
        if (this.profilesDb[eventData.userId]) {
            console.log(`   ⚠️ Profile already exists for ${eventData.userId}. Skipping creation.`);
            return;
        }

        // 3. Generate Unique Referral Identity (e.g., REF-6655-AB9X)
        const referralCode = `REF-${eventData.userId.toString().slice(-4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        // 4. Create Profile Projection
        const newProfile = {
            userId: eventData.userId,
            username: eventData.username,
            status: 'ACTIVE',
            authMethod: eventData.authMethod,
            referralCode: referralCode,
            createdAt: eventData.timestamp,
            metrics: { totalReferrals: 0, lifetimeEarnings: 0 }
        };

        this.profilesDb[eventData.userId] = newProfile;
        
        console.log(`   ✅ Profile successfully provisioned!`);
        console.log(`   🔗 Assigned Referral Identity: ${referralCode}`);
        
        // 5. Trigger downstream events (e.g., Initialize Wallet, Send Welcome Notification)
        this.eventBus.emit('PROFILE_PROVISIONED', { userId: eventData.userId, referralCode });
    }

    getProfile(userId) {
        return this.profilesDb[userId] || null;
    }
}

module.exports = ProfileCenterService;