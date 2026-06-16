'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'zh';
    const targetLang = browserLang.startsWith('zh') ? 'zh' : 'en';
    router.replace(`/${targetLang}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-section">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🌿</div>
        <p className="text-text-muted">Redirecting...</p>
      </div>
    </div>
  );
}
