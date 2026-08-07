"use client";
import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Control Center</h1>
            <p className="text-slate-400 text-sm">Managing Beta Users, Withdrawal Queues, and Localized Payouts.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-xs text-emerald-400 font-mono rounded-lg">
              💱 FX Rate: 1 USD = ₹{data.exchangeRate.rate}
            </div>
            <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium">
              🛡️ Admin Portal Active
            </div>
          </div>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Section 1: Withdrawal Queue (Rule 22 & Multi-Currency) */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Pending Withdrawal Queue (Localized Payouts)</h2>
            <div className="space-y-4">
              {data.withdrawalQueue.map((wdl, idx) => (
                <div key={idx} className="bg-slate-800/60 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{wdl.id} ({wdl.user})</div>
                    <div className="text-xs text-amber-400 mt-1">
                      Request: <span className="text-white font-semibold">{wdl.amountUSD}</span> → Payout: <span className="text-emerald-400 font-semibold">{wdl.amountLocal}</span> via {wdl.method}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{wdl.timestamp}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition-colors">
                      Approve & Settle
                    </button>
                    <button className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Support Tickets */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Support Ticket Queue</h2>
            <div className="space-y-4">
              {data.supportTickets.map((tkt, idx) => (
                <div key={idx} className="bg-slate-800/60 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{tkt.id} — {tkt.subject}</div>
                    <div className="text-xs text-slate-400 mt-1">User: {tkt.user} | Priority: <span className="text-amber-400 font-semibold">{tkt.priority}</span></div>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs rounded-full font-medium">
                    {tkt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 3: User Directory with Local Currency */}
        <div className="mt-8 bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Beta User Directory (Multi-Currency View)</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase">
                <th className="pb-3 font-medium">User ID</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Ledger Balance (USD)</th>
                <th className="pb-3 font-medium">Local Balance (Localized)</th>
                <th className="pb-3 font-medium">Joined Date</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.users.map((usr, idx) => (
                <tr key={idx} className="border-b border-slate-700/10 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-mono text-white">{usr.id}</td>
                  <td className="py-3 text-slate-300">{usr.email}</td>
                  <td className="py-3 font-medium text-slate-400">${usr.balanceUSD.toFixed(2)}</td>
                  <td className="py-3 font-semibold text-emerald-400">{usr.balanceLocal}</td>
                  <td className="py-3 text-slate-400 text-xs">{usr.joined}</td>
                  <td className="py-3 text-right"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded font-medium">{usr.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}