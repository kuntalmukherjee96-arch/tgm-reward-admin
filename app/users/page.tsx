'use client';

import React, { useState } from 'react';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  walletBalance: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  accountStatus: 'Active' | 'Suspended';
  joinedDate: string;
}

export default function UsersPage() {
  // Mock Users List mimicking backend database
  const [users, setUsers] = useState<UserProfile[]>([
    { id: 'usr_9921a', username: 'alex_trader', email: 'alex@example.com', walletBalance: '$150.50', kycStatus: 'Verified', accountStatus: 'Active', joinedDate: '2026-01-15' },
    { id: 'usr_8834b', username: 'sarah_crypto', email: 'sarah@example.com', walletBalance: '$45.00', kycStatus: 'Verified', accountStatus: 'Active', joinedDate: '2026-02-10' },
    { id: 'usr_4432c', username: 'john_doe99', email: 'john@example.com', walletBalance: '$0.00', kycStatus: 'Pending', accountStatus: 'Suspended', joinedDate: '2026-03-05' },
    { id: 'usr_7712d', username: 'emma_wagner', email: 'emma@example.com', walletBalance: '$320.10', kycStatus: 'Verified', accountStatus: 'Active', joinedDate: '2026-04-12' },
  ]);

  // Toggle Account Status (Active / Suspended)
  const toggleStatus = (id: string) => {
    setUsers(prev =>
      prev.map(user => {
        if (user.id === id) {
          const newStatus = user.accountStatus === 'Active' ? 'Suspended' : 'Active';
          return { ...user, accountStatus: newStatus };
        }
        return user;
      })
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>User Management</h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>Monitor registered accounts, KYC status, and security controls</p>
        </div>
        <div>
          <span style={{ fontSize: '13px', color: '#60a5fa', backgroundColor: 'rgba(37, 99, 235, 0.1)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
            Total Registered: {users.length} Users
          </span>
        </div>
      </div>

      {/* Users Table */}
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', color: '#94a3b8', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ paddingBottom: '12px' }}>User ID</th>
              <th style={{ paddingBottom: '12px' }}>Username</th>
              <th style={{ paddingBottom: '12px' }}>Email</th>
              <th style={{ paddingBottom: '12px' }}>Wallet Balance</th>
              <th style={{ paddingBottom: '12px' }}>KYC Status</th>
              <th style={{ paddingBottom: '12px' }}>Account Status</th>
              <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Security Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(30, 41, 59, 0.4)' }}>
                <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>{user.id}</td>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '500' }}>{user.username}</td>
                <td style={{ padding: '14px 0' }}>{user.email}</td>
                <td style={{ padding: '14px 0', color: '#ffffff', fontWeight: '600' }}>{user.walletBalance}</td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ 
                    color: user.kycStatus === 'Verified' ? '#34d399' : '#fbbf24', 
                    backgroundColor: user.kycStatus === 'Verified' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(251, 191, 36, 0.1)', 
                    padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' 
                  }}>
                    {user.kycStatus}
                  </span>
                </td>
                <td style={{ padding: '14px 0' }}>
                  <span style={{ 
                    color: user.accountStatus === 'Active' ? '#34d399' : '#f87171', 
                    backgroundColor: user.accountStatus === 'Active' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
                    padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' 
                  }}>
                    {user.accountStatus}
                  </span>
                </td>
                <td style={{ padding: '14px 0', textAlign: 'right' }}>
                  <button 
                    onClick={() => toggleStatus(user.id)}
                    style={{ 
                      padding: '6px 12px', 
                      backgroundColor: user.accountStatus === 'Active' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
                      color: user.accountStatus === 'Active' ? '#f87171' : '#34d399', 
                      border: user.accountStatus === 'Active' ? '1px solid rgba(248, 113, 113, 0.3)' : '1px solid rgba(52, 211, 153, 0.3)', 
                      borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' 
                    }}
                  >
                    {user.accountStatus === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}