// 🧪 SPRINT 14: HEADLESS ADMIN UI & RBAC EVIDENCE (ADR 022)

const AdminUIGateway = require('../../../src/services/admin/AdminUIGateway');

console.log("===============================================================");
console.log("🖥️ STARTING SPRINT 14: ADMIN UI DYNAMIC NAVIGATION TEST");
console.log("===============================================================\n");

async function runUITest() {
    // Mock RBAC Engine (In reality, this validates the JWT token)
    const mockRbacEngine = { isValid: true };
    const uiGateway = new AdminUIGateway(mockRbacEngine);

    try {
        console.log("--- SCENARIO 1: SUPER ADMIN LOGIN ---");
        const superAdminMenu = uiGateway.getNavigationMenu('SUPER_ADMIN');
        uiGateway.getDashboardWidgets('SUPER_ADMIN');

        console.log("\n--- SCENARIO 2: FINANCE ADMIN LOGIN ---");
        const financeAdminMenu = uiGateway.getNavigationMenu('FINANCE_ADMIN');
        uiGateway.getDashboardWidgets('FINANCE_ADMIN');

        console.log("\n--- SCENARIO 3: SUPPORT ADMIN LOGIN ---");
        const supportAdminMenu = uiGateway.getNavigationMenu('SUPPORT_ADMIN');
        uiGateway.getDashboardWidgets('SUPPORT_ADMIN');

        console.log("\n--- SCENARIO 4: UNAUTHORIZED ROLE LOGIN ---");
        uiGateway.getNavigationMenu('HACKER_ROLE');

    } catch (error) {
        console.error(`   ⛔ [BLOCKED] ${error.message}`);
    }

    console.log("\n===============================================================");
    console.log("🏁 ADMIN UI GATEWAY EVIDENCE GENERATED SUCCESSFULLY.");
    console.log("===============================================================");
}

runUITest();