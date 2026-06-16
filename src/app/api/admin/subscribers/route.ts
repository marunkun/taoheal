import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@/lib/cloudflare';

// 获取订阅者列表（仅管理员）
export async function GET(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();

    if (!env.DB) {
      return NextResponse.json({
        subscribers: [],
        total: 0,
        message: 'Local mode - no database'
      });
    }

    const subscribers = await env.DB
      .prepare(`
        SELECT id, email, locale, subscribed_at, is_active 
        FROM subscribers 
        WHERE is_active = 1 
        ORDER BY subscribed_at DESC
      `)
      .all();

    return NextResponse.json({
      subscribers: subscribers.results,
      total: subscribers.results?.length || 0
    });
  } catch (error) {
    console.error('Failed to fetch subscribers:', error);
    return NextResponse.json({
      error: 'Failed to fetch subscribers'
    }, { status: 500 });
  }
}