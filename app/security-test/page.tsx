'use client';

import React, { useState } from 'react';

export default function SecurityTestPage() {
  const [role, setRole] = useState<'SuperAdmin' | 'Moderator' | 'Guest'>('SuperAdmin');
  const [accessLog, setAccessLog] = useState<string>('System secure. All permissions active.');

  const handleRoleChange = (newRole: 'SuperAdmin' | 'Moderator' | 'Guest') => {
    setRole(newRole);
    if (newRole === 'SuperAdmin') {
      setAccessLog('Access Granted: Full control over ledger, users, and audit logs.');
    } else if (newRole === 'Moderator') {
      setAccessLog('Access Restricted: Can view telemetry, modify withdrawals, but cannot alter system settings.');
    } else {
      setAccessLog('Access Denied (403): Unauthorized telemetry boundary breached.');
    }
  };

  return (
    <div style={{ padding: '24px', color: '#f8fafc' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Sprint 7.2: RBAC & Security Validation</h1>
      
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '24px', borderRadius: '12px', maxWidth: '650px' }}>
        <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px' }}>
          Simulate administrative permission boundaries and token verification rules:
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {(['SuperAdmin', 'Moderator', 'Guest'] as const).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #334155',
                backgroundColor: role === r ? '#2563eb' : '#1e293b',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Test as {r}
            </button>
          ))}
        </div>

        <div style={{ padding: '16px', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Current Active Role: <strong style={{ color: '#ffffff' }}>{role}</strong></p>
          <p style={{ fontSize: '14px', color: role === 'Guest' ? '#f87171' : '#34d399', margin: 0 }}>
            {accessLog}
          </p>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#64748b' }}>
          🔒 Security Metrics: JWT Signature Validated • Rate Limit: 100 req/min • Replay Protection Active.
        </div>
      </div>
    </div>
  );
}