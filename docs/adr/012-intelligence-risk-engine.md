# ADR 012: Intelligence & Risk Engine Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **AI Advisory Only:** The Intelligence Engine calculates risk but CANNOT authorize financial ledger mutations directly. It only flags for human Operations Manager approval.
2. **Immutable Audit (Rule 14):** Every generated Risk Score and its reasoning (Velocity, IP, Amount) is permanently attached to the transaction's audit trail.
3. **Zero Trust (Rule 12):** All user actions (withdrawals, logins, task completions) are treated as high-risk until scored by the engine.

## Context
As the platform scales, manual review of every transaction is impossible. We need an automated system to detect fraud (velocity attacks, abnormal behavior, fake accounts) while strictly adhering to our "Ledger is the only financial truth" and "Workflow is policy-driven" rules.

## Decision
We will implement an **Intelligence & Risk Engine** featuring:
1. **Dynamic Fraud Scoring:** A 0-100 scoring mechanism based on business rules (e.g., amount threshold, request frequency).
2. **Anomaly Detection:** Flagging sudden spikes in user activity.
3. **Action Routing:** 
   - Score < 40: Auto-Approve (if allowed by global settings).
   - Score 40-79: Standard Queue.
   - Score 80+: High-Risk Queue (Requires Super Admin / Finance Admin).