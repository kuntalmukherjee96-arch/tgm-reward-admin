# ADR 024: Headless User Dashboard & Telegram Mini App Client Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 15 (Platform Without UI):** The Core Platform will not serve HTML. The Telegram Mini App acts as a decoupled "Plugin Client" consuming the `/v1/user` REST APIs.
2. **Rule 23 (One Source of Truth):** The User Dashboard UI must fetch wallet balances directly from the Ledger Projection (Read-Model), ensuring no duplicate balance calculation exists in the client layer.
3. **Rule 19 (Everything Observable):** Every user action within the Mini App (e.g., viewing earning history, opening a ticket) must emit an analytics metric.

## Context
Phase 14.2 and 14.3 require a unified backend structure to support the end-user experience. The user needs to view their wallet, withdrawal history, referrals, and support tickets. The official client for this will be the Telegram Mini App, which requires a highly optimized, read-heavy API gateway to prevent overloading the core ledger.

## Decision
We will implement the **UserClientGateway Engine** featuring:
1. **Aggregated Dashboard API:** A single endpoint (`/v1/user/dashboard/summary`) that fetches the Wallet Balance, Active Tickets, and Recent Earnings in one parallelized call to reduce Mini App load times.
2. **Telegram Client Plugin Architecture:** The gateway will explicitly format responses optimized for the Telegram Mini App's limited viewport and caching strategies.
3. **Read-Only Projections:** The gateway will only interact with materialized views (Ledger Projections) for fetching history, never directly querying the core write-optimized Ledger unless a transaction is occurring.