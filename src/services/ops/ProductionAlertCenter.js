// 🚨 SPRINT 13 PHASE 4: PRODUCTION OPERATIONS & ALERT CENTER
// ADR 019: Automated Monitoring, Chaos Testing & Rule 16 (Incident Knowledge)

class ProductionAlertCenter {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.incidentKnowledgeBase = []; // Rule 16: Documenting issues
        this.systemHealth = { ledger: 'OK', eventBus: 'OK', apiGateway: 'OK' };
    }

    // 1. Centralized Health Check
    getSystemHealth() {
        console.log(`\n🩺 [HEALTH CHECK] Running platform diagnostics...`);
        let status = 'HEALTHY';
        for (const [service, state] of Object.entries(this.systemHealth)) {
            if (state !== 'OK') {
                status = 'DEGRADED';
                console.log(`   ⚠️ [WARNING] Service '${service}' is reporting status: ${state}`);
            }
        }
        return { status, timestamp: new Date().toISOString() };
    }

    // 2. Global Exception Catcher
    logIncident(error, context) {
        console.log(`\n🚨 [SEV-1 ALERT] SYSTEM INCIDENT DETECTED!`);
        console.log(`   ↳ Context: ${context}`);
        console.log(`   ↳ Error: ${error.message}`);

        const incidentId = `INC-${Date.now()}`;
        const incidentReport = {
            id: incidentId,
            errorDetails: error.message,
            rootCause: "PENDING_ANALYSIS", // Must be updated per Rule 16
            prevention: "PENDING_DOCUMENTATION",
            status: 'OPEN'
        };

        this.incidentKnowledgeBase.push(incidentReport);
        this.eventBus.emit('INCIDENT_LOGGED', { incidentId, status: 'OPEN' });
        
        return incidentId;
    }

    // 3. Rule 16 Enforcer: Convert Incident to Knowledge
    updateIncidentKnowledge(incidentId, rootCause, prevention) {
        const incident = this.incidentKnowledgeBase.find(i => i.id === incidentId);
        if (!incident) throw new Error("Incident not found.");
        
        incident.rootCause = rootCause;
        incident.prevention = prevention;
        incident.status = 'RESOLVED';
        
        console.log(`\n📝 [KNOWLEDGE BASE] Incident ${incidentId} resolved (Rule 16 Compliant).`);
        console.log(`   ↳ Root Cause: ${rootCause}`);
        console.log(`   ↳ Prevention: ${prevention}`);
    }

    // 4. Chaos Test Hook (For Production Readiness Validation)
    triggerChaosInjection(serviceName) {
        console.warn(`\n🌪️ [CHAOS MONKEY] Intentionally injecting failure into ${serviceName}...`);
        this.systemHealth[serviceName] = 'DOWN';
        return this.logIncident(new Error(`${serviceName} database connection dropped unexpectedly.`), `Chaos Testing`);
    }
}

module.exports = ProductionAlertCenter;