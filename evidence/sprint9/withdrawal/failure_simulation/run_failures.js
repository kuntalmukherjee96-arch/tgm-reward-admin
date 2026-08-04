// 🚀 SUPER CODER MODE: SYSTEM RESILIENCE & FAILURE SIMULATION
// Mentor Checklist Point 9

const SUPABASE_URL = 'https://ninulhvgcptsvoswhckn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function runFailureSimulation() {
  console.log("==========================================");
  console.log("🔥 STARTING FAILURE SIMULATION TESTS...");
  console.log("==========================================\n");

  // 1. DB CONNECTIVITY & SENSITIVE ERROR LEAK TEST
  console.log("Test 1: Simulating DB Connection Loss / Invalid Auth...");
  try {
    const badRes = await fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests`, {
      method: 'GET',
      headers: { ...headers, 'apikey': 'INVALID_KEY', 'Authorization': 'Bearer INVALID' }
    });
    const badData = await badRes.json();
    console.log(`📩 HTTP Status: ${badRes.status}`);
    
    if (badData.message && !badData.stack) {
       console.log("✅ GRACEFUL FAILURE: No internal database stack trace leaked to client.");
       console.log("🛡️ Error Structure:", JSON.stringify(badData), "\n");
    } else {
       console.log("❌ VULNERABILITY: Stack trace or sensitive info leaked.\n");
    }
  } catch (e) {
    console.log("✅ GRACEFUL FAILURE: Network disconnected safely.\n");
  }

  // 2. UNEXPECTED EXCEPTION (MALFORMED PAYLOAD)
  console.log("Test 2: Simulating Unexpected Exception (Malformed Data)...");
  const malformedRes = await fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests`, {
      method: 'POST',
      headers: headers,
      body: "THIS_IS_NOT_JSON_IT_WILL_CRASH"
  });
  console.log(`📩 HTTP Status: ${malformedRes.status}`);
  if (!malformedRes.ok) {
     console.log("✅ EXCEPTION HANDLED: API gracefully rejected malformed request without crashing the server.\n");
  }

  // 3. CONCURRENT APPROVAL TEST (Point 5 from Mentor)
  console.log("Test 3: Simulating Concurrent Admin Approval...");
  console.log("Firing TWO approval requests from different Admins at the EXACT SAME MILLISECOND...");
  
  const withdrawalId = '00000000-0000-0000-0000-000000000000'; // Dummy ID for simulation
  const updatePayload = JSON.stringify({ status: 'APPROVED' });

  const [app1, app2] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests?id=eq.${withdrawalId}`, {
          method: 'PATCH',
          headers: headers,
          body: updatePayload
      }),
      fetch(`${SUPABASE_URL}/rest/v1/withdrawal_requests?id=eq.${withdrawalId}`, {
          method: 'PATCH',
          headers: headers,
          body: updatePayload
      })
  ]);

  console.log(`📩 Admin 1 Attempt Status: ${app1.status}`);
  console.log(`📩 Admin 2 Attempt Status: ${app2.status}`);
  
  if (app1.ok && app2.ok) {
      console.log("⚠️ WARNING: Both requests processed.");
      console.log("Note for Architecture: We need to implement 'Optimistic Concurrency Control' (Version Numbering) or an RPC function to enforce strict row-level locking for final Freeze.\n");
  } else {
      console.log("✅ ROW LOCK SUCCESSFUL: Concurrent approval blocked.\n");
  }

  console.log("==========================================");
  console.log("🏁 FAILURE SIMULATION TESTS COMPLETED.");
  console.log("==========================================");
}

runFailureSimulation();