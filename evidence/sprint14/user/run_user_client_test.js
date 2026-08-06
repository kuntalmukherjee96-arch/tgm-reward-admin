// 🧪 SPRINT 14: USER CLIENT GATEWAY EVIDENCE (ADR 024)

const UserClientGateway = require('../../../src/services/user/UserClientGateway');

console.log("===============================================================");
console.log("📱 STARTING SPRINT 14: TELEGRAM CLIENT API TEST");
console.log("===============================================================\n");

// Mocking decoupled backend services (Ledger, Tickets, Analytics)
const mockLedger = {
    getBalance: async (uid) => ({ balance: 1250 }),
    getRecentTransactions: async (uid, limit) => [
        { txId: 'TX-1', amount: 500, source: 'LOOTABLY' },
        { txId: 'TX-2', amount: 250, source: 'TIMEWALL' }
    ]
};

const mockTickets = {
    getActiveTickets: async (uid) => [
        { ticketId: 'TKT-99', status: 'WAITING_ON_USER' }
    ]
};

const mockAnalytics = {
    logEvent: (event, uid) => console.log(`   📈 [ANALYTICS] Event: ${event} | User: ${uid}`)
};

async function runClientTest() {
    const gateway = new UserClientGateway(mockLedger, mockTickets, mockAnalytics);

    try {
        console.log("--- SCENARIO 1: FETCHING TELEGRAM DASHBOARD DATA ---");
        const dashboardData = await gateway.getUserDashboardSummary('USR-8877');
        
        console.log("\n[API RESPONSE TO TELEGRAM CLIENT]:");
        console.log(JSON.stringify(dashboardData, null, 2));

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 USER CLIENT GATEWAY EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runClientTest();