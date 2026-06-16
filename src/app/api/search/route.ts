import { NextResponse } from 'next/server';
import { getAllArticlesMeta } from '@/lib/articles';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const locale = searchParams.get('locale') || 'zh';

  if (!query.trim()) {
    return NextResponse.json([]);
  }

  const allArticles = getAllArticlesMeta();
  const searchQuery = query.toLowerCase().trim();

  const results = allArticles.filter((article) => {
    const titleZh = article.title.zh?.toLowerCase() || '';
    const titleEn = article.title.en?.toLowerCase() || '';
    const descZh = article.description?.zh?.toLowerCase() || '';
    const descEn = article.description?.en?.toLowerCase() || '';
    const categoryZh = article.category.zh?.toLowerCase() || '';
    const categoryEn = article.category.en?.toLowerCase() || '';

    return (
      titleZh.includes(searchQuery) ||
      titleEn.includes(searchQuery) ||
      descZh.includes(searchQuery) ||
      descEn.includes(searchQuery) ||
      categoryZh.includes(searchQuery) ||
      categoryEn.includes(searchQuery)
    );
  });

  return NextResponse.json(results);
}