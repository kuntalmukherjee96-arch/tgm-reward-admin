# Configuration Governance

## Version Control Strategy
All platform settings (e.g., Reward amounts, API limits) are strictly versioned. Every change creates a new snapshot.

## Immutable Audit Trail
- Admin ID
- Old Value
- New Value
- Timestamp
- Reason / ADR Reference

*Status: Enforced via Database Triggers.*