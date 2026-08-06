# Database Migration Manifest

| Migration ID | Applied Date | Rollback Available? | Affected Tables | ADR Reference |
|---|---|---|---|---|
| MIG-12-001 | System.Date | YES | users, transactions | ADR-001 |
| MIG-12-002 | System.Date | YES | api_keys, webhooks | ADR-014 |

*Rule: No migration is merged without a tested rollback script.*