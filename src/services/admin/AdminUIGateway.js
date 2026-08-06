// 🖥️ SPRINT 14 PHASE 1: COMPLETE ADMIN EXPERIENCE
// ADR 022: Headless Admin UI & Dynamic Role-Based Navigation

class AdminUIGateway {
    constructor(rbacEngine) {
        this.rbacEngine = rbacEngine; // Rule 5: Strict RBAC (Mocked for Gateway)
    }

    // 1. Dynamic Navigation Engine (Rule 15 & Rule 23)
    getNavigationMenu(adminRole) {
        console.log(`\n[UI GATEWAY] 🧭 Generating Navigation for Role: [${adminRole}]`);
        
        // Every admin gets a dashboard
        const baseMenu = [{ id: 'dashboard', label: 'Dashboard', route: '/admin/dashboard' }];
        let roleMenu = [];

        switch (adminRole) {
            case 'SUPER_ADMIN':
                roleMenu = [
                    { id: 'provider_management', label: 'Provider Center', route: '/admin/providers' },
                    { id: 'finance_overview', label: 'Treasury & Finance', route: '/admin/finance' },
                    { id: 'ops_console', label: 'Operations Console', route: '/admin/operations' },
                    { id: 'user_management', label: 'User Management', route: '/admin/users' }
                ];
                break;
            case 'FINANCE_ADMIN':
                roleMenu = [
                    { id: 'finance_queue', label: 'Withdrawal Queue', route: '/admin/finance/queue' },
                    { id: 'treasury_settlement', label: 'Treasury Settlement', route: '/admin/finance/treasury' }
                ];
                break;
            case 'SUPPORT_ADMIN':
                roleMenu = [
                    { id: 'support_tickets', label: 'Support Tickets', route: '/admin/support/tickets' },
                    { id: 'live_chat', label: 'Live Chat', route: '/admin/support/chat' }
                ];
                break;
            default:
                throw new Error("403_FORBIDDEN: Unknown or unauthorized Admin Role.");
        }

        const finalMenu = [...baseMenu, ...roleMenu];
        console.log(`   ✅ Success! Delivered ${finalMenu.length} secure menu items.`);
        return finalMenu;
    }

    // 2. Widget Orchestration
    getDashboardWidgets(adminRole) {
        console.log(`\n[UI GATEWAY] 📊 Fetching Allowed Widgets for Role: [${adminRole}]`);
        
        let widgets = [];
        if (adminRole === 'SUPER_ADMIN') {
            widgets = ['LIVE_REVENUE', 'SYSTEM_HEALTH', 'ACTIVE_USERS'];
        } else if (adminRole === 'FINANCE_ADMIN') {
            widgets = ['PENDING_WITHDRAWALS', 'RESERVE_BALANCE'];
        } else if (adminRole === 'SUPPORT_ADMIN') {
            widgets = ['OPEN_TICKETS', 'AVG_RESPONSE_TIME'];
        }
        
        console.log(`   ✅ Authorized Widgets: [${widgets.join(', ')}]`);
        return widgets;
    }
}

module.exports = AdminUIGateway;