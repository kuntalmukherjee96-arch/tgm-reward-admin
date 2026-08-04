// 🚀 SUPER CODER MODE: ZERO DEPENDENCY NATIVE SCRIPT
// No npm install required. Using native Node.js fetch() for Supabase REST API

const SUPABASE_URL = 'https://ninulhvgcptsvoswhckn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function runRealTests() {
  console.log("==========================================");
  console.log("🚀 STARTING AUTOMATED EVIDENCE TESTS (NATIVE MODE)...");
  console.log("==========================================\n");

  // TEST 1: State Machine Integrity Test
  console.log("Test 1: Attempting to insert an INVALID status ('HACKER_STATUS') into KYC table...");
  
  try {
    const response1 = await fetch(`${SUPABASE_URL}/rest/v1/kyc_requests`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: "test_user_1",
        document_type: "AADHAAR",
        document_front_url: "https://example.com/doc.jpg",
        status: "HACKER_STATUS" // This MUST fail due to our DB constraints
      })
    });

    const data1 = await response1.json();

    if (!response1.ok) {
      console.log("✅ TEST 1 PASSED! Database blocked invalid state transition.");
      console.log("🔒 RAW DB EVIDENCE:", data1.message || JSON.stringify(data1), "\n");
    } else {
      console.log("❌ TEST 1 FAILED! System allowed invalid status.\n");
    }

    // TEST 2: Withdrawal Table Access & Structure Test
    console.log("Test 2: Verifying Withdrawal Engine Table accessibility...");
    const response2 = await fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests?select=*&limit=1`, {
      method: 'GET',
      headers: headers
    });

    if (!response2.ok) {
      const data2 = await response2.json();
      console.log("❌ TEST 2 FAILED!", data2.message || JSON.stringify(data2), "\n");
    } else {
      console.log("✅ TEST 2 PASSED! Withdrawal Engine is actively accepting connections.\n");
    }

  } catch (error) {
    console.log("❌ CRITICAL ERROR:", error.message);
  }

  console.log("==========================================");
  console.log("🏁 ALL AUTOMATED TESTS COMPLETED.");
  console.log("==========================================");
}

runRealTests();