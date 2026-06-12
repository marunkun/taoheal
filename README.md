# TaoHeal - 中医养生双语社区

A bilingual Traditional Chinese Medicine (TCM) wellness community built with Next.js 15, featuring internationalization support for Chinese and English.

## Features

- **Bilingual Support**: Full Chinese/English internationalization
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
│   │   │   ├── legal/
│   │   │   └── tools/
│   │   ├── api/                # API routes
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── robots.ts           # Robots configuration
│   ├── components/             # React components
│   │   ├── home/
│   │   ├── layout/
│   │   └── tools/
│   └── lib/                    # Utilities
├── content/
│   └── articles/                # Article JSON files
├── messages/                    # i18n translations
│   ├── zh.json
│   └── en.json
├── public/                     # Static assets
└── ...config files
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