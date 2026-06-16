import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@/lib/cloudflare';
import { sendEmail, generateNewsletterHtml } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articles, locale = 'zh' } = body;

    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json({ error: 'Articles are required' }, { status: 400 });
    }

    // 验证 API Key（防止未授权调用）
    const authHeader = request.headers.get('authorization');
    const expectedKey = process.env.NOTIFY_API_KEY || 'daoheal-notify-secret-key';
    
    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { env } = getCloudflareContext();

    // 获取所有订阅者
    let subscribers: string[] = [];
    
    if (env.DB) {
      try {
        const result = await env.DB
          .prepare('SELECT email FROM subscribers WHERE is_active = 1')
          .all();
        
        subscribers = (result.results || []).map((row: Record<string, unknown>) => row.email as string);
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
        // 继续执行，使用空列表
      }
    }

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No subscribers to notify',
        subscriberCount: 0
      });
    }

    // 生成邮件内容
    const articlesWithUrls = articles.map((article: { title: string; description?: string; slug: string }) => ({
      title: article.title,
      description: article.description,
      url: `https://daoheal.pages.dev/${locale}/knowledge/articles/${article.slug}`
    }));

    const html = generateNewsletterHtml(articlesWithUrls, locale);
    const isZh = locale === 'zh';

    // 发送邮件
    const result = await sendEmail({
      to: subscribers,
      subject: isZh 
        ? `🌿 DaoHeal 更新 - ${articles.length} 篇新文章` 
        : `🌿 DaoHeal Update - ${articles.length} New Articles`,
      html
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Notification sent to ${subscribers.length} subscribers`,
        subscriberCount: subscribers.length,
        emailId: result.data?.data?.id
      });
    } else {
      return NextResponse.json({
        error: 'Failed to send emails',
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Notify error:', error);
    return NextResponse.json({
      error: 'Failed to send notifications'
    }, { status: 500 });
  }
}