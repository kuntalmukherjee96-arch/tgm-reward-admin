# ADR 023: Dynamic Provider Management & Runtime Configuration

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 18 (Config Driven Business Rules):** Provider parameters (API keys, revenue splits, priority) must be mutable at runtime without requiring a code deployment.
2. **Rule 20 (Everything Reversible):** Toggling a provider between 'Sandbox' and 'Production' or turning them off entirely must be instantaneous. 
3. **Rule 23 (One Source of Truth):** The Provider Management UI solely interacts with the `ConfigurationCenter`, which in turn dictates the behavior of the `ProviderAdapterEngine`.

## Context
Phase 14.4 requires a comprehensive UI for Super Admins to manage external providers (e.g., Lootably, TimeWall). Hardcoding callback secrets, sandbox states, or revenue distribution percentages limits operational agility and violates enterprise scalability norms.

## Decision
We will implement the **Dynamic Provider Configuration Engine** featuring:
1. **Headless Config API:** Endpoints to safely read and update provider state in real-time.
2. **Revenue Split Manager:** A dynamic allocator defining how a provider's payout is distributed (e.g., 70% User, 20% Platform, 10% Reserve).
3. **State Toggles:** Instant switching mechanisms for Enable/Disable, Sandbox/Production, and API Versioning (v1/v2).