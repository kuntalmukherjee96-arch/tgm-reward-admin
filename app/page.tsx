import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Admin Control Room</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Enterprise Reward Platform • Live Monitoring</p>
        </div>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '500', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <span style={{ width: '8px', height: '8px', marginRight: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
            System Online (RC v0.1.0)
          </span>
        </div>
      </div>

      {/* 8 Rich KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Total Users</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>12,845</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+12.3% this month</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Active Today</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>1,420</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+5.4% vs yesterday</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Revenue Today</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>$1,450.00</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+8.1% target</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Pending Withdrawals</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fbbf24', marginTop: '8px' }}>23</div>
          <div style={{ fontSize: '11px', color: '#fbbf24', marginTop: '4px' }}>Action Required</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Total Paid</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>$84,200.50</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>All-time ledger</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Wallet Liability</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>$4,120.00</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Reserved balances</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Provider Health</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>99.9%</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>All gateways stable</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>API Response Time</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>42ms</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Optimal latency</div>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Payout Table */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '16px', marginTop: 0 }}>Recent Payout Requests</h2>
          <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ paddingBottom: '10px' }}>User ID</th>
                <th style={{ paddingBottom: '10px' }}>Amount</th>
                <th style={{ paddingBottom: '10px' }}>Gateway</th>
                <th style={{ paddingBottom: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
                <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>usr_9921a</td>
                <td style={{ padding: '12px 0', color: '#ffffff', fontWeight: '500' }}>$50.00</td>
                <td style={{ padding: '12px 0' }}>Crypto / USDT</td>
                <td style={{ padding: '12px 0' }}><span style={{ color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>Pending</span></td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#cbd5, 59, 0.4)' }}>usr_8834b</td>
                <td style={{ padding: '12px 0', color: '#ffffff', fontWeight: '500' }}>$25.00</td>
                <td style={{ padding: '12px 0' }}>Bank Transfer</td>
                <td style={{ padding: '12px 0' }}><span style={{ color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>Approved</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Security Box */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '8px', marginTop: 0 }}>Security & RBAC</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.4' }}>
              Strictly bound to frozen OpenAPI contract. No direct frontend database mutations.
            </p>
            <div style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: 'monospace', backgroundColor: '#020617', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b', lineHeight: '1.5' }}>
              <div>AUTH: Bearer JWT (RBAC)</div>
              <div>LEDGER: ACID Compliant</div>
              <div>API_VERSION: v1.0.0</div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '500', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
              Manage Withdrawals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}