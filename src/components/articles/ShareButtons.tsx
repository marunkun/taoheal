'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ShareButtonsProps {
  url: string;
  title: string;
  locale: string;
}

export default function ShareButtons({ url, title, locale }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  const buttons = [
    {
      id: 'copy',
      label: locale === 'zh' ? '复制链接' : 'Copy Link',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      onClick: handleCopy,
      className: copied ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      type: 'button' as const,
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      href: shareUrls.twitter,
      className: 'bg-blue-400 text-white hover:bg-blue-500',
      type: 'link' as const,
    },
    {
      id: 'weibo',
      label: '微博',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.098 20c-4.613 0-8.348-3.735-8.348-8.348 0-1.908.685-3.675 1.852-5.084.459-.514.78-1.114.927-1.764.148-.65.092-1.37-.172-1.985-.264-.615-.703-1.134-1.271-1.465-.568-.331-1.206-.491-1.831-.491V0h6.971c1.643 0 3.14 1.084 3.701 2.629.562 1.545.213 3.288-.903 4.525-.557.607-1.332 1.117-2.237 1.397-.904.28-.97.591-.993 1.159-.024.598.466 1.128 1.065 1.128.247 0 .489-.077.708-.222.219-.145.479-.326.676-.548.196-.222.424-.479.581-.789.157-.31.266-.655.266-1.023 0-.817-.663-1.478-1.48-1.478-.382 0-.742.157-.993.434-.251.277-.398.633-.398 1.007 0 .214.066.42.182.598.116.178.276.326.47.432.195.106.42.16.66.16.832 0 1.507-.675 1.507-1.508 0-.395-.16-1.134-.962-1.874-.802-.74-1.852-.931-2.647-.931-.367 0-.727.063-1.074.188-.347.125-.692.312-1.007.548-.315.236-.598.537-.826.886-.228.349-.438.749-.562 1.191-.124.442-.124.893 0 1.336.124.443.349.843.646 1.18.297.337.661.611 1.086.809.425.198.916.308 1.411.308.663 0 1.312-.144 1.919-.416.608-.272 1.154-.64 1.618-1.086.464-.446.824-.972 1.065-1.571.241-.6.368-1.236.368-1.893 0-3.273-2.663-5.935-5.936-5.935-3.273 0-5.936 2.663-5.936 5.936 0 3.273 2.663 5.936 5.936 5.936.835 0 1.632-.152 2.361-.44.73-.288 1.415-.679 2.034-1.165.619-.486 1.165-1.071 1.622-1.74.457-.669.832-1.398 1.111-2.166.279-.768.442-1.56.442-2.361 0-1.882-1.535-3.417-3.417-3.417-.486 0-.952.084-1.389.24-.437.156-.849.384-1.22.676-.371.292-.692.65-.941 1.066-.249.416-.442.86-.566 1.323-.124.463-.187.94-.187 1.423 0 .537.102 1.05.303 1.523.201.473.498.88.873 1.199.375.319.817.548 1.308.658.49.11.996.091 1.477-.058.481-.148.926-.402 1.308-.74.382-.338.699-.743.931-1.191.232-.448.391-.928.462-1.424.071-.496.049-1.004-.061-1.489-.11-.485-.303-.928-.566-1.308-.263-.38-.598-.698-.988-.936-.39-.237-.815-.406-1.265-.493-.45-.087-.917-.087-1.367 0-.45.087-.876.255-1.266.493-.39.238-.725.556-.988.936-.263.38-.456.823-.566 1.308-.11.485-.088.993.061 1.489.071.496.23 1.02.462 1.512.232.492.533.941.896 1.33.363.389.797.703 1.288.928.49.225 1.018.342 1.567.342 1.193 0 2.333-.482 3.207-1.356.874-.874 1.356-2.014 1.356-3.207 0-1.882-1.535-3.417-3.417-3.417z" />
        </svg>
      ),
      href: shareUrls.weibo,
      className: 'bg-red-500 text-white hover:bg-red-600',
      type: 'link' as const,
    },
    {
      id: 'wechat',
      label: locale === 'zh' ? '微信' : 'WeChat',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.024-.12-.04-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.406-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" />
        </svg>
      ),
      onClick: handleCopy,
      className: 'bg-green-600 text-white hover:bg-green-700',
      type: 'button' as const,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-2">
        {locale === 'zh' ? '分享：' : 'Share:'}
      </span>
      <div className="flex gap-2">
        {buttons.map((button) => {
          if (button.type === 'link') {
            return (
              <Link
                key={button.id}
                href={button.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${button.className}`}
                title={button.label}
                aria-label={button.label}
              >
                {button.icon}
              </Link>
            );
          } else {
            return (
              <button
                key={button.id}
                onClick={button.onClick}
                className={`p-2 rounded-lg transition-colors ${button.className}`}
                title={button.label}
                aria-label={button.label}
              >
                {button.icon}
              </button>
            );
          }
        })}
      </div>
      {copied && (
        <span className="text-sm text-green-600 animate-in fade-in">
          {locale === 'zh' ? '已复制！' : 'Copied!'}
        </span>
      )}
    </div>
  );
}