'use client';

import React, { useState } from 'react';

interface AuditLog {
  id: string;
  adminUser: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  severity: 'Info' | 'Warning' | 'Critical';
}

export default function AuditLogsPage() {
  // Mock Enterprise Audit Trail mimicking immutable backend logs
  const [logs] = useState<AuditLog[]>([
    { id: 'log_901', adminUser: 'superadmin_alex', action: 'SUSPEND_USER', target: 'usr_4432c (john_doe99)', ipAddress: '192.168.1.45', timestamp: '2026-07-25 03:12:45', severity: 'Warning' },
    { id: 'log_902', adminUser: 'finance_sarah', action: 'APPROVE_WITHDRAWAL', target: 'wd_8821 (USDT $250)', ipAddress: '192.168.1.88', timestamp: '2026-07-25 02:50:12', severity: 'Info' },
    { id: 'log_903', adminUser: 'security_bot', action: 'IP_WHITELIST_UPDATE', target: 'Added VPN Gateway IP', ipAddress: '10.0.0.15', timestamp: '2026-07-25 01:15:30', severity: 'Info' },
    { id: 'log_904', adminUser: 'superadmin_alex', action: 'TOGGLE_MAINTENANCE', target: 'Maintenance Mode: OFF', ipAddress: '192.168.1.45', timestamp: '2026-07-24 22:05:00', severity: 'Critical' },
    { id: 'log_905', adminUser: 'support_lead', action: 'KYC_OVERRIDE', target: 'usr_8834b (sarah_crypto)', ipAddress: '192.168.1.102', timestamp: '2026-07-24 19:40:15', severity: 'Warning' },
  ]);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>System Audit Logs</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Immutable administrative telemetry, security actions, and compliance trail</p>
        </div>
        <div>
          <span style={{ fontSize: '13px', color: '#60a5fa', backgroundColor: 'rgba(37, 99, 235, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
            Compliance: SOC2 Mode Active
          </span>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ paddingBottom: '12px' }}>Log ID</th>
              <th style={{ paddingBottom: '12px' }}>Admin User</th>
              <th style={{ paddingBottom: '12px' }}>Action Executed</th>
              <th style={{ paddingBottom: '12px' }}>Target Resource</th>
              <th style={{ paddingBottom: '12px' }}>IP Address</th>
              <th style={{ paddingBottom: '12px' }}>Timestamp</th>
              <th style={{ paddingBottom: '12px' }}>Severity</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>{log.id}</td>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '500' }}>{log.adminUser}</td>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#60a5fa' }}>{log.action}</td>
                <td style={{ padding: '14px 0', color: '#cbd5e1' }}>{log.target}</td>
                <td style={{ padding: '14px 0', fontFamily: 'monospace' }}>{log.ipAddress}</td>
                <td style={{ padding: '14px 0', fontSize: '12px' }}>{log.timestamp}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ 
                    color: log.severity === 'Info' ? '#34d399' : log.severity === 'Warning' ? '#fbbf24' : '#f87171', 
                    backgroundColor: log.severity === 'Info' ? 'rgba(52, 211, 153, 0.1)' : log.severity === 'Warning' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
                    padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' 
                  }}>
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}