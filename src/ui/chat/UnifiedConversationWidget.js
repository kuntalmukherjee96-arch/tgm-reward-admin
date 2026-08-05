// 💬 SPRINT 11: ENTERPRISE UI - UNIFIED CONVERSATION LAYER
// Implements Message Visibility, Attachment References, and No-Edit Rules

import React, { useState } from 'react';

export const UnifiedConversationWidget = ({ userRole = 'OPERATIONS_MANAGER' }) => {
    // Mock Data adhering to Mentor's Architecture Rules
    const [messages, setMessages] = useState([
        { id: 1, type: 'PUBLIC', sender: 'USER', text: 'My withdrawal is pending for 2 days.', timestamp: '10:01 AM' },
        { id: 2, type: 'INTERNAL', sender: 'FINANCE_ADMIN', text: 'Hold funds. AI flagged this. KYC is incomplete.', timestamp: '10:10 AM' },
        { id: 3, type: 'ATTACHMENT', sender: 'USER', fileRef: 's3://kyc/receipt_991.pdf', timestamp: '10:15 AM' } // Rule 2: Object Reference Only
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isInternal, setIsInternal] = useState(false);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const newMsg = {
            id: messages.length + 1,
            type: isInternal ? 'INTERNAL' : 'PUBLIC',
            sender: userRole,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        // Rule 1: No editing of existing messages, only appending new ones
        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    return (
        <div className="conversation-widget" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', height: '450px' }}>
            {/* Header & Rule 3: Search Capability */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h4 style={{ margin: 0 }}>💬 Ticket #TKT-991 Conversation</h4>
                <input 
                    type="text" 
                    placeholder="🔍 Search (Messages, Users, Keywords)..." 
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }} 
                />
            </div>
            
            {/* Message Timeline */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '15px 0' }}>
                {messages.map(msg => {
                    // Strict UI Visibility Enforcement
                    if (msg.type === 'INTERNAL' && userRole === 'STANDARD_USER') return null;
                    
                    const isInternalNote = msg.type === 'INTERNAL';
                    return (
                        <div key={msg.id} style={{
                            backgroundColor: isInternalNote ? '#fff3cd' : '#f8f9fa',
                            padding: '12px',
                            borderRadius: '6px',
                            marginBottom: '12px',
                            borderLeft: isInternalNote ? '4px solid #ffc107' : '4px solid #6c757d'
                        }}>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>
                                <strong>{msg.sender}</strong> {isInternalNote && <span style={{ color: '#856404' }}>🔒 (Internal Note)</span>} - {msg.timestamp}
                            </div>
                            {msg.type === 'ATTACHMENT' ? (
                                <a href="#" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>📎 View Attachment: {msg.fileRef}</a>
                            ) : (
                                <div style={{ fontSize: '14px' }}>{msg.text}</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message... (No Edit Allowed)" 
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                />
                
                {userRole !== 'STANDARD_USER' && (
                    <label style={{ display: 'flex', alignItems: 'center', fontSize: '13px', cursor: 'pointer', backgroundColor: '#e9ecef', padding: '8px', borderRadius: '4px' }}>
                        <input type="checkbox" checked={isInternal} onChange={() => setIsInternal(!isInternal)} style={{ marginRight: '5px' }} />
                        🔒 Internal
                    </label>
                )}
                
                <button onClick={handleSend} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default UnifiedConversationWidget;