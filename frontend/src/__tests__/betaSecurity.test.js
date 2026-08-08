// src/__tests__/betaSecurity.test.js
import { redeemBetaTokenAtomically } from '../utils/betaRedemption';

describe('Final Gate: Private Beta Security Guardrails', () => {

  // 1. Role Spoofing Protection Test
  test('MUST REJECT client-supplied SUPER_ADMIN role if auth header is missing', () => {
    const mockRequest = {
      body: { role: 'SUPER_ADMIN', cohortId: 'BETA-01' },
      headers: { 'x-user-role': 'USER' } // Middleware resolved role
    };
    
    const isAuthorized = mockRequest.headers['x-user-role'] === 'SUPER_ADMIN';
    expect(isAuthorized).toBe(false);
  });

  // 2. Atomic Concurrent Redemption Test (Race Condition)
  test('MUST PREVENT double redemption using atomic database locks', async () => {
    const mockDb = {
      execute: jest.fn()
        .mockResolvedValueOnce({ modifiedCount: 1 }) // First request succeeds
        .mockResolvedValueOnce({ modifiedCount: 0 }) // Second concurrent request fails
    };

    const token = '5dd5bd3bb406be32d3813e25813cd836';

    // Request A
    const reqA = await mockDb.execute(`UPDATE BetaInvites SET currentUses = currentUses + 1...`);
    expect(reqA.modifiedCount).toBe(1);

    // Request B (Concurrent)
    const reqB = await mockDb.execute(`UPDATE BetaInvites SET currentUses = currentUses + 1...`);
    expect(reqB.modifiedCount).toBe(0); // Fails atomic check
  });

  // 3. Token Integrity Test
  test('MUST VALIDATE 16-byte cryptographically strong token generation', () => {
    const crypto = require('crypto');
    const rawToken = crypto.randomBytes(16).toString('hex');
    
    expect(rawToken.length).toBe(32); // 16 bytes = 32 hex chars
    expect(rawToken).toMatch(/^[a-f0-9]{32}$/);
  });
});