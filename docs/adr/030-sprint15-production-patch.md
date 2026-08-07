# ADR 030: Sprint 15 Production Patch (Rule 22 & Security Upgrades)

## Status
PROPOSED -> APPROVED (Mentor Mandated)

## Context
Before officially freezing Sprint 15, the Platform Architect mandated specific upgrades to ensure enterprise-grade production stability.

## Decisions
1. **Secret Management:** Production secrets will no longer reside in code or `.env.example`. They must be dynamically injected via a Secret Manager (e.g., Vault/Vercel Env).
2. **Invite Code Metadata:** `ClosedBetaGatekeeper` will now enforce advanced invite properties: `expiryTime`, `maxUses`, `creator`, `usedBy` list, and `revocationSupport`.
3. **Rule 22 Enforced (Withdrawal Evidence):** `TreasurySettlementEngine` will append immutable Settlement Evidence (Settlement Ref, Provider Ref, Timestamp, Operator, Amount, Currency, Ledger Entry) to every successful payout.
4. **Incident SLA:** `ProductionIncidentMonitor` categorizes incidents (INFO, WARNING, HIGH, CRITICAL) with specific handling SLAs.