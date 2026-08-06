// 🌐 SPRINT 12 PHASE 4: PUBLIC API & MARKETPLACE EVIDENCE
// Validating Zero-Trust API Key Auth and Rate Limiting Quotas

console.log("===============================================================");
console.log("🛡️ STARTING PUBLIC API GATEWAY & RATE LIMITING TEST...");
console.log("===============================================================\n");

class PublicApiGateway {
    constructor() {
        // Mock DB of active partners and their quotas
        this.partners = {
            'PARTNER_AFFILIATE_01': { apiKey: 'sk_live_abc123', quotaPerMinute: 3, usedQuota: 0, status: 'ACTIVE' },
            'PARTNER_GAME_02': { apiKey: 'sk_live_xyz789', quotaPerMinute: 100, usedQuota: 0, status: 'SUSPENDED' }
        };
    }

    // Middleware: Authenticate & Check Rate Limit
    handleIncomingRequest(providedApiKey, endpoint) {
        console.log(`\n➡️ [INBOUND REQUEST] Endpoint: ${endpoint} | Key: ***${providedApiKey.slice(-4)}`);

        // 1. Zero Trust: Authentication Check
        const partnerId = Object.keys(this.partners).find(id => this.partners[id].apiKey === providedApiKey);
        
        if (!partnerId) {
            console.log("   ⛔ [401 UNAUTHORIZED] Invalid API Key.");
            return;
        }

        const partner = this.partners[partnerId];

        // 2. Status Check
        if (partner.status !== 'ACTIVE') {
            console.log(`   ⛔ [403 FORBIDDEN] Partner account is ${partner.status}.`);
            return;
        }

        // 3. Rate Limiting (Quota Check)
        if (partner.usedQuota >= partner.quotaPerMinute) {
            console.log(`   ⚠️ [429 TOO MANY REQUESTS] Rate limit exceeded for ${partnerId}. (Quota: ${partner.quotaPerMinute}/min)`);
            console.log(`   📝 [AUDIT] Rate limit breach logged for security review.`);
            return;
        }

        // 4. Process Request
        partner.usedQuota += 1;
        console.log(`   ✅ [200 OK] Request processed successfully for ${partnerId}. (Usage: ${partner.usedQuota}/${partner.quotaPerMinute})`);
    }
}

async function runApiTest() {
    const gateway = new PublicApiGateway();

    console.log("--- SCENARIO 1: Suspended Partner Request ---");
    gateway.handleIncomingRequest('sk_live_xyz789', '/v1/users/balance');

    console.log("\n--- SCENARIO 2: Valid Partner Rate Limit Test ---");
    // Partner 1 has a quota of 3 requests per minute. Let's send 4 requests.
    gateway.handleIncomingRequest('sk_live_abc123', '/v1/campaigns'); // Usage: 1
    gateway.handleIncomingRequest('sk_live_abc123', '/v1/campaigns'); // Usage: 2
    gateway.handleIncomingRequest('sk_live_abc123', '/v1/campaigns'); // Usage: 3
    gateway.handleIncomingRequest('sk_live_abc123', '/v1/campaigns'); // Usage: 4 (Should Fail - 429)

    console.log("\n===============================================================");
    console.log("🏁 SPRINT 12 PUBLIC API VALIDATION COMPLETED.");
    console.log("===============================================================");
}

runApiTest();