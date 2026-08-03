// /apps/admin/app/api/workflow/reply/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticket_id, sender_id, sender_role, message, is_internal_note, status_update } = body;

    if (!ticket_id || !sender_id || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // 1. Insert into Ticket Communications (Public Chat or Secret Note)
    const { error: commsError } = await supabase.from('ticket_communications').insert([{
      ticket_id,
      sender_id,
      sender_role,
      message,
      is_internal_note: is_internal_note || false
    }]);

    if (commsError) throw commsError;

    // 2. Add Audit Log (Tracking the human workflow)
    const actionType = is_internal_note ? 'Added Internal Note (Hidden)' : 'Replied to Ticket (Public)';
    await supabase.from('workflow_audit_logs').insert([{
      ticket_id,
      actor_id: sender_id,
      actor_role: sender_role,
      action_taken: actionType,
      remarks: message.substring(0, 60) + '...' // Saving first 60 chars in log
    }]);

    // 3. Optional: Update Ticket Status (e.g., 'resolved' or 'waiting_on_user')
    if (status_update) {
        await supabase.from('support_tickets').update({ status: status_update }).eq('ticket_id', ticket_id);
    }

    return NextResponse.json({
      success: true,
      message: is_internal_note ? 'Internal Note securely added to Finance/Admin Queue' : 'Public Reply sent to User successfully',
      audit_trail: {
          action: actionType,
          visibility: is_internal_note ? 'Staff Only (Secured)' : 'User & Staff',
          message_preview: message
      }
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Crash: ' + err.message }, { status: 500 });
  }
}