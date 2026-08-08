// 📋 SPRINT 11: ENTERPRISE UI - LIVE KANBAN WORKFLOW (UPDATED)
// Drag & Drop as a Full Business Event (UI -> API -> Audit -> Notify)

import React, { useState } from 'react';

const initialTickets = [
    { id: 'TKT-991', title: 'Withdrawal Pending', status: 'New', amount: '$500' },
    { id: 'TKT-992', title: 'KYC Verification', status: 'In Review', amount: 'N/A' }
];

const COLUMNS = ['New', 'In Review', 'Finance', 'Resolved'];
const DROP_PERMISSIONS = { 'Finance': ['FINANCE_ADMIN', 'SUPER_ADMIN'], 'Resolved': ['OPERATIONS_MANAGER', 'FINANCE_ADMIN', 'SUPER_ADMIN'] };

export const SupportKanbanWidget = ({ userRole = 'SUPER_ADMIN' }) => {
    const [tickets, setTickets] = useState(initialTickets);
    const [draggedTicketId, setDraggedTicketId] = useState(null);

    const handleDragStart = (e, id) => { setDraggedTicketId(id); e.dataTransfer.effectAllowed = "move"; };
    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = (e, targetStatus) => {
        e.preventDefault();
        if (!draggedTicketId) return;

        // 1. Permission Check
        if (DROP_PERMISSIONS[targetStatus] && !DROP_PERMISSIONS[targetStatus].includes(userRole)) {
            alert(`⛔ ACCESS DENIED: Role [${userRole}] cannot move tickets to [${targetStatus}].`);
            return;
        }

        // 2. Workflow API & 3. Audit Log & 4. Notification (Simulated Full Business Event)
        console.log(`[API CALL] Mutating state for ${draggedTicketId} to ${targetStatus}`);
        console.log(`[AUDIT] Action logged for ${userRole}`);
        console.log(`[NOTIFICATION] Dispatching update to User & Timeline`);

        setTickets(prev => prev.map(tkt => tkt.id === draggedTicketId ? { ...tkt, status: targetStatus } : tkt));
        setDraggedTicketId(null);
    };

    return (
        <div className="kanban-container" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>📋 Workflow Board</h3>
            
            {tickets.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>📭 No Active Tickets - Workflow Queue is Clear.</div>
            ) : (
                <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0' }}>
                    {COLUMNS.map(column => (
                        <div key={column} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column)} style={{ minWidth: '250px', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '6px', minHeight: '300px' }}>
                            <h4 style={{ textAlign: 'center', color: '#495057' }}>{column}</h4>
                            {tickets.filter(t => t.status === column).map(ticket => (
                                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)} style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '4px', cursor: 'grab', borderLeft: '4px solid #007bff' }}>
                                    <strong>{ticket.id}</strong>
                                    <p style={{ margin: '5px 0', fontSize: '14px' }}>{ticket.title}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SupportKanbanWidget;