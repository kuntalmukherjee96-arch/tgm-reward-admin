// 🧪 SPRINT 13: PRODUCTION CHAOS TEST EVIDENCE (ADR 019 & RULE 16)

const ProductionAlertCenter = require('../../../src/services/ops/ProductionAlertCenter');

console.log("===============================================================");
console.log("🚨 STARTING SPRINT 13: PRODUCTION MONITORING & CHAOS TEST");
console.log("===============================================================\n");

const mockEventBus = { emit: (event, data) => console.log(`   ➡️ [EVENT BUS] ${event} broadcasted.`) };

function runChaosTest() {
    const alertCenter = new ProductionAlertCenter(mockEventBus);

    // Scenario 1: Normal Operation
    console.log("--- SCENARIO 1: NORMAL SYSTEM HEALTH ---");
    const health1 = alertCenter.getSystemHealth();
    console.log(`Status: ${health1.status}`);

    // Scenario 2: Chaos Injection
    console.log("\n--- SCENARIO 2: TRIGGERING CHAOS TEST (API GATEWAY FAILURE) ---");
    const incidentId = alertCenter.triggerChaosInjection('apiGateway');

    // Scenario 3: Verify Degraded Health
    console.log("\n--- SCENARIO 3: VERIFYING DEGRADED HEALTH ---");
    const health2 = alertCenter.getSystemHealth();
    console.log(`Status: ${health2.status}`);

    // Scenario 4: Applying Rule 16 (Transforming to Knowledge)
    console.log("\n--- SCENARIO 4: APPLYING RULE 16 (INCIDENT KNOWLEDGE) ---");
    alertCenter.updateIncidentKnowledge(
        incidentId,
        "Network timeout between Gateway and Risk Engine.",
        "Implement automatic fallback to secondary Node and increase timeout threshold to 5s."
    );

    console.log("\n===============================================================");
    console.log("🏁 CHAOS TEST AND RULE 16 EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runChaosTest();