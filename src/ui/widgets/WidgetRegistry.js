// 🧩 SPRINT 11: ENTERPRISE UI - DYNAMIC WIDGET REGISTRY
// Maps widget components to RBAC rules and dynamic loading priorities.

import { ErrorBoundary } from '../shared/ErrorBoundary';

// Mock Widget Components for structural setup
const RevenueWidget = () => <div>💰 Real-time Revenue & Analytics</div>;
const SupportKanbanWidget = () => <div>📋 Live Workflow Board</div>;
const SystemHealthWidget = () => <div>📡 Platform Observability Status</div>;

// Registry: Two-Layer Security (UI checks Role before rendering)
export const WIDGET_REGISTRY = {
    'RevenueWidget': {
        component: RevenueWidget,
        minRole: 'FINANCE_ADMIN',
        priority: 2 // Loads second
    },
    'SupportKanbanWidget': {
        component: SupportKanbanWidget,
        minRole: 'OPERATIONS_MANAGER',
        priority: 3 // Loads third
    },
    'SystemHealthWidget': {
        component: SystemHealthWidget,
        minRole: 'OPERATIONS_MANAGER',
        priority: 1 // Loads first (Health check is priority)
    }
};

export const renderWidgetWithRBAC = (widgetKey, userRole) => {
    const widgetConfig = WIDGET_REGISTRY[widgetKey];
    
    if (!widgetConfig) return null;

    // Strict UI-Level RBAC Check
    const allowedRoles = ['SUPER_ADMIN', widgetConfig.minRole];
    if (!allowedRoles.includes(userRole)) {
        console.warn(`⛔ Access Denied: Role [${userRole}] cannot view [${widgetKey}]`);
        return null; // Component is physically hidden from DOM
    }

    const WidgetComponent = widgetConfig.component;

    // Wrapped in Error Boundary for Crash Protection
    return (
        <ErrorBoundary key={widgetKey}>
            <div className="widget-container">
                <WidgetComponent />
            </div>
        </ErrorBoundary>
    );
};