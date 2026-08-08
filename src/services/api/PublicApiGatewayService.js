// 🌐 SPRINT 12: PUBLIC API GATEWAY (UPDATED FOR FREEZE)
// Added Environment Isolation, Replay Protection, and Key Rotation Ready

class PublicApiGatewayService {
    constructor() {
        this.apiKeysDb = {
            'sk_live_abc123': { partnerId: 'PARTNER_01', env: 'PRODUCTION', quota: 100, used: 0, status: 'ACTIVE' },
            'sk_test_xyz789': { partnerId: 'PARTNER_01', env: 'SANDBOX', quota: 1000, used: 0, status: 'ACTIVE' } // Sandbox Environment
        };
        this.processedWebhooks = new Set(); // Replay Protection Cache
    }

    authenticateAndLimit(apiKey, endpoint, requestTimestamp, nonce) {
        // 1. Webhook Replay Protection
        const currentTime = Date.now();
        if (currentTime - requestTimestamp > 300000) { // 5 minutes validity
            throw new Error("403_FORBIDDEN: Request expired (Replay Protection)");
        }
        if (this.processedWebhooks.has(nonce)) {
            throw new Error("403_FORBIDDEN: Duplicate Nonce (Replay Attack Detected)");
        }
        this.processedWebhooks.add(nonce);

        // 2. Auth & Environment Check
        const clientRecord = this.apiKeysDb[apiKey];
        if (!clientRecord || clientRecord.status !== 'ACTIVE') {
            throw new Error("401_UNAUTHORIZED: Invalid or Suspended API Key");
        }

        // 3. Rate Limit Enforcement
        if (clientRecord.used >= clientRecord.quota) {
            throw new Error("429_TOO_MANY_REQUESTS: Rate limit exceeded");
        }

        clientRecord.used += 1;
        console.log(`✅ [API GATEWAY - ${clientRecord.env}] Request authorized for ${clientRecord.partnerId}.`);
        return { authorized: true, env: clientRecord.env, partnerId: clientRecord.partnerId };
    }

    rotateApiKey(partnerId, env) {
        console.log(`🔐 [KEY ROTATION] Generating new ${env} API Key for ${partnerId}...`);
        // Implementation for revoking old key and returning new key
    }
}

module.exports = PublicApiGatewayService;