"use client";
import React, { useState, useEffect } from 'react';

export default function WorkforceCommandCenter() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workforce')
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

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Lineage Evidence */}
        <div className="flex justify-between items-end mb-8 border-b border-slate-700/50 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Workforce Operations Intelligence</h1>
            <div className="flex space-x-3 text-xs font-mono">
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-400">
                Evt Schema: {data.metadata.lineage.eventSchemaVersion}
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-blue-400">
                Calc Version: {data.metadata.lineage.calculationVersion}
              </span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-purple-400">
                Cfg Snapshot: {data.metadata.lineage.configSnapshotId}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-slate-400">Global RBAC Scope Active</div>
            <div className="text-xs text-slate-500 mt-1">Data Lag: {data.metadata.freshness.lagSeconds}s (Server Auth)</div>
          </div>
        </div>

        {/* Global Presence Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700">
            <div className="text-xs text-slate-400 mb-1">Total Agents</div>
            <div className="text-2xl font-bold text-white">{data.globalHealth.totalAgents}</div>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30">
            <div className="text-xs text-blue-400 mb-1">Online (Valid Session)</div>
            <div className="text-2xl font-bold text-blue-400">{data.globalHealth.presence.online}</div>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30">
            <div className="text-xs text-emerald-400 mb-1">Active Working</div>
            <div className="text-2xl font-bold text-emerald-400">{data.globalHealth.presence.activeWorking}</div>
          </div>
          <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30">
            <div className="text-xs text-amber-400 mb-1">Idle State</div>
            <div className="text-2xl font-bold text-amber-400">{data.globalHealth.presence.idle}</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">Away State</div>
            <div className="text-2xl font-bold text-slate-300">{data.globalHealth.presence.away}</div>
          </div>
        </div>

        {/* Agent Performance Table */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
            <span>Agent Operational Telemetry</span>
            <span className="text-xs px-3 py-1 bg-slate-800 rounded-full text-slate-400 font-mono">Deduplicated Monotonic Time</span>
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">State</th>
                <th className="pb-3 font-medium">Active Work</th>
                <th className="pb-3 font-medium">Idle/Away</th>
                <th className="pb-3 font-medium">Chats Handled</th>
                <th className="pb-3 font-medium text-right">SLA Breaches</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.agentPerformance.map((agent, idx) => (
                <tr key={idx} className="border-b border-slate-700/10 hover:bg-slate-800/50 transition-colors">
                  <td className="py-4">
                    <div className="font-bold text-white">{agent.name}</div>
                    <div className="text-xs font-mono text-slate-500">{agent.agentId}</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${agent.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-emerald-400">
                    {formatTime(agent.metrics.activeWorkingSec)}
                  </td>
                  <td className="py-4 font-mono text-slate-400">
                    {formatTime(agent.metrics.idleSec + agent.metrics.awaySec)}
                  </td>
                  <td className="py-4 font-medium text-blue-400">{agent.metrics.chatsHandled}</td>
                  <td className="py-4 text-right">
                    <span className={`font-bold ${agent.metrics.slaBreachCount > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                      {agent.metrics.slaBreachCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}