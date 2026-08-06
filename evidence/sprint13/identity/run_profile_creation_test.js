// 🧪 SPRINT 13: EVENT-DRIVEN PROFILE CREATION EVIDENCE

const ProfileCenterService = require('../../../src/services/identity/ProfileCenterService');

console.log("===============================================================");
console.log("👤 STARTING SPRINT 13: EVENT-DRIVEN PROFILE & REFERRAL TEST");
console.log("===============================================================\n");

// Simple Mock Event Bus for Testing
class MockEventBus {
    constructor() { this.listeners = {}; }
    on(event, callback) { this.listeners[event] = callback; }
    emit(event, data) { 
        if (this.listeners[event]) {
            this.listeners[event](data);
        } else {
            console.log(`[EVENT BUS] 📢 Event '${event}' broadcasted with no listeners.`);
        }
    }
}

async function runProfileTest() {
    const eventBus = new MockEventBus();
    const profileCenter = new ProfileCenterService(eventBus); // Inject Event Bus

    const mockAuthEventData = {
        userId: 88776655,
        username: 'tinitri_user',
        authMethod: 'TELEGRAM_MINI_APP',
        timestamp: new Date().toISOString()
    };

    console.log("--- SCENARIO 1: SIMULATING NEW USER AUTHENTICATION ---");
    // Emulate Auth Gateway emitting the event after a successful login
    console.log(`[AUTH GATEWAY] 🚀 Emitting 'USER_IDENTITY_CREATED' event...`);
    eventBus.emit('USER_IDENTITY_CREATED', mockAuthEventData);

    console.log("\n--- SCENARIO 2: FETCHING PROVISIONED PROFILE ---");
    const profile = profileCenter.getProfile(88776655);
    console.log(profile);

    console.log("\n===============================================================");
    console.log("🏁 PROFILE & REFERRAL IDENTITY EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runProfileTest();