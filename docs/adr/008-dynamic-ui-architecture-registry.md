# ADR 008: Dynamic Enterprise UI Architecture & Component Registry

## Status
APPROVED

## 5-Step Pre-Coding Review Compliance
1. **Sprint 1-10 Constitution:** UI will not query DB directly; strictly relies on API Gateway.
2. **Frozen ADR Review:** Fully compatible with ADR 006 (Unified Gateway) & ADR 001 (Config Center).
3. **API Contract Review:** UI progressively consumes existing endpoints without altering contracts.
4. **Database Schema Review:** No changes to ledger or audit schemas. UI configurations will use a new widget JSONB store.
5. **Business Rules Review:** Ledger immutability and AI Guardrails remain strictly enforced.

## Context
A hardcoded frontend cannot serve an evolving Financial OS. Operators need configurable layouts, component-level RBAC, progressive loading, and widget-level error isolation to maintain high availability and usability.

## Decision
We will implement an advanced **Dynamic UI Architecture** featuring:
1. **Component Registry:** Centralized widget store (`dashboard_registry`, `widget_registry`).
2. **Dynamic Layout Engine:** Configurable widget placements per operator.
3. **UI-Level RBAC:** Strict component hiding based on user roles (Two-Layer Security).
4. **Progressive Loading:** Priority-based API fetching (Health -> Revenue -> Tickets -> Analytics).
5. **Error Boundaries:** Isolated widget crash recovery.
6. **State Recovery:** Browser-persistent filters, search, and layout states.