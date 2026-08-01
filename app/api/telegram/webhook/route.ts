import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate Telegram Webhook Update
    if (body.message) {
      const chatId = body.message.chat.id;
      const userName = body.message.from.first_name;
      
      console.log(`Received Telegram message from ${userName} (Chat ID: ${chatId})`);
      
      // Here we can handle start command or reward claims
    }

    return NextResponse.json({ status: 'success', handled: true }, { status: 200 });
  } catch (error) {
    console.error('Telegram Webhook Error:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}