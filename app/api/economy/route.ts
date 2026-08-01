// /apps/admin/app/api/economy/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ninulhvgcptsvoswhckn.supabase.co';
const supabaseKey = 'sb_publishable_OPNQTRG3tTQKxBlNJ1i71A_c2lc7w-g';
const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase.from('economy_config').select('*').single();
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, config: data }, { status: 200 });
    
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch economy config',
      DEBUG_INFO: {
        error_message: err?.message || 'Unknown error',
        // Typescript safe strict boolean conversion
        is_url_loaded: Boolean(supabaseUrl), 
        is_key_loaded: Boolean(supabaseKey)
      }
    }, { status: 500 });
  }
}