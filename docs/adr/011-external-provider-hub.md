# ADR 011: External Provider Hub Architecture

## Status
PROPOSED -> IN-REVIEW

## 5-Step Pre-Coding Review Compliance & Constitution Alignment
1. **Ledger Truth:** Provider responses do not mutate the ledger directly. A dedicated Workflow Event processes the response and requests a ledger state change.
2. **Platform Without UI (Rule 15):** Provider configurations, health checks, and failovers are managed via backend cron jobs and API gateways.
3. **Immutable History (Rule 14):** Every provider timeout, error, or configuration change is logged permanently in the Event Bus.
4. **Zero Trust (Rule 12):** Incoming webhooks from providers are verified using HMAC signatures before processing.

## Context
As an Enterprise Financial OS, we rely on multiple external entities (SMS, KYC, Payouts, Offerwalls). Hardcoding these integrations creates technical debt and single points of failure. If Provider A goes down, the system must dynamically switch to Provider B without a code deployment.

## Decision
We will implement an **External Provider Hub** featuring:
1. **Dynamic Configuration:** API keys and webhooks stored in the database (encrypted), not hardcoded in `.env`.
2. **Health Monitoring Engine:** Active polling (pinging provider /health endpoints) and Passive monitoring (tracking API timeout rates).
3. **Automated Failover System:** If primary provider health drops below 80%, traffic is auto-routed to the secondary provider.
4. **Unified Adapter Pattern:** All providers adhere to a standard internal Interface (e.g., `IPayoutProvider`), decoupling our core business logic from third-party SDKs.