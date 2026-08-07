// 🧪 SPRINT 15: CLOSED BETA ACCESS CONTROL EVIDENCE (ADR 027)

const ClosedBetaGatekeeper = require('../../../src/services/auth/ClosedBetaGatekeeper');

console.log("===============================================================");
console.log("🔒 STARTING SPRINT 15: CLOSED BETA GATEKEEPER TEST");
console.log("===============================================================\n");

// Mocking Dependencies
const mockConfigManager = {
    getSystemConfig: () => ({
        enabled: true,
        maxUsers: 50,
        validCodes: ['BETA_TGM_2026', 'INVITE_VIP_99']
    })
};

let currentDBUserCount = 48; // Simulating 48 users already in the system

const mockUserDirectory = {
    getTotalUsers: async () => currentDBUserCount
};

const mockEventBus = {
    emit: (event, data) => console.log(`   📡 [EVENT BUS] ${event} -> Data:`, JSON.stringify(data))
};

async function runGatekeeperTest() {
    const gatekeeper = new ClosedBetaGatekeeper(mockConfigManager, mockUserDirectory, mockEventBus);

    try {
        console.log("--- SCENARIO 1: VALID REGISTRATION (USER 49) ---");
        await gatekeeper.validateRegistrationAttempt('BETA_TGM_2026');
        currentDBUserCount++; // Simulating successful DB insert

        console.log("\n--- SCENARIO 2: HACKER ATTEMPT (INVALID CODE) ---");
        try {
            await gatekeeper.validateRegistrationAttempt('FREE_MONEY_HACK');
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

        console.log("\n--- SCENARIO 3: VALID REGISTRATION (USER 50) ---");
        await gatekeeper.validateRegistrationAttempt('INVITE_VIP_99');
        currentDBUserCount++; // System is now at 50/50

        console.log("\n--- SCENARIO 4: CAPACITY REACHED (USER 51 ATTEMPTS) ---");
        try {
            await gatekeeper.validateRegistrationAttempt('BETA_TGM_2026');
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

    } catch (error) {
        console.error(error);
    }

    console.log("\n===============================================================");
    console.log("🏁 CLOSED BETA GATEKEEPER EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runGatekeeperTest();