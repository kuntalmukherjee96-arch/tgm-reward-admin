// 🚀 SUPER CODER MODE: DORMANT DEPOSIT INFRASTRUCTURE
// Mentor Checklist: Phase D (Idempotency, Risk Score, Feature Flag, Adapters)

console.log("==========================================");
console.log("💰 STARTING DEPOSIT WORKFLOW TEST (DORMANT MODE)...");
console.log("==========================================\n");

// 1. Feature Flag Check
const systemFeatureFlags = { deposit_enabled: false };

console.log("🛡️ Step 1: Checking Feature Flags...");
if (!systemFeatureFlags.deposit_enabled) {
    console.log("🔒 FEATURE FLAG 'deposit_enabled' is OFF. Running strictly in DORMANT mode.\n");
}

// 2. Base Provider Adapter Interface
class PaymentProviderAdapter {
    constructor(name) { this.name = name; }
    async initiatePayment(payload) {
        console.log(`[${this.name} ADAPTER] Initiating transaction of ${payload.amount} ${payload.currency}`);
        return { success: true, providerRef: `txn_${Date.now()}` };
    }
}
const upiAdapter = new PaymentProviderAdapter('UPI_RAZORPAY');

// 3. Deposit Core Logic & Idempotency Check
class DepositWorkflow {
    constructor() {
        this.processedKeys = new Set(); // Simulating Database UNIQUE constraint
    }

    async processRequest(payload) {
        console.log(`\n📥 Received Deposit Request from User: ${payload.userId}`);
        console.log(`🔑 Idempotency Key: ${payload.idempotencyKey}`);

        // A. Idempotency (Duplicate Detection)
        if (this.processedKeys.has(payload.idempotencyKey)) {
            console.log("❌ REJECTED: Duplicate Request Detected! Idempotency key already exists.");
            return;
        }
        this.processedKeys.add(payload.idempotencyKey);
        console.log("✅ Idempotency check passed.");

        // B. Risk Scoring
        console.log(`🔍 Calculating Risk Score...`);
        const riskScore = Math.floor(Math.random() * 100);
        console.log(`📊 Risk Score: ${riskScore}/100`);

        if (riskScore > 75) {
            console.log("⚠️ HIGH RISK DETECTED! Route to Admin Review Queue (Fallback).");
            console.log("📝 State changed to: PENDING_ADMIN_REVIEW");
            return;
        }

        // C. Pass to Provider Adapter
        const result = await upiAdapter.initiatePayment(payload);
        if (result.success) {
            console.log(`✅ Payment Initiated Successfully. Provider Ref: ${result.providerRef}`);
            console.log("📝 State changed to: DORMANT_PENDING (Awaiting Webhook)");
        }
    }
}

async function runTest() {
    const depositEngine = new DepositWorkflow();

    const requestPayload = {
        userId: "user_finance_99",
        amount: 5000.00,
        currency: "INR",
        provider: "UPI",
        idempotencyKey: "idem_req_555_abc"
    };

    // Attempt 1: First valid request
    await depositEngine.processRequest(requestPayload);

    // Attempt 2: Malicious duplicate request exactly 10ms later
    console.log("\n⚡ Simulating malicious duplicate submission 10ms later...");
    await depositEngine.processRequest(requestPayload);

    console.log("\n==========================================");
    console.log("🏁 DEPOSIT INFRASTRUCTURE TEST COMPLETED.");
    console.log("==========================================");
}

runTest();