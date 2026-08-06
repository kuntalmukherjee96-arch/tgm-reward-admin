# ADR 022: Headless Admin UI & Dynamic Role-Based Navigation

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 15 (Platform Without UI):** The Core Platform remains entirely headless. The Admin UI is merely a 'Client' that consumes standard `/v1/admin` REST APIs.
2. **Rule 5 (Strict RBAC):** Navigation and dashboard widgets are dynamically rendered based on the cryptographic token and role validation from the backend. The UI makes zero access-control decisions.
3. **Rule 23 (One Source of Truth):** No business logic (e.g., calculating reserves, validating limits) exists in the frontend. 

## Context
Phase 14.1 requires a comprehensive Admin Experience (Super Admin, Admin, Finance, Operations, Support). Because our system is built for enterprise scale, we cannot hardcode UI menus. A Support Admin should never even see the "Treasury" button in their DOM.

## Decision
We will implement an **API-Driven UI Gateway Engine** featuring:
1. **Dynamic Navigation Matrix:** Upon login, the client calls `/v1/auth/permissions`. The backend returns a JSON array of permitted modules (e.g., `['finance_queue', 'support_tickets']`). The UI maps this to the sidebar.
2. **Widget Orchestration:** Dashboard widgets (e.g., Live Finance Queue, Live Provider Status) independently fetch data from their respective decoupled micro-services.
3. **Headless Action Wrappers:** Every UI button click (e.g., "Approve Withdrawal", "Ban User") simply dispatches a standard payload to the API Gateway.