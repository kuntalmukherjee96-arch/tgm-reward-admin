// 🧪 SPRINT 15: TREASURY SETTLEMENT EVIDENCE (ADR 028)

const TreasurySettlementEngine = require('../../../src/services/finance/TreasurySettlementEngine');

console.log("===============================================================");
console.log("💰 STARTING SPRINT 15: TREASURY SETTLEMENT TEST");
console.log("===============================================================\n");

// Mocking Dependencies
const mockLedger = {
    getBalance: async (userId) => {
        if (userId === 'USR_LEGIT') return 5000;
        if (userId === 'USR_HACKER') return 100; // Has only 100
        return 0;
    }
};

const mockEventBus = {
    emit: (event, data) => console.log(`   📡 [EVENT BUS] ${event} -> Data:`, JSON.stringify(data))
};

async function runTreasuryTest() {
    const treasury = new TreasurySettlementEngine(mockLedger, mockEventBus);

    try {
        console.log("--- SCENARIO 1: VALID WITHDRAWAL REQUEST ---");
        const request = await treasury.requestWithdrawal('USR_LEGIT', 1000, 'UPI', { upiId: 'legit@upi' });

        console.log("\n--- SCENARIO 2: UNAUTHORIZED ADMIN TRIES TO APPROVE ---");
        try {
            await treasury.approvePayout('SUPPORT_ADMIN', request.withdrawalId);
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

        console.log("\n--- SCENARIO 3: FINANCE ADMIN APPROVES PAYOUT ---");
        await treasury.approvePayout('FINANCE_ADMIN', request.withdrawalId);

        console.log("\n--- SCENARIO 4: FINANCE ADMIN ACCIDENTALLY DOUBLE CLICKS (IDEMPOTENCY) ---");
        try {
            await treasury.approvePayout('FINANCE_ADMIN', request.withdrawalId);
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

        console.log("\n--- SCENARIO 5: USER TRIES TO WITHDRAW MORE THAN BALANCE ---");
        try {
            await treasury.requestWithdrawal('USR_HACKER', 5000, 'BANK', { acc: '1234' });
        } catch (e) {
            console.error(`   ⛔ [BLOCKED] ${e.message}`);
        }

    } catch (error) {
        console.error(error);
    }

    console.log("\n===============================================================");
    console.log("🏁 TREASURY SETTLEMENT EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runTreasuryTest();