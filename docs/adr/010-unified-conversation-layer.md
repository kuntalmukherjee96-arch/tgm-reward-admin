# ADR 010: Unified Conversation Layer Blueprint

## Status
APPROVED

## 5-Step Pre-Coding Review Compliance
1. **Constitution:** UI strictly segregates message visibility (PUBLIC vs INTERNAL) at the presentation layer, backed by API gateway enforcement.
2. **Frozen ADRs:** Complies with ADR 002 (Command Center) and ADR 009 (Workflow Board).
3. **API Contracts:** UI mapped to existing secure support messaging endpoints.
4. **DB Schema:** Leverages existing tables. Internal notes are tagged via an `is_internal` boolean flag.
5. **Business Rules:** Users absolutely cannot read INTERNAL notes. Escalation timers (SLA) trigger automated audit events.

## Context
Operators waste time switching between chat apps, internal slack channels, and email. A unified view is required where public user communications and internal administrative deliberations (e.g., Finance discussing a refund) coexist on one ticket timeline.

## Decision
We will implement a **Unified Conversation UI Layer** featuring:
1. **Visibility Segregation:** 'User Chat' vs 'Internal Notes' (Finance/Admin only).
2. **SLA Timers:** Countdown indicators ensuring compliance with response time policies.
3. **Timeline Aggregation:** System events (ticket assigned, state changed via Kanban) rendered as inline timeline messages.
4. **Quick Actions:** Pre-approved macro replies and instant escalation triggers.