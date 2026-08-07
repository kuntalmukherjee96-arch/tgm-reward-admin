"use client";
import React, { useState, useEffect } from 'react';

export default function SuperAdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Rule 24: UI purely fetches and displays. Zero calculation.
  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Top Navigation Bar */}
      <nav className="bg-[#1e293b] border-b border-slate-700/50 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">T</div>
          <span className="text-xl font-bold tracking-tight text-white">
            TINITRI <span className="text-slate-500 font-medium">Enterprise</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-400 font-medium tracking-wide">{data.systemStatus}</span>
          </div>
          <div className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-sm font-medium">
            🛡️ Super Admin
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Command Center</h1>
            <p className="text-slate-400 text-sm">Real-time financial operations and platform telemetry.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Generate Immutable Report
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Treasury Reserve (Live)</h3>
            <div className="text-3xl font-bold text-white tracking-tight">${data.treasuryReserve.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
            <div className="mt-2 text-emerald-400 text-xs font-medium">↑ Synchronized with Core Ledger</div>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Active Beta Users</h3>
            <div className="text-3xl font-bold text-white tracking-tight">{data.activeBetaUsers} / {data.maxBetaUsers}</div>
            <div className="mt-2 text-blue-400 text-xs font-medium">Gatekeeper Cap Enforced</div>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Provider Telemetry</h3>
            <div className="text-3xl font-bold text-white tracking-tight">{data.activeProviders} Active</div>
            <div className="mt-2 text-slate-400 text-xs font-medium">{data.providerName}</div>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Pending Withdrawals</h3>
            <div className="text-3xl font-bold text-white tracking-tight">0{data.pendingWithdrawals}</div>
            <div className="mt-2 text-amber-400 text-xs font-medium">Requires Rule 22 Settlement</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Core Ledger Stream (Zero-Trust)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-medium">Transaction Ref</th>
                    <th className="pb-3 font-medium">Entity</th>
                    <th className="pb-3 font-medium">Event Type</th>
                    <th className="pb-3 font-medium text-right">Value</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.ledgerStream.map((log, idx) => (
                    <tr key={idx} className="border-b border-slate-700/10 hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 font-mono text-slate-400">{log.ref}</td>
                      <td className="py-4 text-white">{log.entity}</td>
                      <td className="py-4"><span className={`px-2 py-1 bg-${log.color}-500/10 text-${log.color}-400 rounded text-xs font-medium`}>{log.type}</span></td>
                      <td className={`py-4 text-right font-medium ${log.value.startsWith('+') ? 'text-emerald-400' : log.value.startsWith('-') ? 'text-amber-400' : 'text-slate-500'}`}>{log.value}</td>
                      <td className="py-4 text-right"><span className={`text-${log.color}-400 text-xs font-medium`}>{log.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Incident Monitor SLA</h2>
            <div className="space-y-4">
              {data.incidents.map((inc, idx) => (
                <div key={idx} className={`p-4 bg-slate-800/50 border-l-4 border-${inc.color}-500 rounded-r-lg shadow-sm`}>
                  <div className="flex gap-3">
                    <div className={`text-${inc.color}-500 mt-0.5 text-lg`}>{inc.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-white">{inc.severity}: {inc.title}</div>
                      <div className="text-xs text-slate-400 mt-1 leading-relaxed">{inc.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}