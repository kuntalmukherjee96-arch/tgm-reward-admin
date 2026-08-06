# ADR 014: Marketplace & Public API Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Zero Trust (Rule 12):** Every external API request must be authenticated via an API Key and validated against active IP whitelists.
2. **Immutable Audit (Rule 14):** All API consumption metrics (success, rate-limit exceeded, unauthorized) are logged into the Event Bus.
3. **Platform Without UI (Rule 15):** The Public API layer acts as a headless gateway, allowing partners to build their own UIs (SDKs, Telegram Bots) on top of our core.

## Context
To evolve from a closed application into a Financial OS, we must open our platform to verified external partners (affiliate networks, game publishers, corporate clients). Direct database access or internal API exposure is a massive security risk. 

## Decision
We will implement a **Public API Gateway** featuring:
1. **API Key Management:** Cryptographically secure keys tied to specific Partner IDs with defined RBAC scopes (e.g., `READ_ONLY`, `CREATE_TICKET`).
2. **Rate Limiting & Quotas:** Token-bucket algorithm to enforce limits (e.g., 100 requests/minute). Requests exceeding this quota will receive a `429 Too Many Requests` response.
3. **Webhook Dispatcher:** Outbound HTTP hooks to notify partners of asynchronous events (e.g., "User KYC Approved", "Withdrawal Processed").