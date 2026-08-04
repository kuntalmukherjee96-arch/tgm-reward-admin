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