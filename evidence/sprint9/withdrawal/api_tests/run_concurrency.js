// 🚀 SUPER CODER MODE: CONCURRENCY & DOUBLE SETTLEMENT PREVENTION TEST
// Mentor Checklist Point 5

const SUPABASE_URL = 'https://ninulhvgcptsvoswhckn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function runConcurrencyTest() {
  console.log("==========================================");
  console.log("⚡ STARTING CONCURRENCY (DOUBLE SETTLEMENT) TEST...");
  console.log("==========================================\n");

  const withdrawalPayload = {
    user_id: "concurrent_user_1",
    amount_inr: 1000.00,
    coin_equivalent: 10000,
    status: 'PENDING_POLICY_CHECK'
  };

  console.log("Step 1: Firing TWO identical withdrawal requests at the EXACT SAME MILLISECOND...\n");

  try {
    // Promise.all ensures both requests hit the server simultaneously
    const [req1, req2] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(withdrawalPayload)
      }),
      fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(withdrawalPayload)
      })
    ]);

    const res1 = await req1.json();
    const res2 = await req2.json();

    console.log("📩 Request 1 Status:", req1.status, req1.ok ? "SUCCESS" : "FAILED");
    console.log("📩 Request 2 Status:", req2.status, req2.ok ? "SUCCESS" : "FAILED", "\n");

    // Ideally, our DB should have a unique index on user_id + status='PENDING' to block this.
    // If both pass, it means we have a vulnerability that we need to fix immediately!
    if (req1.ok && req2.ok) {
      console.log("❌ CRITICAL VULNERABILITY DETECTED! System allowed Double Settlement.");
      console.log("Both requests were inserted successfully. We need to add a UNIQUE CONSTRAINT on Pending requests!\n");
    } else {
      console.log("✅ CONCURRENCY TEST PASSED! System successfully blocked the duplicate request.");
    }

  } catch (error) {
    console.log("❌ ERROR:", error.message);
  }

  console.log("==========================================");
  console.log("🏁 CONCURRENCY TEST COMPLETED.");
  console.log("==========================================");
}

runConcurrencyTest();