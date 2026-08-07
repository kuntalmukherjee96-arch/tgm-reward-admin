"use client";
import React, { useState, useEffect } from 'react';

export default function UserPortal() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
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
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#1e293b] border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
        
        {/* User Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Tinitri Member Portal</h1>
            <p className="text-xs text-slate-400">Telegram Mini App Interface</p>
          </div>
          <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs rounded-full font-medium">
            {data.userId}
          </span>
        </div>

        {/* Balance Card */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 mb-6 text-center">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Available Ledger Balance</div>
          <div className="text-4xl font-extrabold text-white tracking-tight">${data.ledgerBalanceUSD.toFixed(2)}</div>
          <div className="text-sm font-semibold text-emerald-400 mt-1">Localized: {data.ledgerBalanceINR}</div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            Withdraw via UPI
          </button>
          <button className="py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl text-sm transition-all">
            Invite Friends
          </button>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="text-sm font-bold text-white mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {data.recentTransactions.map((tx, idx) => (
              <div key={idx} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center text-xs">
                <div>
                  <div className="font-semibold text-white">{tx.type}</div>
                  <div className="text-slate-400 text-[10px]">{tx.date}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.amount}</div>
                  <div className="text-slate-500 text-[10px]">{tx.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}