// /apps/admin/config/business-rules.ts

/**
 * CORE CONSTITUTION - SPRINT 8 LOCKED
 * These are the fallback business rules. Actual values should be fetched 
 * dynamically from Supabase (economy_versions & platform_settings).
 */

export const BUSINESS_RULES = {
  WITHDRAWAL: {
    MIN_AMOUNT_INR: 200, // Locked as per Mentor's review
    COIN_EQUIVALENT: 20000,
  },
  ECONOMY: {
    POINTS_PER_INR: 100, // 1000 points = ₹10
    CURRENT_VERSION: 'v1.0-sprint8-locked', // For Audit & Ledger tracking
  },
  TREASURY: {
    DEFAULT_PLATFORM_SHARE: 70, // Goes directly to Platform Treasury
    DEFAULT_USER_SHARE: 30,
    // Note: Salaries & Infra costs are NOT hardcoded here. They are expenses calculated later.
  }
};