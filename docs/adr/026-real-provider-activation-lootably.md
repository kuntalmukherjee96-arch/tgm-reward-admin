# ADR 026: Real Provider Activation & Production Callback Security (Lootably)

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
- **Rule 18 (Config Driven):** Provider keys and environment (Sandbox/Production) are managed dynamically via Configuration Center, not hardcoded.
- **Rule 22 (Production First):** No webhook will be processed in Production Mode without strict cryptographic signature validation (IP Whitelisting & Secret Key Hashing).

## Context
Phase 15.1 requires activating our first real provider, Lootably, moving it from Sandbox to Production. This transition involves handling real money and real user callbacks. We must ensure that malicious actors cannot spoof callbacks to falsely inflate user wallets.

## Decision
We will implement a **Production-Grade Provider Security Layer** featuring:
1. **Dynamic State Router:** The `ProviderAdapterEngine` will check the runtime config. If Lootably is in 'Production', it enforces strict validation. If in 'Sandbox', it bypasses strict IP checks for testing.
2. **Cryptographic Callback Validation:** All incoming postbacks from Lootably will be verified using HMAC/SHA-256 with the production secret key provided in the payload.
3. **Idempotency Guarantee:** Every transaction ID (`tx_id`) from the provider will be checked against the Ledger. Duplicate transactions will be instantly rejected to prevent double-spending.
4. **Automated Audit Logging:** Every successful and failed production callback will emit an event for the Operations Console to monitor.