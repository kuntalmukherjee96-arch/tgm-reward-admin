# ADR 031: Frontend Architecture & Unified Design System (Sprint 16)

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 21 (One API Many Clients):** The UI will strictly consume the existing API Gateways without requiring client-specific backend changes.
2. **Rule 23 (Backend Never Knows UI):** The frontend is entirely decoupled. It will be a standalone Next.js application.
3. **Rule 24 (Dumb UI / UI Never Calculates Money):** The UI components will NOT contain any financial logic, percentage calculations, or state-derived business rules. They will purely render the JSON responses provided by the backend.
4. **Rule 25 (One Design System):** We will use Tailwind CSS with a strict `theme.config.js` to serve as our Design Token system, ensuring the Web, Telegram Mini App, and future Mobile Apps look visually consistent.

## Context
Sprint 16 shifts our focus to the "Enterprise Visual Experience Layer". We possess a robust, headless, event-driven backend ("The Ferrari Engine"). Now, we need the presentation layer ("The Body Panel") for Super Admins, Admins, Finance, Support, and Users.

## Decision
We will establish our Frontend Foundation using:
1. **Framework:** Next.js (React) for optimized rendering, routing, and scalability.
2. **Styling/Design Tokens:** Tailwind CSS. All colors, spacing, and typography will be defined centrally as Design Tokens. No hardcoded hex codes in components.
3. **Data Fetching:** React Query (or SWR) to fetch, cache, and synchronize state with our API Gateways seamlessly.
4. **State Management:** Zustand (for lightweight global UI state like sidebar toggles or theme switching). Business state remains strictly on the Backend.
5. **Component Library:** Headless UI components (e.g., Radix UI or pure custom components) styled with our Tailwind tokens to maintain complete control over the visual identity.