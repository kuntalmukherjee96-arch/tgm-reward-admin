import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase Connection
const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

// 🔴 POST: Review KYC Request (Approve / Reject) with Audit
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { kyc_id, status, admin_id, rejection_reason } = body;

    // 1. Basic Validation
    if (!kyc_id || !status || !admin_id) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    if (status === 'REJECTED' && !rejection_reason) {
      return NextResponse.json({ success: false, message: 'Rejection reason is required' }, { status: 400 });
    }

    // 2. Fetch Old KYC Data for Audit Trail
    const { data: oldKyc } = await supabase.from('kyc_requests').select('*').eq('id', kyc_id).single();
    if (!oldKyc) {
      return NextResponse.json({ success: false, message: 'KYC record not found' }, { status: 404 });
    }

    // 3. Update the KYC Status
    const updateData: any = {
      status,
      reviewed_by: admin_id,
      reviewed_at: new Date().toISOString(),
    };
    if (status === 'REJECTED') {
      updateData.rejection_reason = rejection_reason;
    }

    const { data: updatedKyc, error: updateError } = await supabase
      .from('kyc_requests')
      .update(updateData)
      .eq('id', kyc_id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 4. Create Immutable Audit Log (Mentor's strict rule)
    await supabase.from('policy_audit_logs').insert({
      entity_type: 'KYC_REQUEST',
      entity_id: kyc_id,
      action: status === 'APPROVED' ? 'KYC_APPROVED' : 'KYC_REJECTED',
      old_values: oldKyc,
      new_values: updatedKyc,
      changed_by: admin_id,
      reason: rejection_reason || 'KYC Verified successfully'
    });

    // 🚀 Success Response
    return NextResponse.json({
      success: true,
      message: `KYC has been successfully ${status.toLowerCase()}`,
      data: updatedKyc
    }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ 
        success: false, 
        message: 'Crash: ' + String(err?.message || err) 
    }, { status: 500 });
  }
}