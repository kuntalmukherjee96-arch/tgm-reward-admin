# Evidence Pack: ADR 033 Workforce Operations Intelligence
**Date:** 2026-08-08 | **Environment:** CI/CD Automated Test Suite (Jest/Supertest)
**Status:** All defined ADR 033 security guardrails have passed the mandatory automated test suite.

---

### 1. Web + Mobile Overlapping-Session (Double-Count Prevention)
* **Test Case:** Agent is simultaneously active on Web and Telegram Mini App.
* **Input:** `Session 1 (Web): [10:00:00 - 10:15:00]`, `Session 2 (Mobile): [10:05:00 - 10:20:00]`
* **Expected Result:** `Union = [10:00:00 - 10:20:00]`. Total Active Time = 1200 seconds (20 mins).
* **Actual Result:** `1200 seconds`. Sweep-line algorithm successfully merged intervals.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/utils/intervalUnion.spec.js:L42`

### 2. Online ≠ Active ≠ Working Time Validation
* **Test Case:** Ensure system differentiates raw connection time vs actual verified work.
* **Input:** `Agent Login: 09:00`, `Logout: 17:00`. Total idle gaps detected by heartbeat timeout: `1 hour 15 mins`.
* **Expected Result:** `actualOnlineSec: 28800 (8h)`, `activeWorkingSec: 24300 (6h 45m)`, `idleSec: 4500 (1h 15m)`.
* **Actual Result:** Match exact expected seconds.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/projections/workingTimeCalculation.spec.js:L18`

### 3. RBAC Scope Isolation
* **Test Case:** Admin assigned to `Team A` attempts to fetch global workforce data.
* **Input:** `GET /api/workforce?scope=GLOBAL` with `Bearer Token (Role: ADMIN, TeamId: TEAM_A)`.
* **Expected Result:** `HTTP 403 Forbidden` or hard-fallback to `Team A` scoped data.
* **Actual Result:** `HTTP 403 Forbidden - Scope breach attempt rejected by AuthMiddleware`.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/api/rbacScope.spec.js:L88`

### 4. Configuration Snapshot Integrity (Historical Analytics)
* **Test Case:** Global `IDLE_THRESHOLD` changes from 300s to 600s. Previous projections must not be altered.
* **Input:** Modify config to `cfg_snap_091B` (600s). Query yesterday's projection tied to `cfg_snap_091A` (300s).
* **Expected Result:** Yesterday's projection calculates idle time using 300s rule, not 600s.
* **Actual Result:** Historical projection remained immutable using frozen snapshot `cfg_snap_091A`.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/projections/configSnapshotIntegrity.spec.js:L112`

### 5. Full Deterministic Projection Rebuild
* **Test Case:** Delete Analytics Projection table. Rebuild from raw Event Bus.
* **Input:** Trigger `ProjectionEngine.rebuild(Date: "2026-08-07", CalcVer: "calc_v1.0")`.
* **Expected Result:** SHA-256 hash of rebuilt JSON perfectly matches the deleted JSON hash.
* **Actual Result:** `Hash Match: 100%`. Deterministic replay successful.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/engine/deterministicRebuild.spec.js:L55`

### 6. Manual Presence Override Immutable Audit
* **Test Case:** Super Admin changes Agent status to resolve a system disconnect dispute.
* **Input:** `PUT /api/workforce/override` payload: `{ target: "AGT_07", newState: "ACTIVE", reason: "System fault" }`
* **Expected Result:** Event `WORKFORCE_PRESENCE_OVERRIDDEN` appended to Event Bus with `PreviousValue`, `NewValue`, `ActorRole`, `CorrelationID`.
* **Actual Result:** Event correctly saved. Silently updating DB without audit is blocked.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/events/auditTrailOverride.spec.js:L34`

### 7. Heartbeat Spoofing & Server-Monotonic Time
* **Test Case:** Malicious client sends heartbeat with future timestamp.
* **Input:** `POST /api/heartbeat` with `{ clientTime: "2026-08-08T23:59:59Z" }`
* **Expected Result:** Server ignores `clientTime`, generates monotonic timestamp, and calculates delta safely.
* **Actual Result:** Client time ignored. Monotonic server clock recorded.
* **PASS/FAIL:** ✅ PASS
* **Evidence Ref:** `test/security/clockSpoofing.spec.js:L21`