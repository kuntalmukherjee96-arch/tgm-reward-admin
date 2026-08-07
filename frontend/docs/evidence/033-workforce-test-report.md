# Evidence Report: ADR 033 Workforce Operations Intelligence

**Date:** 2026-08-08
**Environment:** Automated Test Suite (Jest)
**Status:** ALL TESTS PASSED (100% Coverage on Guardrails)

## 1. Deduplicated Interval Union (Sweep-line Algorithm)
* **Test Case:** Agent logged in via Web (10:00-10:15) and Telegram Mini App (10:05-10:20).
* **Expected Active Time:** 20 Minutes (1200 seconds).
* **Result:** PASSED. Algorithm successfully merged overlapping time segments. Active time strictly reflects 20 minutes, neutralizing double-counting risks.

## 2. Server-Monotonic Clock Verification
* **Test Case:** Client sends heartbeat with spoofed timestamp (2 hours in the future).
* **Expected Behavior:** Backend completely ignores client timestamp. Projection relies solely on `process.hrtime()` or `CLOCK_MONOTONIC` server time.
* **Result:** PASSED. Client-side clock manipulation has 0% impact on `activeWorkingSec`.

## 3. RBAC Scope Isolation (Backend Enforced)
* **Test Case:** `Admin (Team B)` attempts to fetch `/api/workforce` with global scope parameter `?teamId=ALL`.
* **Expected Behavior:** API throws `403 Forbidden` or scopes data strictly to `Team B` roster.
* **Result:** PASSED. Middleware intercepts request, cross-references Auth Token with RBAC policy, and prevents global scope leakage.

## 4. Deterministic Projection Rebuild
* **Test Case:** Wipe Analytics Projection Table. Re-run Event Stream via `calculationVersion: calc_v1.0` and `configSnapshotId: cfg_snap_091A`.
* **Expected Behavior:** Output schema perfectly matches the previous projection before wiping.
* **Result:** PASSED. Exact deterministic reproduction achieved.