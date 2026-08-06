# ADR 013: Executive BI & Forecasting Architecture

## Status
PROPOSED -> IN-REVIEW

## Constitution Alignment
1. **Read-Only Ledger Access (Rule 1):** The BI engine will never mutate data. It accesses read-only replicas of the Ledger and Event Bus to perform heavy analytical queries.
2. **Platform Without UI (Rule 15):** The engine operates as a background microservice, calculating daily KPI aggregates and caching them for any UI or external reporting tool to consume.
3. **Immutable Truth:** Projections are labeled strictly as 'Forecasts'. Actual financial truth always defaults to the core Ledger.

## Context
Enterprise executives need visibility into future liquidity. Without a forecasting engine, sudden spikes in user withdrawals could drain the platform's reserves. We need automated Business Intelligence (BI) to predict cash-flow trends, revenue projections, and active user retention.

## Decision
We will implement an **Executive BI Core** featuring:
1. **Historical Aggregation:** Daily cron jobs to aggregate total deposits, withdrawals, and platform revenue.
2. **Cash-Flow Forecasting Engine:** An algorithmic model predicting the next 7-30 days of liquidity requirements based on the last 90 days of ledger velocity.
3. **KPI Generation:** Calculating metrics like ARPU (Average Revenue Per User) and Churn Rate in real-time.