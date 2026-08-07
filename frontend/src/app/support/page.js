"use client";
import React, { useState, useEffect } from 'react';

export default function SupportWorkspace() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
        if (fetchedData.activeChats.length > 0) {
          setSelectedChat(fetchedData.activeChats[0]);
        }
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Notification Badge */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Support Command & Live Chat</h1>
            <p className="text-slate-400 text-sm">Real-time telemetry, notifications, and direct user conversations.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium flex items-center space-x-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              <span>🔔 Notifications ({data.unreadCount} Unread)</span>
            </div>
          </div>
        </div>

        {/* Notifications Alert Banner */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.notifications.map((notif, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${notif.severity === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-300' : notif.severity === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-blue-500/10 border-blue-500/30 text-blue-300'}`}>
              <div className="text-xs font-mono opacity-75 mb-1">{notif.timestamp}</div>
              <div className="text-sm font-semibold">{notif.message}</div>
            </div>
          ))}
        </div>

        {/* Live Chat Support Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chat List */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5">
            <h3 className="font-bold text-white mb-4">Active User Conversations</h3>
            <div className="space-y-3">
              {data.activeChats.map((chat, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedChat(chat)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedChat?.ticketId === chat.ticketId ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
                >
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1">
                    <span>{chat.ticketId}</span>
                    <span>{chat.time}</span>
                  </div>
                  <div className="text-sm font-bold text-white">{chat.user}</div>
                  <div className="text-xs text-slate-400 truncate mt-1">{chat.lastMessage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Chat Window */}
          <div className="lg:col-span-2 bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 flex flex-col justify-between h-[450px]">
            {selectedChat ? (
              <>
                <div className="border-b border-slate-700/50 pb-3 mb-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">Chat Session: {selectedChat.ticketId}</h3>
                    <p className="text-xs text-slate-400">Connected with user: {selectedChat.user} via Telegram Mini App</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-medium">LIVE SECURE</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                  <div className="bg-slate-800 p-3 rounded-lg max-w-md text-sm">
                    <span className="text-xs text-blue-400 font-semibold block mb-1">{selectedChat.user}</span>
                    {selectedChat.lastMessage}
                  </div>
                  <div className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-lg max-w-md ml-auto text-sm text-right">
                    <span className="text-xs text-emerald-400 font-semibold block mb-1">Support Agent (You)</span>
                    Hello! We are reviewing your transaction through the secure ledger and it will be settled shortly.
                  </div>
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type secure response to user..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <button 
                    onClick={() => setReplyText("")}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                Select a conversation to begin live chat support.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}