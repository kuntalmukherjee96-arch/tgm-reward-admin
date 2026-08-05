# ADR 002: Operations Command Center Aggregation API

## Status
APPROVED

## Context
An Enterprise Financial Operations OS requires real-time visibility across multiple decoupled domains (Ledger, Wallets, Deposits, Withdrawals, Support Tickets, and Feature Flags). Querying each micro-module separately from the frontend causes network latency and operational blind spots.

## Decision
We will implement an **Operations Command Center Aggregation API** (`/api/admin/command-center`). 
- This service will securely aggregate live metrics from the immutable ledger, pending workflows, and system health flags into a single, RBAC-protected, unified JSON payload.
- Strict read-only access restricted to Super Admin and Operations Manager roles.

## Consequences
- **Positive:** Single pane of glass for operators, drastically reduced dashboard load times, instant visibility into operational bottlenecks and SLA breaches.
- **Negative/Risk:** High-frequency polling could stress the database.
- **Mitigation:** Implement lightweight indexing on projection tables and optimize query limits.