"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface Category {
  id: number;
  slug: string;
  name_zh: string;
  name_en: string;
  description_zh: string;
  description_en: string;
  icon: string;
  color: string;
  post_count: number;
  actual_post_count: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_image: string;
  view_count: number;
  like_count: number;
  created_at: string;
  category_name_zh: string;
  category_name_en: string;
  category_icon: string;
}

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") || "zh";
  const isZh = locale === "zh";

  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", categoryId: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/community/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  async function fetchPosts() {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `/api/community/posts?category=${selectedCategory}`
        : "/api/community/posts";
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!session) {
      alert(isZh ? "请先登录" : "Please sign in first");
      return;
    }

    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          categoryId: newPost.categoryId || null,
          authorId: session.user?.id || session.user?.email,
          authorName: session.user?.name || "Anonymous",
          authorImage: session.user?.image || null,
        }),
      });

      if (res.ok) {
        setNewPost({ title: "", content: "", categoryId: "" });
        setShowPostForm(false);
        fetchPosts();
        fetchCategories();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return isZh ? "刚刚" : "Just now";
    if (hours < 24) return isZh ? `${hours} 小时前` : `${hours} hours ago`;
    if (days < 7) return isZh ? `${days} 天前` : `${days} days ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="min-h-screen bg-bg-section">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isZh ? "养生社区" : "Wellness Community"}
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
            {isZh
              ? "与全球养生爱好者交流，分享经验，共同成长"
              : "Connect with wellness enthusiasts worldwide, share experiences, and grow together"}
          </p>

          {/* Auth Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {status === "loading" ? (
              <span className="text-purple-200">{isZh ? "加载中..." : "Loading..."}</span>
            ) : session ? (
              <div className="flex items-center gap-4 bg-white/20 backdrop-blur rounded-xl px-6 py-3">
                <img
                  src={session.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session.user?.name}`}
                  alt={session.user?.name || ""}
                  className="w-10 h-10 rounded-full"
                />
                <div className="text-left">
                  <div className="font-medium">{session.user?.name}</div>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-purple-200 hover:text-white"
                  >
                    {isZh ? "退出登录" : "Sign out"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => signIn("github")}
                  className="px-6 py-3 bg-white text-purple-700 rounded-xl hover:bg-purple-50 transition-colors font-medium"
                >
                  {isZh ? "GitHub 登录" : "Sign in with GitHub"}
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="px-6 py-3 bg-white/20 backdrop-blur text-white rounded-xl hover:bg-white/30 transition-colors font-medium"
                >
                  {isZh ? "Google 登录" : "Sign in with Google"}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">{categories.reduce((acc, c) => acc + (c.actual_post_count || 0), 0)}</div>
              <div className="text-purple-200">{isZh ? "帖子总数" : "Total Posts"}</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-purple-200">{isZh ? "讨论分类" : "Categories"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border ${
                selectedCategory === null ? "border-primary-500 ring-2 ring-primary-200" : "border-border"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{isZh ? "全部" : "All"}</h3>
              <p className="text-sm text-text-muted mb-4">{isZh ? "查看所有讨论" : "View all discussions"}</p>
              <div className="text-sm text-primary font-medium">
                {posts.length} {isZh ? "帖子" : "posts"}
              </div>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border ${
                  selectedCategory === category.id ? "border-primary-500 ring-2 ring-primary-200" : "border-border"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {isZh ? category.name_zh : category.name_en}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {isZh ? category.description_zh : category.description_en}
                </p>
                <div className="text-sm text-primary font-medium">
                  {category.actual_post_count || 0} {isZh ? "帖子" : "posts"}
                </div>
              </button>
            ))}
          </div>

          {/* Create Post Button */}
          {session && (
            <div className="mb-8">
              <button
                onClick={() => setShowPostForm(!showPostForm)}
                className="w-full py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
              >
                {showPostForm
                  ? isZh ? "取消发布" : "Cancel"
                  : isZh ? "发布新帖子" : "Create New Post"}
              </button>

              {showPostForm && (
                <form onSubmit={handleCreatePost} className="mt-6 bg-white rounded-2xl p-6 border border-border">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {isZh ? "标题" : "Title"}
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={isZh ? "输入帖子标题..." : "Enter post title..."}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {isZh ? "分类" : "Category"}
                    </label>
                    <select
                      value={newPost.categoryId}
                      onChange={(e) => setNewPost({ ...newPost, categoryId: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">{isZh ? "选择分类（可选）" : "Select category (optional)"}</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {isZh ? c.name_zh : c.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {isZh ? "内容" : "Content"}
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[150px]"
                      placeholder={isZh ? "分享您的养生经验..." : "Share your wellness experience..."}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
                  >
                    {isZh ? "发布帖子" : "Publish Post"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Posts List */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {isZh ? "讨论列表" : "Discussions"}
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  {isZh ? "看看大家最近在讨论什么" : "See what everyone is discussing"}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-text-muted">{isZh ? "加载中..." : "Loading..."}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">💭</div>
                <p className="text-text-muted mb-4">
                  {isZh ? "还没有帖子，来发起第一个讨论吧！" : "No posts yet. Start the first discussion!"}
                </p>
                {session && (
                  <button
                    onClick={() => setShowPostForm(true)}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
                  >
                    {isZh ? "发布帖子" : "Create Post"}
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/community/post/${post.id}`}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-bg-section transition-colors cursor-pointer border border-border hover:border-primary-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                      {post.author_image ? (
                        <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover" />
                      ) : (
                        post.author_name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-muted line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <span>{post.author_name}</span>
                        <span>•</span>
                        <span>{formatTime(post.created_at)}</span>
                        {post.category_icon && (
                          <>
                            <span>•</span>
                            <span>{post.category_icon} {isZh ? post.category_name_zh : post.category_name_en}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-text-muted">
                      <span className="text-sm">👁️ {post.view_count}</span>
                      <span className="text-sm">❤️ {post.like_count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          {!session && (
            <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {isZh ? "加入社区" : "Join the Community"}
              </h3>
              <p className="text-text-secondary mb-6">
                {isZh
                  ? "登录后即可参与讨论，分享您的养生经验"
                  : "Sign in to participate in discussions and share your wellness experience"}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => signIn("github")}
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                >
                  GitHub
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium border border-gray-200"
                >
                  Google
                </button>
              </div>
            </div>
          )}

          {/* Quiz CTA */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/tools/body-type-quiz`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-green-600/20"
            >
              🎯 {isZh ? "测试你的体质类型" : "Test Your Body Type"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
