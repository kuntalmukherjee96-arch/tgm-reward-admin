import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617', color: '#f8fafc', display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'sans-serif' }}>
        
        {/* Permanent Sidebar */}
        <aside style={{ width: '260px', backgroundColor: '#0f172a', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ padding: '24px', borderBottom: '1px solid #1e293b' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>CONTROL ROOM</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Enterprise Platform</p>
            </div>
            <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a href="/" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Dashboard</a>
              <a href="/withdrawals" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Withdrawals</a>
              <a href="/users" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Users</a>
              <a href="/ledger" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Wallet & Ledger</a>
              <a href="/providers" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Providers</a>
              <a href="/analytics" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Analytics</a>
              <a href="/settings" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Settings</a>
              <a href="/audit" style={{ padding: '10px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '8px', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: '#60a5fa', textDecoration: 'none' }}>Audit Logs</a>
            </nav>
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid #1e293b', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
            RC v0.1.0 • Secure
          </div>
        </aside>

        {/* Main Wrapper */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          
          {/* Top Navigation */}
          <header style={{ height: '64px', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid #1e293b', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
            <div style={{ fontSize: '14px', color: '#94a3b8' }}>
              Platform Architecture &gt; <span style={{ color: '#ffffff', fontWeight: '600' }}>System Audit Logs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: '#1e293b', padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155' }}>Role: SuperAdmin</span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>
                A
              </div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main style={{ flex: 1, padding: '32px' }}>
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}