'use client';

import { useEffect } from 'react';

interface HtmlLangSetterProps {
  locale: string;
}

export default function HtmlLangSetter({ locale }: HtmlLangSetterProps) {
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.lang = locale === 'zh' ? 'zh-CN' : 'en-US';
    }
  }, [locale]);

  return null;
}
