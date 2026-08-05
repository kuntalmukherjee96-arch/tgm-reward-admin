# ADR 001: Dynamic Runtime Configuration Center

## Status
APPROVED

## Context
In a growing Financial Operations OS, hardcoding business rules (such as revenue split ratios, coin rates, withdrawal thresholds, and deposit toggles) inside environment variables or code files requires server restarts and deployments. This introduces downtime and operational friction.

## Decision
We will implement a centralized, database-backed **Configuration Center** (`system_configurations`). 
- All dynamic rules will be fetched at runtime with caching.
- Every configuration change must be validated against RBAC and fully recorded in `policy_audit_logs`.
- No system restart or code deployment will be required to update system behaviors.

## Consequences
- **Positive:** Instant runtime adjustments, high operational flexibility, complete audit trail of who changed what and when.
- **Negative/Risk:** Misconfiguration by an admin could impact platform-wide economics. 
- **Mitigation:** Strict Super Admin RBAC boundaries and mandatory audit logging for every config mutation.