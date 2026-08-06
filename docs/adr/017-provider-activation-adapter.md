# ADR 017: Provider Activation & Plugin Adapter Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 17 (Replaceable Integrations):** Providers (Lootably, TimeWall) are not permanent or core to the Financial OS. They are implemented strictly using the Adapter Pattern as hot-swappable plugins.
2. **Zero Trust Architecture:** Inbound webhooks/callbacks from external providers are untrusted by default. Mandatory HMAC / Secret hash validation must be performed before processing.
3. **Ledger Truth (Rule 1):** Validated provider callbacks do not credit user wallets directly. They emit a `PROVIDER_REWARD_VERIFIED` event, which passes through the Risk Engine before entering the Ledger.

## Context
Phase 13.2 transitions from simulated provider data to real production callbacks (Lootably, TimeWall). We need a unified API endpoint to receive these callbacks while insulating the core ledger from provider-specific payload schemas or security vulnerabilities.

## Decision
We will implement an **Adapter-based Provider Activation Engine** featuring:
1. **Provider Adapters:** Individual normalization layers (`LootablyAdapter`, `TimeWallAdapter`) that translate vendor-specific payloads into a standardized `ProviderPostback` interface.
2. **Cryptographic Postback Validation:** Verify incoming HTTP signature using provider secrets.
3. **Deduplication Engine:** Check transaction IDs against processed caches to prevent replay attacks and double-crediting.
4. **Revenue Split & Coin Conversion:** Apply dynamic revenue shares (from Configuration Center - Rule 18) to calculate Platform Share vs. User Share.