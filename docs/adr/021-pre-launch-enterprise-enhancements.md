# ADR 021: Pre-Launch Enterprise Enhancements (Sprint 13 Conditional Fixes)

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 18 (Config Driven):** Provider Sandbox modes and Feature Rollout percentages (10%, 50%, 100%) will be strictly managed via the Configuration Center, completely removing the need for environment file changes during production.
2. **Ledger Truth (Rule 1):** The Financial Operations pipeline is expanded to enforce a strict Audit Chain for withdrawals: `Approved -> Treasury Processing -> Paid -> Settled`.
3. **Rule 17 (Replaceable Integrations):** Provider API versioning is implemented within the Adapter to ensure historical backward compatibility and instant rollback capabilities.

## Context
Following the Sprint 13 Architecture Review, the Mentor identified 6 critical enterprise safety and observability requirements before the final production freeze. These enhancements prevent scalability bottlenecks and provide the Ops Team with granular control over real-world deployments.

## Decision
We will implement the following 6 architectural additions:
1. **Provider Sandbox Mode:** Dynamic toggle in the Provider Adapter to switch between Sandbox and Production endpoints without code deployment.
2. **Provider Version History:** Version control for Provider APIs (e.g., v1 -> v2) inside the adapter, keeping older versions alive for seamless rollbacks.
3. **Feature Rollout %:** Upgrading the Beta Operations Engine to support percentage-based rollouts (e.g., 20% of users get the feature) instead of simple binary ON/OFF toggles.
4. **Treasury Approval Stages:** Expanding the Finance Operations Engine workflow to track real-money disbursement explicitly (`Approved` != `Settled`).
5. **Provider SLA Dashboard:** Creating a dedicated telemetry projection for Provider success rates, latency, and callback delays.
6. **Beta Analytics Dashboard:** Implementing an observability layer specifically for DAU, retention, offer completion, and crash tracking during the Closed Beta phase.