# ADR 009: Live Workflow Board Architecture (Kanban Engine)

## Status
APPROVED

## 5-Step Pre-Coding Review Compliance
1. **Constitution:** UI layer orchestrates visual states; backend enforces RBAC and ledger immutability.
2. **Frozen ADRs:** Complies with ADR 002 (Operations Hub) and ADR 005 (AI Guardrails).
3. **API Contracts:** UI mapped to strictly defined state-transition REST endpoints.
4. **DB Schema:** No mutations. Kanban columns directly project existing `status` enums.
5. **Business Rules:** Moving a ticket mandates an explicit RBAC check prior to API payload dispatch.

## Context
Operators currently manage tasks and support tickets via linear tables, which lacks visual progression tracking. A Kanban-style workflow board is required to visualize the lifecycle of financial operations and support requests.

## Decision
We will implement a **Live Workflow Board (Kanban Style)** that visually maps to backend status states:
- `New` -> `Assigned` -> `In Review` -> `Finance` -> `Admin` -> `Super Admin` -> `Resolved` -> `Closed` -> `Archived`
- **Drag & Drop RBAC Enforcement:** A visual drag action is intercepted by an RBAC validator. If an 'Operations Manager' attempts to move a ticket to 'Finance', the UI will block the drop action instantly, averting an unnecessary API error.
- **Audit Logging:** Every successful visual drop that alters state triggers an immutable audit log entry.