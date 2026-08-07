# ADR 028: Real Revenue Verification & Treasury Settlement

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 11 (Treasury Sync):** A withdrawal cannot be processed if the corresponding provider revenue has not mathematically settled in the platform's reserve.
2. **Rule 23 (One Source of Truth):** The withdrawal engine reads balances exclusively from the Core Ledger. It does not trust any client-side state.
3. **Rule 19 (Immutable Audit):** Every step of the withdrawal (REQUESTED -> REVIEW -> APPROVED -> SETTLED) is logged as an immutable event.

## Context
Phase 15.3 and 15.4 require handling real money flow. A user earning 1000 coins from Lootably wants to withdraw it to their UPI/Bank. We must ensure that the user legitimately earned those coins, the ledger mathematically balances, and the platform actually holds the revenue to cover the payout.

## Decision
We will implement the **TreasurySettlementEngine** featuring:
1. **Ledger Truth Verification:** Upon receiving a withdrawal request, the engine instantly queries the ledger to verify the user's current spendable balance.
2. **Zero-Trust Settlement Queue:** All valid requests are moved to a 'PENDING_REVIEW' queue for the Finance Admin to authorize. No automated API payout happens instantly for beta users.
3. **Idempotent Payouts:** Once authorized, the transaction ID is locked. If the Finance Admin accidentally clicks 'Approve' twice, the system prevents double payout.