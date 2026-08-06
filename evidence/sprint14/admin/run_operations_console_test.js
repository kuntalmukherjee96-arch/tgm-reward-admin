// 🧪 SPRINT 14: OPERATIONS CONSOLE EVIDENCE (ADR 025)

const OperationsConsoleGateway = require('../../../src/services/admin/OperationsConsoleGateway');

console.log("===============================================================");
console.log("🌍 STARTING SPRINT 14: UNIFIED OPERATIONS CONSOLE TEST");
console.log("===============================================================\n");

// Mocking the core domain subsystems
const mockHealth = { getOverallHealth: async () => 'OK' };
const mockFinance = { getPendingCount: async () => 65 }; // High backlog to trigger warning
const mockTickets = { getOpenTicketCount: async () => 12 };
const mockProviders = { getActiveProviders: async () => ['LOOTABLY(V2)', 'TIMEWALL(V1)'] };

async function runConsoleTest() {
    const consoleGateway = new OperationsConsoleGateway(mockHealth, mockFinance, mockTickets, mockProviders);

    try {
        console.log("--- SCENARIO 1: SUPER_ADMIN ACCESSING CONSOLE ---");
        const dashboard = await consoleGateway.getUnifiedDashboard('SUPER_ADMIN');
        
        console.log("\n[API RESPONSE TO OPS CONSOLE UI]:");
        console.log(JSON.stringify(dashboard, null, 2));

        console.log("\n--- SCENARIO 2: UNAUTHORIZED ACCESS ATTEMPT ---");
        await consoleGateway.getUnifiedDashboard('SUPPORT_ADMIN');

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 OPERATIONS CONSOLE EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runConsoleTest();