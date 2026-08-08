// 📊 SPRINT 11: ENTERPRISE UI - PLATFORM ANALYTICS & REVENUE WIDGET
// Visualizes Command Center (ADR 002) and Revenue Engine (ADR 003) metrics.

import React from 'react';

export const PlatformAnalyticsWidget = ({ userRole = 'FINANCE_ADMIN' }) => {
    // Mock Data simulating real-time telemetry and ledger aggregation
    const metrics = {
        totalRevenue: "$14,500.00",
        activeUsers: 1245,
        pendingWithdrawals: 12,
        systemHealth: "99.98%",
        apiLatency: "45ms"
    };

    // Strict UI-Level RBAC Enforcement (ADR 008)
    const canViewRevenue = ['SUPER_ADMIN', 'FINANCE_ADMIN'].includes(userRole);

    return (
        <div className="analytics-widget" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                📈 Operations Command Center
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
                
                {/* Revenue Metric - RBAC Protected */}
                {canViewRevenue ? (
                    <div style={{ padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', textTransform: 'uppercase' }}>Gross Revenue</div>
                        <div style={{ fontSize: '24px', color: '#1b5e20', fontWeight: 'bold', margin: '5px 0' }}>{metrics.totalRevenue}</div>
                    </div>
                ) : (
                    <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '6px', textAlign: 'center', opacity: 0.6 }}>
                        <div style={{ fontSize: '12px', color: '#757575', fontWeight: 'bold' }}>Gross Revenue</div>
                        <div style={{ fontSize: '14px', color: '#9e9e9e', marginTop: '10px' }}>🔒 Restricted</div>
                    </div>
                )}

                {/* Operations Metrics */}
                <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#1565c0', fontWeight: 'bold', textTransform: 'uppercase' }}>Active Users</div>
                    <div style={{ fontSize: '24px', color: '#0d47a1', fontWeight: 'bold', margin: '5px 0' }}>{metrics.activeUsers}</div>
                </div>

                <div style={{ padding: '15px', backgroundColor: '#fff3e0', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#ef6c00', fontWeight: 'bold', textTransform: 'uppercase' }}>Pending Payouts</div>
                    <div style={{ fontSize: '24px', color: '#e65100', fontWeight: 'bold', margin: '5px 0' }}>{metrics.pendingWithdrawals}</div>
                </div>

                {/* Telemetry/Observability Metrics */}
                <div style={{ padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#7b1fa2', fontWeight: 'bold', textTransform: 'uppercase' }}>System Health</div>
                    <div style={{ fontSize: '24px', color: '#4a148c', fontWeight: 'bold', margin: '5px 0' }}>{metrics.systemHealth}</div>
                    <div style={{ fontSize: '11px', color: '#8e24aa' }}>Latency: {metrics.apiLatency}</div>
                </div>

            </div>
        </div>
    );
};

export default PlatformAnalyticsWidget;