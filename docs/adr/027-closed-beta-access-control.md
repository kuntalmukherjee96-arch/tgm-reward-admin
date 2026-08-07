# ADR 027: Closed Beta Access Control & Invite Limits

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 5 (Strict RBAC):** Access to the production platform is governed by a strict Gatekeeper, ensuring only authorized individuals can gain the 'BETA_USER' role.
2. **Rule 18 (Config Driven):** The maximum number of beta users (e.g., 50) and active invite codes are managed via the Configuration Center, not hardcoded.
3. **Rule 19 (Everything Observable):** Every successful entry and rejected registration attempt due to capacity limits must be logged for the Operations Console.

## Context
Phase 15.2 dictates that we must avoid a massive public launch. We need to onboard exactly 20-50 real users to validate end-to-end financial flows. An open registration would risk overwhelming the system before production stability is proven.

## Decision
We will implement the **ClosedBetaGatekeeper** featuring:
1. **Invite-Only Registration:** The authentication API will require a valid, pre-configured invite code to create an account.
2. **Hard Cap Enforcer:** The Gatekeeper will check the current user count. If it reaches the config-defined limit (e.g., 50), it will instantly reject new registrations with a `503_CAPACITY_REACHED` error.
3. **Headless API Behavior:** The Client API will dynamically indicate to the Telegram Mini App whether registrations are 'OPEN' (requires invite) or 'CLOSED' (beta full), preventing unnecessary backend load.