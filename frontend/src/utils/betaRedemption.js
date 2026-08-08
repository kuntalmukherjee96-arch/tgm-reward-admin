// src/utils/betaRedemption.js

/**
 * 🧠 GUARDRAIL 3 & 4: Atomic Redemption to prevent race conditions.
 * Simulating an Atomic DB Transaction: UPDATE WHERE currentUses < maxUses
 */
export async function redeemBetaTokenAtomically(db, rawToken, telegramUserId) {
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  // Simulated SQL-like Atomic Update:
  // UPDATE BetaInvites SET currentUses = currentUses + 1, status = 'REDEEMED' 
  // WHERE tokenHash = ? AND currentUses < maxUses AND status = 'ISSUED' AND expiresAt > NOW()
  
  const result = await db.execute(`
    UPDATE BetaInvites 
    SET currentUses = currentUses + 1, 
        status = CASE WHEN currentUses + 1 >= maxUses THEN 'REDEEMED' ELSE 'ISSUED' END,
        redeemedBy = ?
    WHERE tokenHash = ? 
      AND currentUses < maxUses 
      AND status = 'ISSUED' 
      AND expiresAt > CURRENT_TIMESTAMP
  `, [telegramUserId, tokenHash]);

  if (result.modifiedCount === 0) {
    throw new Error('409 Conflict: Token is invalid, expired, or already redeemed.');
  }

  return true; // Successfully and Atomically Redeemed
}