// 💬 SPRINT 11: ENTERPRISE UI - UNIFIED CONVERSATION LAYER (UPDATED)
// Implements Timeline, Read Receipts, Typing Status, and No-Edit Rules

import React, { useState } from 'react';

export const UnifiedConversationWidget = ({ userRole = 'OPERATIONS_MANAGER' }) => {
    // Mock Data with System Events (Timeline) and Read Receipts
    const [messages, setMessages] = useState([
        { id: 1, type: 'SYSTEM', text: '10:15 - User Created Ticket' },
        { id: 2, type: 'SYSTEM', text: '10:16 - Support Assigned' },
        { id: 3, type: 'PUBLIC', sender: 'USER', text: 'My withdrawal is pending for 2 days.', timestamp: '10:17 AM', status: 'Seen' },
        { id: 4, type: 'SYSTEM', text: '10:22 - Escalated to Finance' },
        { id: 5, type: 'INTERNAL', sender: 'FINANCE_ADMIN', text: 'Hold funds. AI flagged this. KYC is incomplete.', timestamp: '10:25 AM' },
        { id: 6, type: 'SYSTEM', text: '10:31 - System paused payout due to Risk Rules' }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isInternal, setIsInternal] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const newMsg = {
            id: messages.length + 1,
            type: isInternal ? 'INTERNAL' : 'PUBLIC',
            sender: userRole,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: 'Sent'
        };
        setMessages([...messages, newMsg]);
        setNewMessage("");
        setIsTyping(false);
    };

    return (
        <div className="conversation-widget" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>💬 Ticket #TKT-991</h4>
                <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>⏱️ SLA Response Time: 4m 12s</span>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px 0' }}>
                {messages.map(msg => {
                    if (msg.type === 'INTERNAL' && userRole === 'STANDARD_USER') return null;
                    
                    // Render Timeline Events
                    if (msg.type === 'SYSTEM') {
                        return (
                            <div key={msg.id} style={{ textAlign: 'center', fontSize: '11px', color: '#999', margin: '12px 0', fontWeight: 'bold' }}>
                                — {msg.text} —
                            </div>
                        );
                    }

                    const isInternalNote = msg.type === 'INTERNAL';
                    return (
                        <div key={msg.id} style={{
                            backgroundColor: isInternalNote ? '#fff3cd' : '#f8f9fa',
                            padding: '10px', borderRadius: '6px', marginBottom: '8px',
                            borderLeft: isInternalNote ? '4px solid #ffc107' : '4px solid #6c757d'
                        }}>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                                <strong>{msg.sender}</strong> {isInternalNote && <span style={{ color: '#856404' }}>🔒</span>} - {msg.timestamp}
                            </div>
                            <div style={{ fontSize: '14px' }}>{msg.text}</div>
                            
                            {/* Render Read Receipt for Public Messages */}
                            {msg.type === 'PUBLIC' && msg.sender === 'USER' && (
                                <div style={{ fontSize: '10px', color: '#007bff', textAlign: 'right', marginTop: '4px' }}>
                                    ✓✓ {msg.status}
                                </div>
                            )}
                        </div>
                    );
                })}
                {/* Typing Status (Human Agent Only) */}
                {isTyping && <div style={{ fontSize: '12px', color: '#888', fontStyle: 'italic', marginTop: '10px' }}>Human Agent is typing...</div>}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', gap: '10px' }}>
                <input 
                    type="text" value={newMessage} 
                    onChange={(e) => { setNewMessage(e.target.value); setIsTyping(e.target.value.length > 0); }}
                    placeholder="Type a message..." 
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                />
                {userRole !== 'STANDARD_USER' && (
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={isInternal} onChange={() => setIsInternal(!isInternal)} style={{ marginRight: '5px' }} /> 🔒 Internal
                    </label>
                )}
                <button onClick={handleSend} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
            </div>
        </div>
    );
};

export default UnifiedConversationWidget;