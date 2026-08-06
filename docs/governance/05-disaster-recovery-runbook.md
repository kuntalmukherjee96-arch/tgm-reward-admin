# Disaster Recovery Runbook

## Step-by-Step Incident Recovery
1. **Acknowledge Alert:** PagerDuty triggers ON-CALL Platform Engineer.
2. **Isolate (Kill Switch):** Switch API Gateway to Maintenance Mode (Reject all traffic with HTTP 503).
3. **Assess:** Verify Ledger Integrity and Event Bus dead-letter queues.
4. **Restore:** Spin up Secondary DB Replica if Primary is corrupted (Auto-Failover).
5. **Resume:** Disable Maintenance Mode and monitor error rates closely for 15 minutes.