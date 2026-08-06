# ADR 019: Production Operations & Incident Monitoring

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 16 (Incident Knowledge):** Every crash, failure, or unhandled exception must be captured, logged, and transformed into an immutable incident report for root-cause analysis.
2. **Platform Without UI (Rule 15):** Monitoring relies on headless event aggregation. Dashboard UIs will simply consume the `/v1/health` and `/v1/incidents` APIs.
3. **Headless Platform:** The alert center acts as an independent observer, decoupled from the core Ledger or Auth gateways.

## Context
Phase 13.4 transitions the platform from 'functional' to 'observable'. As real users and providers interact with the system, we need real-time visibility into system health, API queue bottlenecks, and provider error rates.

## Decision
We will implement an **Enterprise Monitoring & Alert Center** featuring:
1. **Global Exception Catcher:** A centralized logger that catches unhandled errors and converts them into `SYSTEM_INCIDENT` events.
2. **Health Check Probes:** Endpoints that ping the Ledger, Event Bus, and Provider Adapters to return a unified `STATUS: OK/DEGRADED/DOWN`.
3. **Automated Incident Logging:** Saving incident root causes and potential prevention steps into a dedicated knowledge base (Rule 16).