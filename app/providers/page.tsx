'use client';

import React, { useState } from 'react';

interface Provider {
  id: string;
  name: string;
  type: string;
  status: 'Healthy' | 'Warning' | 'Critical' | 'Offline';
  responseTime: string;
  successRate: string;
  lastCall: string;
  lastError: string;
  version: string;
  environment: 'Production' | 'Mock';
}

export default function ProvidersPage() {
  // Mock Provider Health Data mimicking infrastructure telemetry
  const [providers] = useState<Provider[]>([
    { id: 'p_01', name: 'Adsgram SDK', type: 'Ad Network', status: 'Healthy', responseTime: '148ms', successRate: '99.8%', lastCall: '12 secs ago', lastError: 'None', version: 'v2.4.1', environment: 'Production' },
    { id: 'p_02', name: 'AdMaven', type: 'Ad Network', status: 'Healthy', responseTime: '210ms', successRate: '99.1%', lastCall: '25 secs ago', lastError: 'None', version: 'v1.8.0', environment: 'Production' },
    { id: 'p_03', name: 'CPX Offerwall', type: 'Offerwall', status: 'Warning', responseTime: '850ms', successRate: '94.2%', lastCall: '1 min ago', lastError: 'Gateway Timeout (504)', version: 'v3.0.2', environment: 'Production' },
    { id: 'p_04', name: 'Crypto / USDT Gateway', type: 'Payout', status: 'Healthy', responseTime: '320ms', successRate: '100%', lastCall: '45 secs ago', lastError: 'None', version: 'v1.1.0', environment: 'Production' },
    { id: 'p_05', name: 'PayPal Payouts API', type: 'Payout', status: 'Offline', responseTime: '-', successRate: '0.0%', lastCall: '15 mins ago', lastError: 'Connection Refused', version: 'v2.0.0', environment: 'Mock' },
  ]);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Provider Monitoring</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Real-time infrastructure telemetry, health checks, and gateway status</p>
        </div>
        <div>
          <span style={{ fontSize: '13px', color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            Telemetry: Read-Only Active
          </span>
        </div>
      </div>

      {/* Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Total Providers</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>5 Active</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>4 Operational, 1 Offline</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Avg Response Time</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>382 ms</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Within optimal threshold</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Overall Success Rate</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>98.3%</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Last 24 hours average</div>
        </div>
      </div>

      {/* Provider Status Table */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '16px', marginTop: 0 }}>External Gateway Health</h2>
        <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ paddingBottom: '12px' }}>Provider Name</th>
              <th style={{ paddingBottom: '12px' }}>Type</th>
              <th style={{ paddingBottom: '12px' }}>Status</th>
              <th style={{ paddingBottom: '12px' }}>Response Time</th>
              <th style={{ paddingBottom: '12px' }}>Success Rate</th>
              <th style={{ paddingBottom: '12px' }}>Last Call</th>
              <th style={{ paddingBottom: '12px' }}>Last Error</th>
              <th style={{ paddingBottom: '12px' }}>Version</th>
              <th style={{ paddingBottom: '12px' }}>Env</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((prov) => (
              <tr key={prov.id} style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '600' }}>{prov.name}</td>
                <td style={{ padding: '14px 0' }}>{prov.type}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ 
                    color: prov.status === 'Healthy' ? '#34d399' : prov.status === 'Warning' ? '#fbbf24' : '#f87171', 
                    backgroundColor: prov.status === 'Healthy' ? 'rgba(52, 211, 153, 0.1)' : prov.status === 'Warning' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
                    padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' 
                  }}>
                    {prov.status}
                  </span>
                </td>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>{prov.responseTime}</td>
                <td style={{ padding: '14px 0', color: '#ffffff' }}>{prov.successRate}</td>
                <td style={{ padding: '14px 0' }}>{prov.lastCall}</td>
                <td style={{ padding: '14px 0', color: prov.lastError === 'None' ? '#64748b' : '#f87171' }}>{prov.lastError}</td>
                <td style={{ padding: '14px 0', fontFamily: 'monospace' }}>{prov.version}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', backgroundColor: '#020617', padding: '2px 6px', borderRadius: '4px', border: '1px solid #1e293b' }}>
                    {prov.environment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Timeline */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '16px', marginTop: 0 }}>Recent Provider Telemetry Events</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#020617', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div><span style={{ color: '#34d399', fontWeight: 'bold', marginRight: '8px' }}>10:49</span> Payout Provider Healthy (Crypto / USDT)</div>
            <span style={{ color: '#64748b', fontSize: '11px' }}>System Info</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#020617', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div><span style={{ color: '#34d399', fontWeight: 'bold', marginRight: '8px' }}>10:46</span> Recovered: CPX Offerwall latency normalized</div>
            <span style={{ color: '#34d399', fontSize: '11px' }}>Resolved</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#020617', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div><span style={{ color: '#fbbf24', fontWeight: 'bold', marginRight: '8px' }}>10:45</span> Offerwall Timeout warning triggered (504 Gateway)</div>
            <span style={{ color: '#fbbf24', fontSize: '11px' }}>Warning</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#020617', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div><span style={{ color: '#34d399', fontWeight: 'bold', marginRight: '8px' }}>10:42</span> Adsgram SDK Connected Successfully</div>
            <span style={{ color: '#64748b', fontSize: '11px' }}>Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
}