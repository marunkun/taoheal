import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  // Default to Chinese for better UX
  redirect('/zh');
}
