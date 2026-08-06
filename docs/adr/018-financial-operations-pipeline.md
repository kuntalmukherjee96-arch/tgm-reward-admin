# ADR 018: Financial Operations & Real Withdrawal Pipeline

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Ledger = Single Source of Truth:** Withdrawals only decrement the Ledger after explicit approval. Pending requests do not alter the Ledger directly.
2. **Policy Driven Configuration (Rule 18):** Minimum withdrawal amounts, processing fees, and KYC thresholds are strictly fetched from the Runtime Configuration Center. No hardcoded limits.
3. **Headless Execution & Workflow:** Withdrawals are routed to a 'Finance Queue'. Approvals require human-in-the-loop (RBAC) via the Finance Admin panel.

## Context
Phase 13.3 shifts focus to actual payout processing. We need a secure, auditable pipeline that handles user withdrawal requests, verifies them against KYC/Risk models, and queues them for the Finance operations team to process settlements.

## Decision
We will implement an **Enterprise Financial Operations Engine** featuring:
1. **Finance Workflow Queue:** All withdrawal requests enter a `PENDING_REVIEW` state. High-value transactions automatically trigger a `KYC_REQUIRED` flag.
2. **Treasury Reserve Tracking:** A real-time aggregation of total liabilities (user balances) versus actual platform liquid reserves.
3. **Audit & Settlement:** Every approved withdrawal writes an immutable event (`WITHDRAWAL_SETTLED`) to the Event Bus and updates the Ledger.
4. **Manual Override:** Authorized 'Super Admins' can halt or reverse transactions with a mandatory MFA and reason-logging step.