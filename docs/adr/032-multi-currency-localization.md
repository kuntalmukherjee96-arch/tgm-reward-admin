# ADR 032: Multi-Currency Localization & FX Conversion (Sprint 16)

## Status
PROPOSED -> APPROVED

## Context
To scale globally while providing a localized user experience (e.g., INR for Indian users via UPI/Bank, USD for global users), the platform must support multi-currency display and real-time FX conversion without violating Rule 24.

## Decisions
1. **Core Ledger Truth (USD):** The core financial ledger remains strictly in USD as the base settlement currency.
2. **Dynamic Localization:** The backend will determine the user's regional currency (e.g., INR, EUR, USD) based on profile settings or IP headers.
3. **Backend FX Calculation:** All conversion rates and calculations will be handled exclusively by the backend `CurrencyExchangeService`. The UI will never calculate rates.
4. **Payout Execution:** Withdrawals will display local currency values to the user, but final payouts via providers will execute precise FX settlements with immutable audit evidence (Rule 22).