-- DaoHeal 社区数据库 Schema
-- 用于存储讨论、评论和用户信息

-- 用户表（由 NextAuth 管理，这里记录额外的用户信息）
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 讨论分类表
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_zh TEXT,
  description_en TEXT,
  icon TEXT DEFAULT '💬',
  color TEXT DEFAULT 'from-blue-400 to-blue-600',
  post_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 讨论帖子表
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_image TEXT,
  category_id INTEGER,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  is_pinned INTEGER DEFAULT 0,
  is_locked INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_image TEXT,
  content TEXT NOT NULL,
  parent_id TEXT,
  like_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- 帖子点赞表
CREATE TABLE IF NOT EXISTS post_likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 初始化分类数据
INSERT OR IGNORE INTO categories (slug, name_zh, name_en, description_zh, description_en, icon, color) VALUES
('qa', '问答交流', 'Q&A Forum', '与其他养生爱好者交流经验，解答疑问', 'Connect with wellness enthusiasts, share experiences', '💬', 'from-blue-400 to-blue-600'),
('recipes', '食疗食谱', 'Recipes', '分享健康美味的食疗食谱，吃出健康好身体', 'Share healthy and delicious therapeutic recipes', '🍲', 'from-amber-400 to-orange-500'),
('exercise', '运动养生', 'Exercise Wellness', '太极、八段锦、瑜伽等养生运动交流', 'Tai Chi, Ba Duan Jin, Yoga and more', '🧘', 'from-purple-400 to-pink-500'),
('herbs', '中草药', 'Herbs', '中草药识别与使用心得分享', 'Chinese herb identification and usage tips', '🌿', 'from-green-400 to-emerald-600');

-- 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author_id);
