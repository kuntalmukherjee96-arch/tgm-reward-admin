"use client";
import React, { useState } from 'react';

export default function SupportWorkspace() {
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerDemoMode = () => {
    setLoading(true);
    fetch('/api/demo', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setDemoLoaded(true);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Demo Dataset Button */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Support Workspace & Kanban</h1>
            <p className="text-slate-400 text-sm">Managing conversations, SLA timelines, and secure internal notes.</p>
          </div>
          <button 
            onClick={triggerDemoMode}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] flex items-center space-x-2"
          >
            <span>⚡ Load Demo Dataset Mode</span>
          </button>
        </div>

        {demoLoaded && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 text-sm flex items-center justify-between">
            <span>✨ Demo Mode Active: 50 Users, 200 Transactions, 25 Withdrawals, 10 Tickets, 5 Incidents loaded successfully!</span>
            <span className="font-mono text-xs bg-purple-500/20 px-2 py-1 rounded">SECURE_SANDBOX</span>
          </div>
        )}

        {/* Kanban / Ticket SLA Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Open / New */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white">Open Tickets</h3>
              <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-full font-medium">🔴 BREACHED SLA</span>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800/80 p-4 rounded-lg border-l-4 border-red-500">
                <div className="text-xs font-mono text-slate-400">TKT_901 • USR_12</div>
                <div className="text-sm font-bold text-white mt-1">Payout delay on UPI</div>
                <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                  <span>Timeline: Created</span>
                  <span className="text-red-400 font-semibold">SLA Breached</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white">In Progress</h3>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs rounded-full font-medium">🟡 WARNING SLA</span>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800/80 p-4 rounded-lg border-l-4 border-amber-500">
                <div className="text-xs font-mono text-slate-400">TKT_902 • USR_49</div>
                <div className="text-sm font-bold text-white mt-1">Invite code limit reached</div>
                <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                  <span>Timeline: Assigned</span>
                  <span className="text-amber-400 font-semibold">2h remaining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Closed / Resolved */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white">Resolved</h3>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-medium">🟢 HEALTHY SLA</span>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-800/80 p-4 rounded-lg border-l-4 border-emerald-500">
                <div className="text-xs font-mono text-slate-400">TKT_903 • USR_22</div>
                <div className="text-sm font-bold text-white mt-1">KYC verification status</div>
                <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                  <span>Timeline: Closed</span>
                  <span className="text-emerald-400 font-semibold">On Time</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}