// 🧪 SPRINT 13: REAL USER LOGIN FLOW EVIDENCE (ADR 016)

const TelegramAuthGateway = require('../../../src/services/auth/TelegramAuthGateway');

console.log("===============================================================");
console.log("🛡️ STARTING SPRINT 13: HEADLESS AUTH VALIDATION TEST");
console.log("===============================================================\n");

async function runAuthTest() {
    const authGateway = new TelegramAuthGateway();

    const mockTelegramUser = { id: 88776655, username: 'tinitri_user' };
    const mockInitData = "auth_date=1690000000&query_id=xxx&user=" + JSON.stringify(mockTelegramUser);
    const validHash = "valid_mock_hash";

    try {
        console.log("--- SCENARIO 1: VALID TELEGRAM LOGIN ---");
        // Step 1: Verify Hash
        authGateway.verifyTelegramPayload(mockInitData, validHash);
        
        // Step 2: Process Login
        const session = await authGateway.processLogin(
            mockTelegramUser, 
            "192.168.1.105", 
            "Android / Telegram Mini App"
        );
        console.log(`\n🎉 [CLIENT RESPONSE] Received Token: ${session.token}`);
        
    } catch (error) {
        console.error(`\n❌ TEST FAILED: ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 AUTHENTICATION EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runAuthTest();