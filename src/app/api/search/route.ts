import { NextResponse } from 'next/server';
import { getAllArticlesMeta } from '@/lib/articles';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const locale = searchParams.get('locale') || 'zh';

  const articles = getAllArticlesMeta();
  
  if (!query.trim()) {
    return NextResponse.json(articles.slice(0, 6));
  }

  const searchLower = query.toLowerCase();
  const results = articles.filter((article) => {
    return (
      article.title[locale as 'zh' | 'en'].toLowerCase().includes(searchLower) ||
      article.description?.[locale as 'zh' | 'en']?.toLowerCase().includes(searchLower) ||
      article.category[locale as 'zh' | 'en'].toLowerCase().includes(searchLower) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  return NextResponse.json(results.slice(0, 6));
}