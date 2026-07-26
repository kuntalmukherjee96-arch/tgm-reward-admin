'use client';

import React from 'react';

export default function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Analytics Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Business intelligence, revenue trends, and conversion performance</p>
        </div>
        <div>
          <span style={{ fontSize: '13px', color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            Real-time BI Active
          </span>
        </div>
      </div>

      {/* Top Business Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Total Revenue (30d)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>$43,500.00</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+18.4% vs last month</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Daily Active Users (DAU)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>1,420</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+5.4% vs yesterday</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Payout Volume (24h)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>$1,450.00</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Secured via escrow</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Conversion Rate</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>4.8%</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Offerwall to reward conversion</div>
        </div>
      </div>

      {/* Provider Performance Breakdown */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '16px', marginTop: 0 }}>Provider Performance & Revenue Share</h2>
        <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ paddingBottom: '12px' }}>Provider Name</th>
              <th style={{ paddingBottom: '12px' }}>Category</th>
              <th style={{ paddingBottom: '12px' }}>Impressions / Clicks</th>
              <th style={{ paddingBottom: '12px' }}>Generated Revenue</th>
              <th style={{ paddingBottom: '12px' }}>Share %</th>
              <th style={{ paddingBottom: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
              <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '600' }}>Adsgram SDK</td>
              <td style={{ padding: '14px 0' }}>Ad Network</td>
              <td style={{ padding: '14px 0', fontFamily: 'monospace' }}>45,200</td>
              <td style={{ padding: '14px 0', color: '#34d399', fontWeight: '600' }}>$18,200.00</td>
              <td style={{ padding: '14px 0' }}>41.8%</td>
              <td style={{ padding: '14px 0' }}><span style={{ color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>Optimal</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
              <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '600' }}>CPX Offerwall</td>
              <td style={{ padding: '14px 0' }}>Offerwall</td>
              <td style={{ padding: '14px 0', fontFamily: 'monospace' }}>12,450</td>
              <td style={{ padding: '14px 0', color: '#34d399', fontWeight: '600' }}>$15,100.00</td>
              <td style={{ padding: '14px 0' }}>34.7%</td>
              <td style={{ padding: '14px 0' }}><span style={{ color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>High Latency</span></td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
              <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '600' }}>AdMaven</td>
              <td style={{ padding: '14px 0' }}>Ad Network</td>
              <td style={{ padding: '14px 0', fontFamily: 'monospace' }}>28,100</td>
              <td style={{ padding: '14px 0', color: '#34d399', fontWeight: '600' }}>$10,200.00</td>
              <td style={{ padding: '14px 0' }}>23.5%</td>
              <td style={{ padding: '14px 0' }}><span style={{ color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>Optimal</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}