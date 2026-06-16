'use client';

import { useState } from 'react';
import Image from 'next/image';

type VideoSource = 'youtube' | 'bilibili' | 'videopress';

interface Video {
  id: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  thumbnail: string;
  youtubeId?: string;
  bilibiliBvid?: string;  // B站BV号
  bilibiliAid?: number;    // B站av号
  wechatUrl?: string;     // 微信视频号链接
  localSrc?: string;
  duration: string;
  category: { zh: string; en: string };
  source?: VideoSource;    // 视频来源
}

interface VideoSectionProps {
  videos: Video[];
  locale: string;
}

function getVideoEmbedUrl(video: Video): string {
  const source = video.source || 'youtube';
  
  switch (source) {
    case 'bilibili':
      if (video.bilibiliBvid) {
        return `https://player.bilibili.com/player.html?bvid=${video.bilibiliBvid}&autoplay=0&Danmaku=0`;
      } else if (video.bilibiliAid) {
        return `https://player.bilibili.com/player.html?aid=${video.bilibiliAid}&autoplay=0&Danmaku=0`;
      }
      return '';
    case 'youtube':
    default:
      return `https://www.youtube.com/embed/${video.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1&rel=0`;
  }
}

function getSourceIcon(source?: VideoSource) {
  switch (source) {
    case 'bilibili':
      return '📺';
    case 'youtube':
      return '▶️';
    default:
      return '🎬';
  }
}

function getSourceLabel(source?: VideoSource, isZh: boolean = true) {
  switch (source) {
    case 'bilibili':
      return isZh ? 'B站' : 'Bilibili';
    case 'youtube':
      return 'YouTube';
    default:
      return isZh ? '视频' : 'Video';
  }
}

export default function VideoSection({ videos, locale }: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(videos[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isZh = locale === 'zh';

  const handlePlay = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const handleVideoSelect = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-bg-section to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full mb-3">
            {isZh ? '视频专区' : 'Video Zone'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {isZh ? '中医养生视频课程' : 'TCM Wellness Video Courses'}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {isZh 
              ? '观看专业中医讲师分享的养生知识，轻松学习中医智慧' 
              : 'Learn wellness knowledge from professional TCM instructors'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 视频播放区 */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
              {activeVideo ? (
                <>
                  {isPlaying ? (
                    <>
                      {/* 根据不同视频源显示不同嵌入 */}
                      {activeVideo.source === 'bilibili' ? (
                        <iframe
                          className="w-full h-full"
                          src={getVideoEmbedUrl(activeVideo)}
                          title={activeVideo.title[locale as 'zh' | 'en']}
                          scrolling="no"
                          frameBorder="0"
                          allowFullScreen
                        />
                      ) : activeVideo.youtubeId || activeVideo.source === 'youtube' || !activeVideo.source ? (
                        <iframe
                          className="w-full h-full"
                          src={getVideoEmbedUrl(activeVideo)}
                          title={activeVideo.title[locale as 'zh' | 'en']}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white bg-gray-800">
                          <div className="text-center">
                            <div className="text-6xl mb-4">🔒</div>
                            <p className="text-lg font-medium mb-2">
                              {isZh ? '视频暂不支持嵌入播放' : 'Video embedding not supported'}
                            </p>
                            <p className="text-sm text-gray-400">
                              {isZh ? '请访问以下链接观看：' : 'Please visit the link below to watch:'}
                            </p>
                            {activeVideo.wechatUrl && (
                              <a 
                                href={activeVideo.wechatUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                              >
                                {isZh ? '打开微信视频号' : 'Open WeChat Video'}
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer group"
                      onClick={() => handlePlay(activeVideo)}
                    >
                      <Image
                        src={activeVideo.thumbnail}
                        alt={activeVideo.title[locale as 'zh' | 'en']}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded">
                            {getSourceLabel(activeVideo.source, isZh)}
                          </span>
                          <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs rounded">
                            {activeVideo.category[locale as 'zh' | 'en']}
                          </span>
                        </div>
                        <h3 className="text-white text-lg font-bold">
                          {activeVideo.title[locale as 'zh' | 'en']}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {activeVideo.description[locale as 'zh' | 'en']}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 px-2 py-1 bg-black/70 text-white text-xs rounded">
                        {activeVideo.duration}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p>{isZh ? '选择一个视频开始学习' : 'Select a video to start learning'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 视频信息 */}
            {activeVideo && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getSourceIcon(activeVideo.source)}</span>
                  <span className="text-sm font-medium text-primary-600">
                    {getSourceLabel(activeVideo.source, isZh)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {activeVideo.title[locale as 'zh' | 'en']}
                </h3>
                <p className="text-sm text-text-secondary">
                  {activeVideo.description[locale as 'zh' | 'en']}
                </p>
                {activeVideo.wechatUrl && (
                  <a 
                    href={activeVideo.wechatUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-primary hover:text-primary-700 text-sm font-medium"
                  >
                    <span>🔗</span>
                    {isZh ? '在微信中打开' : 'Open in WeChat'}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 视频列表 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              {isZh ? '推荐视频' : 'Recommended Videos'}
            </h3>
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`w-full text-left rounded-xl overflow-hidden border transition-all hover:shadow-lg ${
                  activeVideo?.id === video.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail}
                    alt={video.title[locale as 'zh' | 'en']}
                    fill
                    className={`object-cover transition-transform ${
                      activeVideo?.id !== video.id ? 'hover:scale-105' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded flex items-center gap-1">
                    <span>{getSourceIcon(video.source)}</span>
                    <span>{getSourceLabel(video.source, isZh)}</span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-text-primary line-clamp-2 mb-1">
                    {video.title[locale as 'zh' | 'en']}
                  </h4>
                  <span className="text-xs text-text-muted">
                    {video.category[locale as 'zh' | 'en']}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 默认视频数据 - 演示不同视频源
export const defaultVideos: Video[] = [
  {
    id: '1',
    title: {
      zh: '中医体质辨识入门：认识九种体质',
      en: 'Introduction to TCM Body Type Identification'
    },
    description: {
      zh: '了解九种中医体质类型，学习如何根据自身体质进行养生调理',
      en: 'Learn about the 9 TCM body types and how to maintain health based on your body type'
    },
    thumbnail: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=640&h=360&fit=crop',
    youtubeId: 'dQw4w9WgXcQ', // 替换为您的YouTube视频ID
    duration: '12:34',
    category: { zh: '体质测试', en: 'Body Type' },
    source: 'youtube'
  },
  {
    id: '2',
    title: {
      zh: '子午流注：十二时辰养生法详解',
      en: 'Midnight-Noon Flow: 12 Meridian Wellness'
    },
    description: {
      zh: '遵循十二时辰经络运行规律，科学安排作息，达到最佳养生效果',
      en: 'Follow the 12 meridian schedule for optimal health management'
    },
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&h=360&fit=crop',
    bilibiliBvid: 'BV1xx411c7XD', // 替换为您的B站视频BV号
    duration: '15:20',
    category: { zh: '时令养生', en: 'Seasonal Wellness' },
    source: 'bilibili'
  },
  {
    id: '3',
    title: {
      zh: '常用穴位保健按摩教学',
      en: 'Common Acupoint Health Massage Tutorial'
    },
    description: {
      zh: '学习人体关键穴位位置和按摩手法，日常保健必备技能',
      en: 'Learn key acupoint locations and massage techniques for daily health care'
    },
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&h=360&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '18:45',
    category: { zh: '穴位保健', en: 'Acupoint Care' },
    source: 'youtube'
  },
  {
    id: '4',
    title: {
      zh: '五行养生：脏腑调理与平衡',
      en: 'Five Elements Wellness and Organ Balance'
    },
    description: {
      zh: '运用五行相生相克理论调理五脏六腑，达到身心和谐健康',
      en: 'Apply Five Elements theory to regulate organs for holistic health'
    },
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&h=360&fit=crop',
    bilibiliBvid: 'BV1xx411c7XD',
    duration: '20:10',
    category: { zh: '中医理论', en: 'TCM Theory' },
    source: 'bilibili'
  },
];

// 微信视频号数据示例（需要用户自己配置URL）
export const wechatVideoExample: Video = {
  id: 'wechat-1',
  title: {
    zh: '微信视频号示例',
    en: 'WeChat Video Example'
  },
  description: {
    zh: '这是一个微信视频号示例，需要配置实际链接',
    en: 'This is a WeChat video example, needs actual URL configuration'
  },
  thumbnail: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=640&h=360&fit=crop',
  wechatUrl: 'https://channels.weixin.qq.com/platform/live/home', // 示例链接
  duration: '10:00',
  category: { zh: '养生课堂', en: 'Wellness Class' },
  source: undefined // 微信视频号无标准嵌入方式
};