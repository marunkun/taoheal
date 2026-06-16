import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@/lib/cloudflare';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, locale = 'zh' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { env } = getCloudflareContext();

    if (!env.DB) {
      // 本地开发模式，返回成功
      return NextResponse.json({
        success: true,
        message: 'Subscription recorded (local mode)'
      });
    }

    try {
      // 检查邮箱是否已订阅
      const existing = await env.DB
        .prepare('SELECT id FROM subscribers WHERE email = ? AND is_active = 1')
        .bind(email)
        .first();

      if (existing) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed'
        });
      }

      // 插入新订阅者
      await env.DB
        .prepare('INSERT INTO subscribers (email, locale) VALUES (?, ?)')
        .bind(email, locale)
        .run();

      return NextResponse.json({
        success: true,
        message: 'Subscribed successfully'
      });
    } catch (dbError: unknown) {
      // 如果是唯一约束冲突（邮箱已存在）
      if (dbError instanceof Error && dbError.message?.includes('UNIQUE constraint failed')) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed'
        });
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({
      error: 'Failed to subscribe'
    }, { status: 500 });
  }
}