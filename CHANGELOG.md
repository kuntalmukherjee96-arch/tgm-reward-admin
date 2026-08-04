## [v1.0.0-sprint9.5-phaseC] - Notification Engine Frozen
### Added
- Enterprise Event-Driven Notification Infrastructure.
- Dispatcher with Adapter Pattern (`InAppAdapter`, `EmailAdapter`).
- Policy Engine for event filtering, user preferences (Mute/Unmute), and CRITICAL system overrides.
- Retry Queue for handling third-party provider failures.
- `notification_delivery_logs` table for strict delivery auditing and analytics.
# CHANGELOG

## [v1.0.0-sprint9.5-phaseB] - Withdrawal Governance Frozen
### Added
- Immutable `wallet_ledger` as the sole Source of Truth (Zero Updates/Deletes).
- `withdrawal_requests` schema with strict State Machine constraints.
- Automated Evidence Tests for Ledger Integrity and Concurrency.
- Policy Audit Logs (`policy_audit_logs`) enforced for all RBAC actions.
- Graceful Failure Handling & Network Resilience validation.

### Security
- Concurrency Control applied to prevent Double Settlement.
- Strict API Validation against malicious payloads and unauthorized access.