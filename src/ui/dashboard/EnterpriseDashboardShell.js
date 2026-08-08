// 🖥️ SPRINT 11: ENTERPRISE UI - DASHBOARD SHELL (UPDATED)
// Includes Alert Layer & Widget Health Indicators

import React, { useState, useEffect } from 'react';
import { renderWidgetWithRBAC, WIDGET_REGISTRY } from '../widgets/WidgetRegistry';

export const EnterpriseDashboardShell = ({ userRole = 'SUPER_ADMIN' }) => {
    const [loadedWidgets, setLoadedWidgets] = useState([]);
    
    // Mentor's Requested Alert Layer (Rule 4)
    const activeAlerts = [
        { id: 1, level: 'CRITICAL', msg: 'High Withdrawal Queue detected (>50 pending).' },
        { id: 2, level: 'WARNING', msg: 'SMS Provider API latency is high.' }
    ];

    useEffect(() => {
        const loadWidgetsProgressively = async () => {
            const sortedKeys = Object.keys(WIDGET_REGISTRY).sort(
                (a, b) => WIDGET_REGISTRY[a].priority - WIDGET_REGISTRY[b].priority
            );
            for (const key of sortedKeys) {
                await new Promise(resolve => setTimeout(resolve, 200)); 
                setLoadedWidgets(prev => [...prev, key]);
            }
        };
        loadWidgetsProgressively();
    }, []);

    return (
        <div className="enterprise-dashboard-layout" style={{ padding: '20px', fontFamily: 'system-ui' }}>
            
            {/* ALERT LAYER */}
            {activeAlerts.length > 0 && (
                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeAlerts.map(alert => (
                        <div key={alert.id} style={{
                            padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold',
                            backgroundColor: alert.level === 'CRITICAL' ? '#f8d7da' : '#fff3cd',
                            color: alert.level === 'CRITICAL' ? '#721c24' : '#856404',
                            border: `1px solid ${alert.level === 'CRITICAL' ? '#f5c6cb' : '#ffeeba'}`
                        }}>
                            🚨 {alert.level}: {alert.msg}
                        </div>
                    ))}
                </div>
            )}

            <header style={{ borderBottom: '2px solid #ccc', marginBottom: '20px', paddingBottom: '10px' }}>
                <h2>🏛️ Enterprise Command Center</h2>
                <span className="badge">Operator Role: {userRole}</span>
            </header>
            
            <div className="dashboard-grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {loadedWidgets.length === 0 ? (
                    <p>⏳ Booting up Core Modules...</p>
                ) : (
                    loadedWidgets.map(widgetKey => (
                        <div key={widgetKey} style={{ position: 'relative' }}>
                            {/* WIDGET HEALTH INDICATOR */}
                            <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px', zIndex: 10, background: 'rgba(255,255,255,0.9)', padding: '2px 6px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                🟢 Live
                            </div>
                            {renderWidgetWithRBAC(widgetKey, userRole)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};