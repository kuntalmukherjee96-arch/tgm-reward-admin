// 🧪 SPRINT 13: FINANCIAL OPERATIONS & WITHDRAWAL EVIDENCE (ADR 018)

const FinanceOperationsEngine = require('../../../src/services/finance/FinanceOperationsEngine');

console.log("===============================================================");
console.log("💸 STARTING SPRINT 13: FINANCIAL OPERATIONS WORKFLOW TEST");
console.log("===============================================================\n");

// Mocking Dependencies for Zero-Trust & Policy Execution
const mockEventBus = { emit: (event, data) => console.log(`   ➡️ [EVENT BUS] Broadcasted: ${event}`) };
const mockConfigCenter = { 
    getWithdrawalRules: () => ({ minWithdrawal: 500, kycThreshold: 5000, feePercent: 2 }) 
};
const mockLedger = { 
    getVerifiedBalance: (uid) => 10000, // User has 10,000 Coins
    decrementBalance: (uid, amount) => console.log(`   🏦 [LEDGER] Decremented ${amount} Coins from User ${uid}`) 
};

async function runFinanceTest() {
    const financeEngine = new FinanceOperationsEngine(mockEventBus, mockConfigCenter, mockLedger);

    try {
        console.log("--- SCENARIO 1: STANDARD WITHDRAWAL (UNDER KYC LIMIT) ---");
        const wd1 = financeEngine.requestWithdrawal('USR-777', 1000);

        console.log("\n--- SCENARIO 2: ADMIN APPROVES STANDARD WITHDRAWAL ---");
        financeEngine.approveWithdrawal('ADMIN-01', wd1.id);

        console.log("\n--- SCENARIO 3: HIGH VALUE WITHDRAWAL (TRIGGERS KYC) ---");
        const wd2 = financeEngine.requestWithdrawal('USR-777', 6000);

        console.log("\n--- SCENARIO 4: ADMIN ATTEMPTS TO APPROVE PENDING KYC ---");
        financeEngine.approveWithdrawal('ADMIN-01', wd2.id); // Should fail

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 FINANCIAL OPERATIONS EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runFinanceTest();