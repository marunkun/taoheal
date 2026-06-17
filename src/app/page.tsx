import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function RootPage() {
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || 'zh';
  const browserLang = acceptLanguage.toLowerCase();
  const targetLang = browserLang.startsWith('zh') ? 'zh' : 'en';
  
  redirect(`/${targetLang}`);
}
