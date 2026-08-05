# ADR 005: AI Operations Assistant & Safety Guardrails

## Status
APPROVED

## Sprint 10 Constitution Compliance (10-Point Design Checklist)
1. **Module Owner:** AI & Platform Intelligence Squad
2. **Source of Truth:** Immutable Ledger, Transaction History, and User Behavior Projections
3. **Event Producer:** Real-time Transaction & Support Telemetry Streams
4. **Event Consumer:** Operations Command Center UI & Support Escalation Queues
5. **Audit কোথায়?** `ai_operations_audit_logs` and `policy_audit_logs`
6. **RBAC কী?** Read-only AI insights restricted to `SUPER_ADMIN` and `OPERATIONS_MANAGER`
7. **Failure Mode কী?** AI service timeout or hallucination falls back to pure rule-based metrics without AI suggestions
8. **Retry Strategy কী?** Non-blocking asynchronous background evaluation with a 2-second timeout
9. **Rollback Strategy কী?** Master feature-flag toggle to instantly disable AI assistance layer platform-wide
10. **Future Extension Point কোথায়?** LLM-powered context summarization for complex support tickets and automated fraud clustering

## Context
Operators face cognitive overload when analyzing large volumes of support tickets, transaction velocity, and risk anomalies. An AI Operations Assistant is needed to summarize, predict, and score risk.

## Decision
We will implement an **AI Operations Assistant Layer** with strict safety guardrails.
- **Strict Prohibition:** AI is strictly prohibited from executing automated financial mutations (no autonomous approvals or rejections).
- **Mandatory Role:** AI acts solely as an advisory layer providing risk scoring, anomaly detection, and text summarization to human operators.