# ADR 033: Support Workforce Analytics & Duty Roster Engine

## Status
PROPOSED (Pre-Sprint 17 Enhancement)

## Context
As Tinitri transitions from a visual layer to a fully operational Enterprise Operating System, the Support Module must evolve beyond a simple conversation tool. To ensure measurable support quality, accountability, and operational health, we need a decoupled Support Workforce Analytics Layer, Duty Roster, and Real-Time Presence Intelligence.

## Principles & Rules Enforced
1. **Frontend is Dumb (Rule 24):** UI will never calculate analytics or shift hours; all projections are provided by the backend.
2. **Immutable Audit (Rule 22):** Shift assignment, presence change, login/logout, and SLA breaches are treated as immutable events in the Core Event Bus.
3. **Strict RBAC (Rule 18):** Super Admin sees global stats; Admin sees team stats; Agents see only their personal metrics.
4. **Decoupled Architecture:** The Analytics Engine is strictly separated from the Chat UI to support future AI integrations (coaching, workload prediction).

## Architectural Decisions

### 1. Presence Model (Event-Driven State)
Agents will have distinct, non-forgeable presence states validated by the backend:
* `ONLINE` (Active and available for routing)
* `BUSY` (Handling chat/ticket limit reached)
* `AWAY` (Idle timeout > 5 mins or manually set)
* `OFFLINE` (Logged out or disconnected)
* `SCHEDULED_OFFLINE` (Expected to be on duty, but not present - triggers alert)

### 2. Duty Roster Model
* **Data Structure:** Time Slot, Assigned Agent, Scheduled Shift, Actual Login Timestamp, Variance (Late/Early).
* **Modification:** Only Super Admin/Authorized Admin can modify rosters. Every change generates a `ROSTER_MODIFIED` audit event.

### 3. Workforce Analytics Projection
Backend will continuously aggregate events and expose:
* **Agent Level:** Total Chats, Avg Response, SLA %, Active vs. Scheduled Hours.
* **Global Health (Super Admin):** Active Agents (X/Y), Pending Workload, System-wide SLA %, Escalation Count.

### 4. Operational Alerts Integration
The backend will emit real-time telemetry to the Notification Center for operational anomalies:
* `ALERT_SLA_RISK`: Ticket approaching breach.
* `ALERT_COVERAGE_GAP`: Agent scheduled but absent.

## Consequences
* **Positive:** Complete visibility into human workforce performance and support health. Enterprise-grade accountability.
* **Negative/Cost:** Increased event volume on the backend; requires careful aggregation logic for real-time dashboard updates without performance hits.