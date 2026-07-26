import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

export default function StatsCard({ title, value, change, isPositive = true }: StatsCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 backdrop-blur-sm shadow-lg">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline justify-between mt-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}