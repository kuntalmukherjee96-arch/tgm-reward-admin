// 🧪 SPRINT 15: PRODUCTION INCIDENT MONITORING EVIDENCE (ADR 029)

const EventEmitter = require('events');
const ProductionIncidentMonitor = require('../../../src/services/admin/ProductionIncidentMonitor');

console.log("===============================================================");
console.log("🚨 STARTING SPRINT 15: INCIDENT MONITOR TEST");
console.log("===============================================================\n");

// Mocking the Core EventBus
const mockEventBus = new EventEmitter();

async function runMonitorTest() {
    const monitor = new ProductionIncidentMonitor(mockEventBus);

    console.log("--- SCENARIO 1: SYSTEM GENERATES EVENTS ---");
    
    // Simulating events triggering from previous phases
    console.log("   [Action] Lootably Adapter detects invalid secret...");
    mockEventBus.emit('SECURITY_ALERT', { reason: 'Invalid Secret Key', txId: 'TX_FAKE_01' });
    
    console.log("   [Action] Lootably Adapter blocks double spend...");
    mockEventBus.emit('AUDIT_LOG', { event: 'DUPLICATE_TX_BLOCKED', txId: 'TX_LEGIT_02' });
    
    console.log("   [Action] Gatekeeper reaches 50 users...");
    mockEventBus.emit('BETA_CAPACITY_REACHED', { currentCount: 50 });
    
    console.log("   [Action] Unauthorized Admin tries to approve payout...");
    mockEventBus.emit('SECURITY_ALERT', { reason: 'Unauthorized Payout Approval', adminRole: 'SUPPORT_ADMIN' });

    console.log("\n--- SCENARIO 2: OPERATIONS CONSOLE FETCHES REPORT ---");
    const report = monitor.generateDailyReport();
    
    console.log("\n[DAILY INCIDENT REPORT (JSON)]:");
    console.log(JSON.stringify(report, null, 2));

    console.log("\n===============================================================");
    console.log("🏁 PRODUCTION INCIDENT MONITORING EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runMonitorTest();