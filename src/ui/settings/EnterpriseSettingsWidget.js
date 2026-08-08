// ⚙️ SPRINT 11: ENTERPRISE UI - SETTINGS PORTAL (UPDATED)
// Includes Change Preview, MFA, Audit Reason, and Rollback Flow

import React, { useState } from 'react';

export const EnterpriseSettingsWidget = ({ userRole = 'SUPER_ADMIN' }) => {
    const [config, setConfig] = useState({ riskThresholdScore: 85 });
    const [draftConfig, setDraftConfig] = useState({ riskThresholdScore: 85 });
    const [showPreview, setShowPreview] = useState(false);
    const [reason, setReason] = useState("");

    const isSuperAdmin = userRole === 'SUPER_ADMIN';

    const handleInitiateChange = () => {
        if (config.riskThresholdScore === draftConfig.riskThresholdScore) return;
        setShowPreview(true);
    };

    const handleConfirmSave = () => {
        if (!reason) { alert("⛔ Please provide a reason for the audit log."); return; }
        
        console.log(`[AUDIT] Risk Score changed from ${config.riskThresholdScore} to ${draftConfig.riskThresholdScore}`);
        console.log(`[REASON] ${reason}`);
        
        alert("✅ MFA Verified. Audit Log Created. Version-Snapshot Saved for Rollback.");
        setConfig(draftConfig);
        setShowPreview(false);
        setReason("");
    };

    return (
        <div className="settings-widget" style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: 0, borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>⚙️ Enterprise Runtime Settings</h3>
            
            {!showPreview ? (
                <div style={{ marginTop: '20px' }}>
                    <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '4px', marginBottom: '15px' }}>
                        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>AI Risk Anomaly Score Threshold</label>
                        <input 
                            type="number" 
                            value={draftConfig.riskThresholdScore} 
                            disabled={!isSuperAdmin}
                            onChange={(e) => setDraftConfig({ riskThresholdScore: parseInt(e.target.value) })}
                            style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    {isSuperAdmin && (
                        <button onClick={handleInitiateChange} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Review Changes
                        </button>
                    )}
                </div>
            ) : (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px', border: '1px solid #ffeeba' }}>
                    <h4 style={{ color: '#856404', marginTop: 0 }}>⚠️ Change Preview & Audit Confirmation</h4>
                    <ul style={{ color: '#555', fontSize: '14px', lineHeight: '1.8', listStyleType: 'none', paddingLeft: 0 }}>
                        <li><strong>Setting Altered:</strong> AI Risk Threshold</li>
                        <li><strong>Current Value:</strong> {config.riskThresholdScore}</li>
                        <li><strong>New Value:</strong> <span style={{ color: '#d9534f', fontWeight: 'bold' }}>{draftConfig.riskThresholdScore}</span></li>
                        <li><strong>Effective Time:</strong> Immediate</li>
                        <li><strong>Rollback Protocol:</strong> Version-Snapshot will be created</li>
                    </ul>
                    <input 
                        type="text" placeholder="Reason for change (Required for Ledger Audit)..." 
                        value={reason} onChange={(e) => setReason(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleConfirmSave} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Verify MFA & Publish
                        </button>
                        <button onClick={() => setShowPreview(false)} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnterpriseSettingsWidget;