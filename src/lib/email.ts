import { Resend } from 'resend';

let resend: Resend | null = null;

function getResendClient() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const FROM_NAME = process.env.FROM_NAME || 'DaoHeal';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const client = getResendClient();
    const response = await client.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export function generateNewsletterHtml(articles: Array<{
  title: string;
  description?: string;
  url: string;
}>, locale: string = 'zh') {
  const isZh = locale === 'zh';
  
  const articleList = articles.map(article => `
    <div style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
      <h3 style="margin: 0 0 10px 0; color: #333;">
        <a href="${article.url}" style="color: #059669; text-decoration: none;">${article.title}</a>
      </h3>
      ${article.description ? `<p style="margin: 0; color: #666; font-size: 14px;">${article.description}</p>` : ''}
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #059669; margin: 0;">🌿 DaoHeal 养生</h1>
        <p style="color: #666; margin: 10px 0 0 0;">
          ${isZh ? '最新养生知识更新' : 'Latest Wellness Updates'}
        </p>
      </div>
      
      <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="color: #fff; margin: 0; text-align: center;">
          ${isZh ? '📚 新文章推荐' : '📚 New Articles'}
        </h2>
      </div>
      
      <div style="margin-bottom: 30px;">
        ${articleList}
      </div>
      
      <div style="text-align: center; padding: 20px; background: #f0fdf4; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0; color: #666;">
          ${isZh ? '🌟 了解更多养生知识，请访问我们的网站' : '🌟 Visit our website for more wellness knowledge'}
        </p>
        <a href="https://daoheal.pages.dev/${locale}" style="display: inline-block; padding: 12px 24px; background: #059669; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500;">
          ${isZh ? '访问 DaoHeal →' : 'Visit DaoHeal →'}
        </a>
      </div>
      
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          ${isZh ? '您收到这封邮件是因为您订阅了 DaoHeal 养生资讯' : 'You received this email because you subscribed to DaoHeal Wellness Updates'}
          <br>
          <a href="#" style="color: #999;">
            ${isZh ? '取消订阅' : 'Unsubscribe'}
          </a>
        </p>
      </div>
    </body>
    </html>
  `;
}