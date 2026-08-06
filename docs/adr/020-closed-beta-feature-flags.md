# ADR 020: Closed Beta Activation & Feature Flag Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 18 (Business Rules in Config):** Feature toggles (A/B testing, enabling/disabling providers) are strictly managed via the Runtime Configuration Center. No boolean flags hardcoded in the application logic.
2. **Zero Trust Access:** Access to the Closed Beta is restricted exclusively to pre-authorized Invite Codes. The API Gateway will reject all unauthorized onboarding attempts.
3. **Rule 16 (Incident Knowledge):** A feedback and crash reporting engine will automatically route user-reported beta issues into the `ProductionAlertCenter` for root cause analysis.

## Context
Phase 13.5 represents our first exposure to external users. We are onboarding 50-100 real users in a controlled environment. To mitigate risk, we need mechanisms to tightly control who can enter the system and the ability to instantly disable faulty features without a code deployment.

## Decision
We will implement the **Beta Operations Engine** featuring:
1. **Invite Gateway:** A middleware that validates `INVITE_CODE` before allowing the `USER_IDENTITY_CREATED` event to fire.
2. **Feature Flag Manager:** A service that fetches runtime states (e.g., `isLootablyEnabled: true`, `isWithdrawalEnabled: false`) to control execution flows safely.
3. **Telemetry & Feedback Endpoint:** A lightweight API to collect anonymous usage analytics and direct user feedback for rapid iteration.