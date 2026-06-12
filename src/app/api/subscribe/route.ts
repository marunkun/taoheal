import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email' },
        { status: 400 }
      );
    }

    // MVP: Store in Cloudflare KV (or mock response for now)
    // In production, you would connect to Cloudflare KV or D1
    console.log('New subscriber:', email);

    return NextResponse.json({
      success: true,
      message: 'Subscription successful',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal error' },
      { status: 500 }
    );
  }
}
