import fs from 'fs';
import path from 'path';

export interface ArticleMeta {
  slug: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  category: { zh: string; en: string };
  tags?: string[];
  publishedAt?: string;
  readingTime?: number;
  image?: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'warning' | 'disclaimer' | 'recipe';
  text?: string;
  items?: string[];
  title?: string;
  ingredients?: string[];
  instructions?: string;
}

export interface Article extends ArticleMeta {
  content: {
    zh: ContentBlock[];
    en: ContentBlock[];
  };
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  const files = fs.readdirSync(articlesDirectory);
  return files
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContents) as Article;
}

export function getAllArticlesMeta(): ArticleMeta[] {
  const slugs = getAllArticleSlugs();
  return slugs
    .map((slug) => {
      const article = getArticle(slug);
      if (!article) return null;
      const { content, ...meta } = article;
      return meta as ArticleMeta;
    })
    .filter((article): article is ArticleMeta => article !== null)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

export function getRelatedArticles(currentSlug: string, category: { zh: string; en: string }, limit = 3): ArticleMeta[] {
  const allArticles = getAllArticlesMeta();
  
  const sameCategory = allArticles.filter(
    (a) => a.slug !== currentSlug && 
    (a.category.zh === category.zh || a.category.en === category.en)
  );
  
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  
  const others = allArticles.filter(
    (a) => a.slug !== currentSlug && 
    a.category.zh !== category.zh && 
    a.category.en !== category.en
  );
  
  return [...sameCategory, ...others].slice(0, limit);
}