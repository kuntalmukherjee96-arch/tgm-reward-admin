# Security Threat Model

| Asset | Threat | Impact | Mitigation (Zero-Trust) | Owner |
|---|---|---|---|---|
| Public API | DDoS / Brute Force | High | Token Bucket Rate Limiting | SecOps |
| Webhooks | Replay Attacks | High | Nonce & Timestamp Verification | API Gateway |
| Core Ledger | Unauthorized Writes | Critical | Workflow Isolation, No Direct UI Access | DBA |
| User Login | Impossible Travel | Medium | Geo-Distance Risk Scoring Engine | AI Core |