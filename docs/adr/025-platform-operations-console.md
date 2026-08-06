# ADR 025: Unified Platform Operations Console Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Rule 19 (Everything Observable):** The Operations Console must aggregate real-time metrics (health, finance queues, provider SLAs) across the entire platform.
2. **Rule 23 (One Source of Truth):** The console does not calculate data; it only subscribes to events and fetches projections from core domains.

## Context
Phase 14.5 requires a "Platform Operations Console" for Super Admins to monitor Live Workflows, Finance Queues, Provider Status, and System Health in one unified screen to ensure production stability.

## Decision
We will implement an **Operations Aggregator API** featuring:
1. **System Health Metrics:** Endpoint to fetch current API, Database, and Event Bus health status.
2. **Live Queue Monitoring:** Real-time data on pending withdrawals and open support tickets.
3. **Provider Telemetry:** Aggregated success rates and latency from the Provider Adapter Engine.
