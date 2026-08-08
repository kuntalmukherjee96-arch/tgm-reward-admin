"use client";
import React, { useState } from 'react';

export default function BetaCohortManagement() {
  const [inviteLink, setInviteLink] = useState('');
  const [stats, setStats] = useState([
    { cohort: 'BETA-01', capacity: 20, invited: 15, redeemed: 11, active: 9, completed: 2, suspended: 0 }
  ]);

  const generateInvite = async () => {
    // Calling our secure API with mock headers for local testing
    const res = await fetch('/api/beta/invite', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-user-role': 'SUPER_ADMIN', // Bypassing Zero-Trust locally for testing
        'x-user-id': 'S_ADMIN_01'
      },
      body: JSON.stringify({ cohortId: 'BETA-01' })
    });
    const data = await res.json();
    if (data.success) {
      setInviteLink(data.deepLink);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Private Beta Cohort Management</h1>
        <p className="text-sm text-slate-400 mb-8">Controlled on-boarding with single-use Telegram deep-links.</p>

        {/* Cohort Stats Table */}
        <div className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden mb-8">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">Cohort</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Invited</th>
                <th className="px-6 py-4 text-amber-400">Redeemed</th>
                <th className="px-6 py-4 text-emerald-400">Active</th>
                <th className="px-6 py-4 text-blue-400">Completed</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {stats.map((row, idx) => (
                <tr key={idx} className="border-t border-slate-700/50">
                  <td className="px-6 py-4 text-white font-bold">{row.cohort}</td>
                  <td className="px-6 py-4">{row.capacity}</td>
                  <td className="px-6 py-4">{row.invited}</td>
                  <td className="px-6 py-4">{row.redeemed}</td>
                  <td className="px-6 py-4">{row.active}</td>
                  <td className="px-6 py-4">{row.completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invite Generator */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col items-start gap-4">
          <h2 className="text-lg font-bold text-white">Issue New Invitation</h2>
          <button 
            onClick={generateInvite}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all"
          >
            Generate Single-Use Deep Link
          </button>
          
          {inviteLink && (
            <div className="mt-4 w-full">
              <p className="text-xs text-slate-400 mb-1">Send this secure link to the beta tester:</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={inviteLink}
                  className="bg-[#0f172a] border border-slate-600 rounded px-4 py-2 w-2/3 text-emerald-400 font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}