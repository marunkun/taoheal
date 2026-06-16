# TaoHeal - 中医养生双语社区

A bilingual Traditional Chinese Medicine (TCM) wellness community built with Next.js 15, featuring internationalization support for Chinese and English.

## Features

- **Bilingual Support**: Full Chinese/English internationalization using next-intl
- **Static Content**: JSON-based article system
- **Interactive Tools**: Body type quiz
- **SEO Optimized**: Meta tags, Open Graph, sitemap
- **Responsive Design**: Mobile-first approach
- **Performance**: Image optimization, security headers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/           # Locale-specific routes
│   │   │   ├── about/
│   │   │   ├── community/
│   │   │   ├── knowledge/
│   │   │   │   └── articles/
│   │   │   │       └── [slug]/  # Dynamic article pages
│   │   │   ├── legal/
│   │   │   │   ├── disclaimer/
│   │   │   │   ├── privacy/
│   │   │   │   └── terms/
│   │   │   └── tools/
│   │   │       └── body-type-quiz/
│   │   ├── api/                # API routes
│   │   │   ├── search/
│   │   │   └── subscribe/
│   │   ├── sitemap.xml/        # Dynamic sitemap
│   │   └── robots.txt/         # Robots configuration
│   └── components/             # React components
│       ├── home/
│       ├── layout/
│       └── tools/
├── lib/                        # Utilities and configuration
│   ├── i18n.ts                 # next-intl configuration
│   └── routing.ts              # Locale routing configuration
├── content/
│   ├── articles/               # Article JSON files
│   │   └── images/             # Article images
│   └── quiz-questions.json     # Body type quiz questions
├── messages/                   # i18n translations
│   ├── zh.json                 # Chinese translations
│   └── en.json                 # English translations
├── public/                     # Static assets
│   ├── favicon.svg
│   └── robots.txt
├── middleware.ts               # Locale detection middleware
├── next.config.ts              # Next.js configuration with next-intl
├── package.json
├── tsconfig.json
├── README.md
└── SEO-CHECKLIST.md
```

## i18n Configuration

This project uses `next-intl` for internationalization:

- **Supported locales**: `zh` (Chinese), `en` (English)
- **Default locale**: `zh`
- **Locale prefix**: Always (e.g., `/zh/about`, `/en/about`)
- **Translation files**: Located in `messages/` directory

### Using Translations

```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('nav');
  return <nav>{t('home')}</nav>;
}
```

## Deployment

Deploy to Cloudflare Pages:

1. Push to GitHub repository
2. Connect to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Add environment variable: `NEXT_PUBLIC_SITE_URL`

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Deployment**: Cloudflare Pages

## License

MIT License - see LICENSE file for details.