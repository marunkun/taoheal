'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { ArticleMeta } from '@/lib/articles';

interface SearchProps {
  locale: string;
}

export default function Search({ locale }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArticleMeta[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`);
        const data = await response.json();
        setResults(data);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, locale]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const popularTags = locale === 'zh' ? ['失眠', '穴位', '养生', '食谱'] : ['insomnia', 'acupoint', 'wellness', 'recipe'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label={locale === 'zh' ? '搜索文章' : 'Search articles'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline text-sm">
          {locale === 'zh' ? '搜索' : 'Search'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={locale === 'zh' ? '搜索文章、穴位、食谱...' : 'Search articles, acupoints, recipes...'}
              className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
            />
            {query && (
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {results.length > 0 ? (
              <ul className="py-2">
                {results.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/${locale}/knowledge/articles/${article.slug}`}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">
                        📖
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {article.title[locale as 'zh' | 'en']}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {article.category[locale as 'zh' | 'en']}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="text-sm">
                  {locale === 'zh' ? '没有找到匹配的内容' : 'No results found'}
                </p>
              </div>
            ) : (
              <div className="px-4 py-6">
                <p className="text-xs text-gray-500 mb-3">
                  {locale === 'zh' ? '热门搜索：' : 'Popular searches:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full hover:bg-green-100 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}