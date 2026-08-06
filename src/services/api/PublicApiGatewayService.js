// 🌐 SPRINT 12 PHASE 4: PUBLIC API GATEWAY CORE SERVICE
// Headless API Key Auth, Token-Bucket Rate Limiting & Zero-Trust (ADR 014)

class PublicApiGatewayService {
    constructor() {
        // Mock Database of API Keys and Quotas (Normally loaded from DB via Redis)
        this.apiKeysDb = {
            'sk_live_abc123': { partnerId: 'PARTNER_AFFILIATE_01', quota: 100, used: 0, status: 'ACTIVE' },
            'sk_live_xyz789': { partnerId: 'PARTNER_GAME_02', quota: 500, used: 0, status: 'SUSPENDED' }
        };
    }

    // Core Middleware logic for authenticating and rate-limiting incoming API requests
    authenticateAndLimit(apiKey, endpoint) {
        // 1. Zero Trust (Rule 12): Check if API key exists
        const clientRecord = this.apiKeysDb[apiKey];
        if (!clientRecord) {
            this._logAudit('UNAUTHORIZED', `Invalid API Key attempt on endpoint: ${endpoint}`);
            throw new Error("401_UNAUTHORIZED: Invalid API Key");
        }

        // 2. Check Partner Account Status
        if (clientRecord.status !== 'ACTIVE') {
            this._logAudit('FORBIDDEN', `Suspended partner ${clientRecord.partnerId} attempted access`);
            throw new Error("403_FORBIDDEN: Account is suspended");
        }

        // 3. Rate Limiting Check (Quota Enforcement)
        if (clientRecord.used >= clientRecord.quota) {
            this._logAudit('RATE_LIMIT_EXCEEDED', `Partner ${clientRecord.partnerId} exceeded quota of ${clientRecord.quota}`);
            throw new Error("429_TOO_MANY_REQUESTS: Rate limit exceeded");
        }

        // 4. Process Request & Increment Usage
        clientRecord.used += 1;
        console.log(`✅ [API GATEWAY] Request authorized for ${clientRecord.partnerId}. Quota: ${clientRecord.used}/${clientRecord.quota}`);
        
        return {
            authorized: true,
            partnerId: clientRecord.partnerId,
            remainingQuota: clientRecord.quota - clientRecord.used
        };
    }

    // Rule 14: Immutable Audit Logging for Security Events
    _logAudit(event, message) {
        console.log(`🚨 [SECURITY AUDIT] EVENT: ${event} | DETAILS: ${message} | TIMESTAMP: ${new Date().toISOString()}`);
    }
}

module.exports = PublicApiGatewayService;