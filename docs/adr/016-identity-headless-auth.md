# ADR 016: Identity & Headless Authentication Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Headless Platform & Telegram as Plugin Client:** Telegram Mini App is treated purely as a UI client (Adapter). The core Financial OS remains completely agnostic of Telegram.
2. **Zero Trust Architecture:** The backend does not trust any user ID sent from the client. Authentication strictly relies on cryptographic verification of Telegram's `initData` (HMAC-SHA256 using the bot token).
3. **Immutable Audit:** Every login, new user creation, and session initiation is dispatched to the Event Bus for permanent logging.
4. **Policy Driven Configuration:** Token expiration times, allowed devices, and session limits are fetched from the Runtime Configuration Center, not hardcoded.

## Context
Sprint 13 initiates "Enterprise Production Activation," starting with real user onboarding (Phase 13.1). We need a secure, scalable way to authenticate users coming from the Telegram Mini App without violating our decoupling principles or zero-trust models. If we couple Telegram directly to the Ledger, we break the "Headless Platform" rule, preventing future web or mobile apps.

## Decision
We will implement a **Headless Identity & Auth Gateway** featuring:

1. **Cryptographic Payload Validation:** The UX API Layer will receive the `initData` payload from the Telegram Mini App and validate the cryptographic hash using the secure Bot Secret.
2. **Stateless Session Management (JWT):** Upon successful validation, the Auth Gateway issues a short-lived JWT (JSON Web Token) to the client. The Ledger and Core OS never see this JWT; it is handled strictly by the API Gateway.
3. **Event-Driven Profile Creation:** If the Telegram ID is new, the Auth Gateway emits a `USER_IDENTITY_CREATED` event to the Event Bus. The User Profile service listens to this and establishes a profile projection.
4. **Device Trust & Session Tracking:** The Auth Gateway will log the user's IP, Device Info, and Session Signature to the Risk Engine to establish a baseline for "Impossible Travel" and "VPN Probability" checks.

## Architecture Flow (Zero Trust)
`Telegram Mini App` -> `POST /v1/auth/telegram (initData)` -> `API Gateway validates HMAC` -> `Risk Engine checks Device IP` -> `Auth Service issues Session JWT` -> `Client stores JWT for future API calls`.