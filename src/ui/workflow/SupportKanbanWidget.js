// 📋 SPRINT 11: ENTERPRISE UI - LIVE KANBAN WORKFLOW BOARD
// Visual Drag-and-Drop interface with UI-Level RBAC Enforcement (ADR 009)

import React, { useState } from 'react';

// Mock Initial Tickets
const initialTickets = [
    { id: 'TKT-991', title: 'Withdrawal Pending', status: 'New', amount: '$500' },
    { id: 'TKT-992', title: 'KYC Verification', status: 'In Review', amount: 'N/A' },
    { id: 'TKT-993', title: 'Suspicious Activity', status: 'Finance', amount: '$2000' }
];

const COLUMNS = ['New', 'Assigned', 'In Review', 'Finance', 'Admin', 'Resolved', 'Archived'];

// Strict RBAC Drop Rules (ADR 009)
const DROP_PERMISSIONS = {
    'Finance': ['FINANCE_ADMIN', 'SUPER_ADMIN'],
    'Admin': ['SUPER_ADMIN'],
    'Resolved': ['OPERATIONS_MANAGER', 'FINANCE_ADMIN', 'SUPER_ADMIN']
};

export const SupportKanbanWidget = ({ userRole = 'OPERATIONS_MANAGER' }) => {
    const [tickets, setTickets] = useState(initialTickets);
    const [draggedTicketId, setDraggedTicketId] = useState(null);

    const handleDragStart = (e, id) => {
        setDraggedTicketId(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e, targetStatus) => {
        e.preventDefault();
        
        if (!draggedTicketId) return;

        // UI-Level RBAC Enforcement
        if (DROP_PERMISSIONS[targetStatus] && !DROP_PERMISSIONS[targetStatus].includes(userRole)) {
            alert(`⛔ ACCESS DENIED: Role [${userRole}] cannot move tickets to [${targetStatus}].`);
            setDraggedTicketId(null);
            return;
        }

        // State Update (Simulating API Call to Gateway)
        setTickets(prev => prev.map(tkt => 
            tkt.id === draggedTicketId ? { ...tkt, status: targetStatus } : tkt
        ));
        
        console.log(`✅ [AUDIT LOG]: Ticket ${draggedTicketId} moved to ${targetStatus} by ${userRole}`);
        setDraggedTicketId(null);
    };

    return (
        <div className="kanban-container" style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>📋 Live Workflow Board</h3>
            
            <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0' }}>
                {COLUMNS.map(column => (
                    <div 
                        key={column}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column)}
                        style={{ minWidth: '250px', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '6px', minHeight: '300px' }}
                    >
                        <h4 style={{ textAlign: 'center', color: '#495057' }}>{column}</h4>
                        
                        {tickets.filter(t => t.status === column).map(ticket => (
                            <div 
                                key={ticket.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, ticket.id)}
                                style={{ 
                                    backgroundColor: '#fff', padding: '15px', marginBottom: '10px', 
                                    borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', cursor: 'grab' 
                                }}
                            >
                                <strong>{ticket.id}</strong>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}>{ticket.title}</p>
                                <span style={{ fontSize: '12px', color: '#007bff' }}>{ticket.amount}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportKanbanWidget;