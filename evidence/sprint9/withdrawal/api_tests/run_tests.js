// 🚀 SUPER CODER MODE: ZERO DEPENDENCY NATIVE SCRIPT
// Testing Ledger Immutability (Mentor Checklist Point 4)

const SUPABASE_URL = 'https://ninulhvgcptsvoswhckn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function runLedgerTests() {
  console.log("==========================================");
  console.log("🏦 STARTING LEDGER INTEGRITY TESTS...");
  console.log("==========================================\n");

  try {
    // 1. Insert a test transaction into the ledger
    console.log("Step 1: Inserting a valid transaction into wallet_ledger...");
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/wallet_ledger`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: "test_user_ledger",
        transaction_type: "EARNING",
        credit_amount: 100.00,
        description: "Test earning for immutability check"
      })
    });
    
    const insertData = await insertRes.json();
    const ledgerId = insertData[0]?.id;

    if (ledgerId) {
      console.log("✅ Insert Successful! Ledger ID:", ledgerId, "\n");

      // 2. Attempt to UPDATE the transaction (MUST FAIL)
      console.log("Step 2: Attempting to UPDATE the transaction amount to 500 (Hacking attempt)...");
      const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/wallet_ledger?id=eq.${ledgerId}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ credit_amount: 500.00 })
      });
      const updateData = await updateRes.json();

      if (!updateRes.ok) {
        console.log("✅ UPDATE BLOCKED by Database Trigger!");
        console.log("🔒 RAW DB EVIDENCE:", updateData.message || JSON.stringify(updateData), "\n");
      } else {
        console.log("❌ CRITICAL FAILURE: System allowed ledger update!\n");
      }

      // 3. Attempt to DELETE the transaction (MUST FAIL)
      console.log("Step 3: Attempting to DELETE the transaction to erase traces...");
      const deleteRes = await fetch(`${SUPABASE_URL}/rest/v1/wallet_ledger?id=eq.${ledgerId}`, {
        method: 'DELETE',
        headers: headers
      });
      const deleteData = await deleteRes.json();

      if (!deleteRes.ok) {
        console.log("✅ DELETE BLOCKED by Database Trigger!");
        console.log("🔒 RAW DB EVIDENCE:", deleteData.message || JSON.stringify(deleteData), "\n");
      } else {
        console.log("❌ CRITICAL FAILURE: System allowed ledger deletion!\n");
      }

    } else {
      console.log("❌ Failed to insert test data. Cannot proceed with immutability test.");
    }

  } catch (error) {
    console.log("❌ CRITICAL ERROR:", error.message);
  }

  console.log("==========================================");
  console.log("🏁 LEDGER INTEGRITY TESTS COMPLETED.");
  console.log("==========================================");
}

runLedgerTests();