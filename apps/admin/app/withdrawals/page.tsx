'use client';

import React, { useState } from 'react';

// Withdrawal Item Interface
interface Withdrawal {
  id: string;
  userId: string;
  amount: string;
  gateway: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedTime: string;
  riskScore: string;
}

export default function WithdrawalsPage() {
  // Initial Mock Data mimicking backend contract
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    { id: 'w_001', userId: 'usr_9921a', amount: '$50.00', gateway: 'Crypto / USDT', status: 'Pending', requestedTime: '10 mins ago', riskScore: 'Low (1.2)' },
    { id: 'w_002', userId: 'usr_4432b', amount: '$120.00', gateway: 'Bank Transfer', status: 'Pending', requestedTime: '25 mins ago', riskScore: 'Medium (3.8)' },
    { id: 'w_003', userId: 'usr_8834c', amount: '$25.00', gateway: 'PayPal', status: 'Pending', requestedTime: '1 hour ago', riskScore: 'Low (0.9)' },
  ]);

  // Modal State Management
  const [selectedItem, setSelectedItem] = useState<Withdrawal | null>(null);
  const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);
  const [rejectReason, setRejectReason] = useState('Fraud');

  // Open Confirmation Modal
  const handleActionClick = (item: Withdrawal, type: 'approve' | 'reject') => {
    setSelectedItem(item);
    setModalType(type);
  };

  // Confirm Action (Approve / Reject)
  const handleConfirmAction = () => {
    if (!selectedItem) return;

    setWithdrawals(prev => 
      prev.map(item => {
        if (item.id === selectedItem.id) {
          return { ...item, status: modalType === 'approve' ? 'Approved' : 'Rejected' };
        }
        return item;
      })
    );

    // Close modal
    setSelectedItem(null);
    setModalType(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Withdrawal Management</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Review and securely process user payout requests</p>
        </div>
        <div>
          <span style={{ fontSize: '13px', color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
            Pending Queue: {withdrawals.filter(w => w.status === 'Pending').length} Requests
          </span>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ paddingBottom: '12px' }}>Request ID</th>
              <th style={{ paddingBottom: '12px' }}>User</th>
              <th style={{ paddingBottom: '12px' }}>Amount</th>
              <th style={{ paddingBottom: '12px' }}>Gateway</th>
              <th style={{ paddingBottom: '12px' }}>Requested Time</th>
              <th style={{ paddingBottom: '12px' }}>Risk Score</th>
              <th style={{ paddingBottom: '12px' }}>Status</th>
              <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>{item.id}</td>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '500' }}>{item.userId}</td>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '600' }}>{item.amount}</td>
                <td style={{ padding: '14px 0' }}>{item.gateway}</td>
                <td style={{ padding: '14px 0' }}>{item.requestedTime}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ color: item.riskScore.includes('Medium') ? '#fbbf24' : '#34d399' }}>{item.riskScore}</span>
                </td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ 
                    color: item.status === 'Pending' ? '#fbbf24' : item.status === 'Approved' ? '#34d399' : '#f87171', 
                    backgroundColor: item.status === 'Pending' ? 'rgba(251, 191, 36, 0.1)' : item.status === 'Approved' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
                    padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' 
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '14px 0', textAlign: 'right' }}>
                  {item.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleActionClick(item, 'approve')}
                        style={{ padding: '6px 12px', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleActionClick(item, 'reject')}
                        style={{ padding: '6px 12px', backgroundColor: 'rgba(248, 113, 113, 0.1)', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal (Mentors Architecture Requirement) */}
      {selectedItem && modalType && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2, 6, 23, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', width: '420px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginTop: 0, marginBottom: '12px' }}>
              {modalType === 'approve' ? 'Approve Withdrawal?' : 'Reject Withdrawal Request?'}
            </h3>
            
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: '1.5' }}>
              {modalType === 'approve' 
                ? 'This action will trigger the ledger payout workflow and lock balances according to backend rules.' 
                : 'Please select a valid rejection reason for audit compliance and ledger integrity.'}
            </p>

            {/* Request Summary Box */}
            <div style={{ backgroundColor: '#020617', padding: '12px 16px', borderRadius: '8px', border: '1px solid #1e293b', marginBottom: '20px', fontSize: '13px', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Request ID:</span>
                <span style={{ fontFamily: 'monospace' }}>{selectedItem.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>User:</span>
                <span>{selectedItem.userId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b' }}>Amount:</span>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>{selectedItem.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Gateway:</span>
                <span>{selectedItem.gateway}</span>
              </div>
            </div>

            {/* Rejection Reason Dropdown (If Reject) */}
            {modalType === 'reject' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Rejection Reason</label>
                <select 
                  value={rejectReason} 
                  onChange={(e) => setRejectReason(e.target.value)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#020617', color: '#ffffff', border: '1px solid #334155', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                >
                  <option value="Fraud">Fraud</option>
                  <option value="Duplicate">Duplicate Request</option>
                  <option value="Invalid Wallet">Invalid Wallet Address</option>
                  <option value="Manual Review">Manual Review Required</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => { setSelectedItem(null); setModalType(null); }}
                style={{ padding: '10px 16px', backgroundColor: '#1e293b', color: '#cbd5e1', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAction}
                style={{ padding: '10px 16px', backgroundColor: modalType === 'approve' ? '#10b981' : '#ef4444', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}
              >
                {modalType === 'approve' ? 'Confirm Approve' : 'Confirm Reject'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}