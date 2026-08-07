"use client";
import React, { useState, useEffect } from 'react';

export default function WorkforceCommandCenter() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('Today'); // Time filtering

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
            <h1 className="text-3xl font-bold text-white mb-2">Workforce Command Center</h1>
            <div className="flex space-x-3 text-xs font-mono">
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-emerald-400">Schema: {data.metadata.lineage.eventSchemaVersion}</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-blue-400">Calc: {data.metadata.lineage.calculationVersion}</span>
              <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-purple-400">Config: {data.metadata.lineage.configSnapshotId}</span>
            </div>
          </div>
          <div className="text-right">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="mb-2 bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1 outline-none text-white"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <div className="text-xs text-slate-500 mt-1">Data Lag: {data.metadata.freshness.lagSeconds}s (Server Auth)</div>
          </div>
        </div>

        {/* POINT 4: Duty Roster & Routine Board */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Support Duty Roster / Routine Board</h2>
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all">
              + Assign Shift
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Shift</th>
                <th className="pb-3 font-medium">Scheduled</th>
                <th className="pb-3 font-medium">Actual</th>
                <th className="pb-3 font-medium">Variance</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.dutyRoster.map((roster, idx) => (
                <tr key={idx} className="border-b border-slate-700/10 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-bold text-white">{roster.agent}</td>
                  <td className="py-3 text-slate-300">{roster.shift}</td>
                  <td className="py-3 font-mono text-slate-400">{roster.scheduled}</td>
                  <td className="py-3 font-mono text-blue-400">{roster.actual}</td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded ${roster.variance.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : roster.variance.startsWith('-') ? 'bg-red-500/10 text-red-400' : 'text-slate-500'}`}>
                      {roster.variance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* POINT 5 & 6: Agent Comparison & Trend Analytics */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Agent Performance & Chat Operations</h2>
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-700/50 text-slate-400 text-xs uppercase">
                <th className="pb-3 font-medium">Agent</th>
                <th className="pb-3 font-medium">Trend</th>
                <th className="pb-3 font-medium">Active Work</th>
                <th className="pb-3 font-medium">Chats</th>
                <th className="pb-3 font-medium">Avg Resp</th>
                <th className="pb-3 font-medium">SLA %</th>
                <th className="pb-3 font-medium text-right">Breaches</th>
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
                    {agent.trend === 'UP' ? <span className="text-emerald-400 font-bold">↑</span> : 
                     agent.trend === 'DOWN' ? <span className="text-red-400 font-bold">↓</span> : 
                     <span className="text-slate-400 font-bold">→</span>}
                  </td>
                  <td className="py-4 font-mono text-emerald-400">{formatTime(agent.metrics.activeWorkingSec)}</td>
                  <td className="py-4 font-medium text-blue-400">{agent.metrics.chatsHandled}</td>
                  <td className="py-4 font-mono text-slate-300">{agent.metrics.avgResponseTime}</td>
                  <td className="py-4 font-medium text-emerald-400">{agent.metrics.slaCompliance}</td>
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