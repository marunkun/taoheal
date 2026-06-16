import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// NextAuth 必需的用户和会话表
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: text("email_verified"),
  image: text("image"),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  sessionToken: text("session_token").unique(),
  userId: text("user_id").notNull(),
  expires: text("expires"),
});

export const verificationTokens = sqliteTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: text("expires"),
});

// 社区功能表
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  nameZh: text("name_zh").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionZh: text("description_zh"),
  descriptionEn: text("description_en"),
  icon: text("icon").default("💬"),
  color: text("color").default("from-blue-400 to-blue-600"),
  postCount: integer("post_count").default(0),
  createdAt: text("created_at"),
});

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: text("author_id").notNull(),
  authorName: text("author_name").notNull(),
  authorImage: text("author_image"),
  categoryId: integer("category_id"),
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  isPinned: integer("is_pinned").default(0),
  isLocked: integer("is_locked").default(0),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  postId: text("post_id").notNull(),
  authorId: text("author_id").notNull(),
  authorName: text("author_name").notNull(),
  authorImage: text("author_image"),
  content: text("content").notNull(),
  parentId: text("parent_id"),
  likeCount: integer("like_count").default(0),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const postLikes = sqliteTable("post_likes", {
  id: text("id").primaryKey(),
  postId: text("post_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: text("created_at"),
});

// 关系定义
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  comments: many(comments),
  likes: many(postLikes),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
}));
