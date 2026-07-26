'use client';

import React, { useState } from 'react';

interface LedgerEntry {
  id: string;
  timestamp: string;
  type: 'CREDIT' | 'DEBIT';
  source: string;
  amount: string;
  runningBalance: string;
  status: 'Completed' | 'Locked' | 'Pending';
}

export default function LedgerPage() {
  // Immutable Ledger Timeline mimicking backend ACID ledger state
  const [ledgerEntries] = useState<LedgerEntry[]>([
    { id: 'tx_901a', timestamp: '2026-07-25 02:15', type: 'DEBIT', source: 'Withdrawal (Crypto/USDT)', amount: '-$50.00', runningBalance: '$4120.00', status: 'Completed' },
    { id: 'tx_900b', timestamp: '2026-07-24 18:30', type: 'CREDIT', source: 'Offerwall Reward (CPX)', amount: '+$30.00', runningBalance: '$4170.00', status: 'Completed' },
    { id: 'tx_899c', timestamp: '2026-07-24 14:10', type: 'CREDIT', source: 'Referral Bonus (usr_8834b)', amount: '+$10.00', runningBalance: '$4140.00', status: 'Completed' },
    { id: 'tx_898d', timestamp: '2026-07-23 22:00', type: 'DEBIT', source: 'Withdrawal (Bank Transfer)', amount: '-$20.00', runningBalance: '$4130.00', status: 'Completed' },
    { id: 'tx_897e', timestamp: '2026-07-23 09:45', type: 'CREDIT', source: 'Daily Ads Reward', amount: '+$50.00', runningBalance: '$4150.00', status: 'Completed' },
  ]);

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Wallet & Ledger Viewer</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Immutable transaction timeline & system liability monitoring</p>
        </div>
        <div>
          <span style={{ fontSize: '13px', color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
            Ledger Status: ACID Synchronized
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Total Platform Liability</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>$4,120.00</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Secured in escrow reserves</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>24h Net Flow</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#34d399', marginTop: '8px' }}>+$1,450.00</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Inflows exceed outflows</div>
        </div>
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Ledger Integrity</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginTop: '8px' }}>100% Verified</div>
          <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Zero discrepancy detected</div>
        </div>
      </div>

      {/* Immutable Timeline Table */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', marginBottom: '16px', marginTop: 0 }}>Immutable Transaction Timeline</h2>
        <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ paddingBottom: '12px' }}>Tx ID</th>
              <th style={{ paddingBottom: '12px' }}>Timestamp (UTC)</th>
              <th style={{ paddingBottom: '12px' }}>Type</th>
              <th style={{ paddingBottom: '12px' }}>Source / Description</th>
              <th style={{ paddingBottom: '12px' }}>Amount</th>
              <th style={{ paddingBottom: '12px' }}>Running Balance</th>
              <th style={{ paddingBottom: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {ledgerEntries.map((entry) => (
              <tr key={entry.id} style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>{entry.id}</td>
                <td style={{ padding: '14px 0' }}>{entry.timestamp}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ 
                    color: entry.type === 'CREDIT' ? '#34d399' : '#f87171', 
                    fontWeight: '600', fontSize: '11px' 
                  }}>
                    {entry.type}
                  </span>
                </td>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '500' }}>{entry.source}</td>
                <td style={{ padding: '14px 0', color: entry.type === 'CREDIT' ? '#34d399' : '#f87171', fontWeight: '600' }}>{entry.amount}</td>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#ffffff' }}>{entry.runningBalance}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' }}>
                    {entry.status}
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