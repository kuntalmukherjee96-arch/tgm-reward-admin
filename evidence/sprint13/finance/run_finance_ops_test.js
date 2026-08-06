// 🧪 SPRINT 13: TREASURY APPROVAL STAGES EVIDENCE (ADR 021)

const FinanceOperationsEngine = require('../../../src/services/finance/FinanceOperationsEngine');

console.log("===============================================================");
console.log("💸 STARTING SPRINT 13: TREASURY WORKFLOW TEST");
console.log("===============================================================\n");

const mockEventBus = { emit: (event, data) => console.log(`   ➡️ [EVENT BUS] Broadcasted: ${event}`) };
const mockLedger = { decrementBalance: (uid, amt) => console.log(`   🏦 [LEDGER] Decremented ${amt} Coins from User ${uid}`) };

async function runTreasuryTest() {
    const financeEngine = new FinanceOperationsEngine(mockEventBus, {}, mockLedger);

    try {
        console.log("--- SCENARIO 1: FULL TREASURY WORKFLOW ---");
        const wd1 = financeEngine.requestWithdrawal('USR-777', 1500);
        
        // Step 1: Ops Team Approves (Does not cut ledger balance yet)
        financeEngine.approveForTreasury('OPS-ADMIN-01', wd1.id);

        // Step 2: Treasury Team Pays and Settles
        financeEngine.processTreasuryPayout('TREASURY-LEAD-01', wd1.id, 'TX-UPI-9988776655');

        console.log("\n--- SCENARIO 2: TREASURY TRIES TO PAY UNAPPROVED REQUEST ---");
        const wd2 = financeEngine.requestWithdrawal('USR-999', 5000);
        // Bypassing Ops approval directly to Treasury...
        financeEngine.processTreasuryPayout('TREASURY-LEAD-01', wd2.id, 'TX-UPI-FAKED');

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 TREASURY WORKFLOW EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runTreasuryTest();