// ⚙️ SPRINT 11: ENTERPRISE UI - ENTERPRISE SETTINGS PORTAL
// Runtime Policy Controls: Coin Rate, Revenue Split, Reserve %, Risk Thresholds (ADR 001)

import React, { useState } from 'react';

export const EnterpriseSettingsWidget = ({ userRole = 'SUPER_ADMIN' }) => {
    // Mock Config State representing runtime Database Rules
    const [configs, setConfigs] = useState({
        coinRate: "100 Coins = $1.00",
        revenueSplit: "70% Platform / 30% User",
        reservePercent: "15%",
        riskThresholdScore: 85,
        withdrawalAutoApprove: false
    });

    const [isSaving, setIsSaving] = useState(false);

    // Strict UI-Level RBAC Check (Only Super Admin can mutate settings)
    const isSuperAdmin = userRole === 'SUPER_ADMIN';

    const handleSave = () => {
        if (!isSuperAdmin) {
            alert("⛔ ACCESS DENIED: Only Super Admin can mutate runtime enterprise settings.");
            return;
        }

        setIsSaving(true);
        // Simulating MFA Re-Authentication & Audit Event Trigger
        setTimeout(() => {
            setIsSaving(false);
            alert("✅ Runtime Configurations updated successfully with Immutable Audit Log Entry.");
        }, 1000);
    };

    return (
        <div className="settings-widget" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#333' }}>⚙️ Enterprise Runtime Settings Portal</h3>
                <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: isSuperAdmin ? '#d4edda' : '#f8d7da', color: isSuperAdmin ? '#155724' : '#721c24' }}>
                    {isSuperAdmin ? '🔓 Edit Access Granted' : '🔒 Read-Only Mode'}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                
                {/* Coin Rate Rule */}
                <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>Coin Exchange Rate</label>
                    <input 
                        type="text" 
                        value={configs.coinRate} 
                        disabled={!isSuperAdmin}
                        onChange={(e) => setConfigs({...configs, coinRate: e.target.value})}
                        style={{ width: '90%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                {/* Revenue Split Rule */}
                <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>Revenue Distribution Split</label>
                    <input 
                        type="text" 
                        value={configs.revenueSplit} 
                        disabled={!isSuperAdmin}
                        onChange={(e) => setConfigs({...configs, revenueSplit: e.target.value})}
                        style={{ width: '90%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                {/* System Reserve % */}
                <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>Liquidity Reserve Percentage</label>
                    <input 
                        type="text" 
                        value={configs.reservePercent} 
                        disabled={!isSuperAdmin}
                        onChange={(e) => setConfigs({...configs, reservePercent: e.target.value})}
                        style={{ width: '90%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                {/* AI Risk Threshold */}
                <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>AI Risk Anomaly Score Threshold</label>
                    <input 
                        type="number" 
                        value={configs.riskThresholdScore} 
                        disabled={!isSuperAdmin}
                        onChange={(e) => setConfigs({...configs, riskThresholdScore: e.target.value})}
                        style={{ width: '90%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

            </div>

            {/* Audit & Action Footer */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: '#666' }}>
                    📝 Requires MFA & Version History Rollback Tracking
                </div>
                {isSuperAdmin && (
                    <button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {isSaving ? 'Updating...' : 'Save & Publish Version'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EnterpriseSettingsWidget;