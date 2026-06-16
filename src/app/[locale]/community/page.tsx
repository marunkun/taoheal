"use client";

import { useState, useEffect, use } from "react";
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

function useUser() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("daoheal_user_name");
    if (savedName) {
      setUser({ name: savedName });
    }
  }, []);

  function saveName(name: string) {
    localStorage.setItem("daoheal_user_name", name);
    setUser({ name });
    setShowNameInput(false);
  }

  function clearName() {
    localStorage.removeItem("daoheal_user_name");
    setUser(null);
  }

  return { user, showNameInput, setShowNameInput, saveName, clearName };
}

export default function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = use(params);
  const locale = localeParam || "zh";
  const isZh = locale === "zh";

  const { user, showNameInput, setShowNameInput, saveName, clearName } = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", categoryId: "" });
  const [loading, setLoading] = useState(true);
  const [userNameInput, setUserNameInput] = useState("");

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
    if (!user) {
      setShowNameInput(true);
      return;
    }

    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newPost,
          categoryId: newPost.categoryId || null,
          authorId: `user_${user.name}_${Date.now()}`,
          authorName: user.name,
          authorImage: null,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {showNameInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                👤
              </div>
              <h3 className="text-xl font-bold text-gray-800">{isZh ? "设置您的昵称" : "Set Your Nickname"}</h3>
              <p className="text-gray-500 mt-2">{isZh ? "输入昵称即可参与社区讨论" : "Enter a nickname to join the community"}</p>
            </div>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-6 transition-all"
              placeholder={isZh ? "您的昵称" : "Your nickname"}
              maxLength={20}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameInput(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                {isZh ? "取消" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (userNameInput.trim()) {
                    saveName(userNameInput.trim());
                  }
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!userNameInput.trim()}
              >
                {isZh ? "确认" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {isZh ? "养生社区" : "Wellness Community"}
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6">
            {isZh
              ? "与全球养生爱好者交流，分享经验，共同成长"
              : "Connect with wellness enthusiasts worldwide, share experiences, and grow together"}
          </p>

          {user ? (
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-lg rounded-2xl px-5 py-3 border border-white/20">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">{user.name}</div>
                <button
                  onClick={clearName}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {isZh ? "更换昵称" : "Change name"}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNameInput(true)}
              className="px-8 py-4 bg-white text-primary-700 rounded-2xl hover:bg-white/90 transition-all font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              {isZh ? "设置昵称开始参与" : "Set nickname to participate"}
            </button>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{isZh ? "讨论分类" : "Categories"}</h2>
              <p className="text-gray-500 mt-1">{isZh ? "选择一个分类浏览相关讨论" : "Choose a category to explore discussions"}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span>📚</span>
              <span>{isZh ? "全部" : "All"}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                selectedCategory === null ? "bg-white/20" : "bg-gray-100"
              }`}>
                {posts.length}
              </span>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                <span>{isZh ? category.name_zh : category.name_en}</span>
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category.id ? "bg-white/20" : "bg-gray-100"
                }`}>
                  {category.actual_post_count || 0}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <button
                onClick={() => {
                  if (!user) {
                    setShowNameInput(true);
                  } else {
                    setShowPostForm(!showPostForm);
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold shadow-lg shadow-primary-500/20"
              >
                <span className="text-xl">✏️</span>
                <span>{showPostForm ? (isZh ? "取消发布" : "Cancel") : (isZh ? "发布新帖子" : "Create New Post")}</span>
              </button>

              {showPostForm && user && (
                <form onSubmit={handleCreatePost} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{isZh ? "标题" : "Title"}</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder={isZh ? "输入帖子标题..." : "Enter post title..."}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{isZh ? "分类" : "Category"}</label>
                    <select
                      value={newPost.categoryId}
                      onChange={(e) => setNewPost({ ...newPost, categoryId: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">{isZh ? "选择分类（可选）" : "Select category (optional)"}</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {isZh ? c.name_zh : c.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{isZh ? "内容" : "Content"}</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[150px] resize-none"
                      placeholder={isZh ? "分享您的养生经验..." : "Share your wellness experience..."}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-500">{isZh ? `以 "${user.name}" 的名义发布` : `Posting as "${user.name}"`}</span>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold"
                    >
                      {isZh ? "发布帖子" : "Publish Post"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {isZh ? "讨论列表" : "Discussions"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isZh ? "看看大家最近在讨论什么" : "See what everyone is discussing"}
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                    <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-gray-500">{isZh ? "加载中..." : "Loading..."}</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">💭</div>
                  <p className="text-gray-500 mb-4">
                    {isZh ? "还没有帖子，来发起第一个讨论吧！" : "No posts yet. Start the first discussion!"}
                  </p>
                  <button
                    onClick={() => {
                      if (!user) {
                        setShowNameInput(true);
                      } else {
                        setShowPostForm(true);
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold"
                  >
                    {isZh ? "发布帖子" : "Create Post"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/${locale}/community/post/${post.id}`}
                      className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-primary-100"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
                        {post.author_image ? (
                          <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          post.author_name?.charAt(0).toUpperCase() || "?"
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          {post.category_icon && (
                            <span className="flex-shrink-0 text-sm">{post.category_icon}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>{post.author_name}</span>
                          <span>•</span>
                          <span>{formatTime(post.created_at)}</span>
                          {post.category_name_zh && (
                            <>
                              <span>•</span>
                              <span>{isZh ? post.category_name_zh : post.category_name_en}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
                        <span>👁️ {post.view_count || 0}</span>
                        <span>❤️ {post.like_count || 0}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!user && (
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-indigo-50 rounded-3xl p-8 text-center border border-primary-100">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {isZh ? "加入社区" : "Join the Community"}
              </h3>
              <p className="text-gray-500 mb-6">
                {isZh
                  ? "设置昵称后即可参与讨论，分享您的养生经验"
                  : "Set a nickname to participate in discussions and share your wellness experience"}
              </p>
              <button
                onClick={() => setShowNameInput(true)}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold shadow-lg shadow-primary-500/20"
              >
                {isZh ? "设置昵称" : "Set Nickname"}
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/tools/body-type-quiz`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all font-semibold shadow-lg shadow-amber-500/20"
            >
              <span>🎯</span>
              <span>{isZh ? "测试你的体质类型" : "Test Your Body Type"}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}