# ADR 015: User Experience Layer Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Ledger Truth (Rule 1):** The User Experience API never writes to the ledger directly. Wallet balances are read dynamically, and withdrawal requests are simply pushed to the Workflow Engine.
2. **Zero Trust (Rule 12):** User task completions (e.g., clicking an ad, playing a game) are treated as unverified events until the Provider Hub and Risk Engine validate them.
3. **Platform Without UI (Rule 15):** The UX Layer is a headless REST/GraphQL API. The Telegram Mini App or Web Portal will just consume these endpoints.

## Context
End-users need a way to interact with the platform (view balance, complete tasks, request withdrawals). We need an architectural layer that serves these users at high scale without exposing the core backend or the ledger to public traffic.

## Decision
We will implement a **Headless UX API Layer** featuring:
1. **Wallet Engine (Read-Only):** Fetches the user's current verified balance from the Ledger.
2. **Task Ingestion API:** Receives task completion payloads and routes them to the Risk Engine.
3. **Withdrawal Request Gateway:** Accepts user requests, creates a 'New' ticket in the Kanban Workflow, and awaits Operations approval.