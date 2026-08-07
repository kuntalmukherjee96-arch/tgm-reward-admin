// 🚨 SPRINT 15 PHASE 5: PRODUCTION INCIDENT MONITORING
// ADR 029: Production Incident Monitoring & Alert Aggregation

class ProductionIncidentMonitor {
    constructor(eventBus) {
        this.incidents = [];
        
        // Rule 19: Listening to core system events for Observable Audit
        eventBus.on('SECURITY_ALERT', (data) => this._logIncident('CRITICAL', data));
        eventBus.on('BETA_CAPACITY_REACHED', (data) => this._logIncident('WARNING', data));
        eventBus.on('AUDIT_LOG', (data) => this._logIncident('INFO', data));
    }

    _logIncident(severity, data) {
        const incident = {
            timestamp: new Date().toISOString(),
            severity,
            details: data
        };
        this.incidents.push(incident);
        console.log(`   🚨 [INCIDENT LOGGED] Severity: [${severity}] | Details: ${JSON.stringify(data)}`);
    }

    generateDailyReport() {
        console.log("\n[MONITOR] 📊 Generating Production Incident Report...");
        const report = {
            report_time: new Date().toISOString(),
            total_incidents: this.incidents.length,
            critical_alerts: this.incidents.filter(i => i.severity === 'CRITICAL').length,
            warnings: this.incidents.filter(i => i.severity === 'WARNING').length,
            latest_events: this.incidents.slice(-5) // Return only the last 5 events for the console
        };
        return report;
    }
}

module.exports = ProductionIncidentMonitor;