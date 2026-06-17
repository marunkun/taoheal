import { redirect } from 'next/navigation';

export default async function RootPage() {
  const targetLang = 'zh';
  
  redirect(`/${targetLang}`);
}
