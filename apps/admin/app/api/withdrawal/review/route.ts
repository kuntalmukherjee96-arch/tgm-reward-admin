import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase Connection
const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

// 🔴 POST: Process Withdrawal Request (Multi-step Review & Ledger Check)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { withdrawal_id, status, admin_id, rejection_reason } = body;

    // 1. Basic Validation
    if (!withdrawal_id || !status || !admin_id) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // 2. Fetch Current Withdrawal Data
    const { data: requestData, error: fetchError } = await supabase
      .from('withdrawal_requests')
      .select('*')
      .eq('id', withdrawal_id)
      .single();

    if (fetchError || !requestData) {
      return NextResponse.json({ success: false, message: 'Withdrawal request not found' }, { status: 404 });
    }

    // ==========================================
    // 🧠 MENTOR RULE: IMMUTABLE LEDGER VERIFICATION
    // ==========================================
    // Here we will calculate the ACTUAL balance from the Ledger (Sum of Credits - Sum of Debits)
    // We strictly DO NOT rely on the user's wallet table.
    // (This logic will be fully activated when we design the Ledger schema)
    
    // 3. Prepare Update Data based on State Transition
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === 'REJECTED') {
      if (!rejection_reason) {
        return NextResponse.json({ success: false, message: 'Rejection reason is mandatory' }, { status: 400 });
      }
      updateData.rejection_reason = rejection_reason;
    } else if (status === 'PROCESSING' || status === 'APPROVED') {
      updateData.admin_approved_by = admin_id;
      updateData.admin_approved_at = new Date().toISOString();
    } else if (status === 'PENDING_FINANCE_REVIEW') {
      updateData.finance_reviewed_by = admin_id;
      updateData.finance_reviewed_at = new Date().toISOString();
    }

    // 4. Update the Request
    const { data: updatedRecord, error: updateError } = await supabase
      .from('withdrawal_requests')
      .update(updateData)
      .eq('id', withdrawal_id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 5. Create Immutable Audit Log for Financial Compliance
    await supabase.from('policy_audit_logs').insert({
      entity_type: 'WITHDRAWAL_REQUEST',
      entity_id: withdrawal_id,
      action: `WITHDRAWAL_STATUS_${status}`,
      old_values: requestData,
      new_values: updatedRecord,
      changed_by: admin_id,
      reason: rejection_reason || 'Status advanced in withdrawal workflow'
    });

    // 🚀 Success Response
    return NextResponse.json({
      success: true,
      message: `Withdrawal successfully moved to ${status}`,
      data: updatedRecord
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ 
        success: false, 
        message: 'Crash: ' + String(err?.message || err) 
    }, { status: 500 });
  }
}