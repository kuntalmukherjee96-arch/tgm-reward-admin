"use client";
import React, { useState, useEffect } from 'react';

export default function FinanceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/finance')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Finance & Treasury Command</h1>
            <p className="text-slate-400 text-sm">Real-time ledger settlement, reserve monitoring, and Rule 22 audit trails.</p>
          </div>
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium">
            💰 {data.reserveHealth}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Treasury Reserve (USD)</h3>
            <div className="text-3xl font-bold text-white tracking-tight">${data.treasuryReserveUSD.toLocaleString()}</div>
            <div className="mt-2 text-emerald-400 text-xs font-medium">Local: {data.treasuryReserveINR}</div>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Settled Today (Rule 22)</h3>
            <div className="text-3xl font-bold text-emerald-400 tracking-tight">${data.totalSettledTodayUSD.toFixed(2)}</div>
            <div className="mt-2 text-slate-400 text-xs font-medium">Immutable Evidence Attached</div>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Pending Payout Liability</h3>
            <div className="text-3xl font-bold text-amber-400 tracking-tight">${data.pendingPayoutsUSD.toFixed(2)}</div>
            <div className="mt-2 text-amber-400 text-xs font-medium">Awaiting Admin Approval</div>
          </div>
        </div>

        {/* Audit Trail Section */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Rule 22 Settlement Audit Trail (Immutable)</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase">
                <th className="pb-3 font-medium">Ledger Reference</th>
                <th className="pb-3 font-medium">Provider Ref</th>
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">Operator</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.ledgerAuditTrail.map((audit, idx) => (
                <tr key={idx} className="border-b border-slate-700/10 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-mono text-white text-xs">{audit.ref}</td>
                  <td className="py-3 font-mono text-slate-400 text-xs">{audit.providerRef}</td>
                  <td className="py-3 text-slate-400 text-xs">{audit.timestamp}</td>
                  <td className="py-3 text-slate-300 text-xs">{audit.operator}</td>
                  <td className="py-3 font-medium text-emerald-400">{audit.amount}</td>
                  <td className="py-3 text-right"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded font-medium">{audit.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}