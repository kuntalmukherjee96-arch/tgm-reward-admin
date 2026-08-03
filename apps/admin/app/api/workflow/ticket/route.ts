// /apps/admin/app/api/workflow/ticket/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, ticket_id, user_id, issue_category, issue_description, actor_id, actor_role, target_level, remarks } = body;

    // Action 1: User Creates a Ticket (Defaults to Level 5 Support Agent)
    if (action === 'CREATE_TICKET') {
      const { data: ticket, error } = await supabase.from('support_tickets').insert([{
        user_id,
        issue_category,
        issue_description,
        current_assigned_level: 5 // 5 = Support Agent
      }]).select('ticket_id').single();

      if (error) throw error;

      // Add Audit Log
      await supabase.from('workflow_audit_logs').insert([{
        ticket_id: ticket.ticket_id,
        actor_id: user_id,
        actor_role: 'User',
        action_taken: 'Ticket Created',
        remarks: 'Auto-assigned to Support Agent Queue (Level 5)'
      }]);

      return NextResponse.json({ 
        success: true, 
        message: 'Ticket Created & Assigned to Support Agent', 
        ticket_id: ticket.ticket_id 
      }, { status: 200 });
    }

    // Action 2: Staff Escalates the Ticket (e.g., Support Agent sends to Finance Admin)
    if (action === 'ESCALATE_TICKET') {
      const { error } = await supabase.from('support_tickets').update({
        current_assigned_level: target_level, // e.g., 3 for Finance Admin
        status: 'escalated'
      }).eq('ticket_id', ticket_id);

      if (error) throw error;

      // Add Audit Log
      await supabase.from('workflow_audit_logs').insert([{
        ticket_id,
        actor_id,
        actor_role,
        action_taken: `Escalated to Level ${target_level}`,
        remarks
      }]);

      return NextResponse.json({ 
        success: true, 
        message: `Ticket Successfully Escalated to Level ${target_level} Workflow Queue` 
      }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: 'Invalid Workflow Action' }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + err.message }, { status: 500 });
  }
}