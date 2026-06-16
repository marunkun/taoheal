"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

interface Comment {
  id: string;
  content: string;
  author_name: string;
  author_image: string;
  created_at: string;
  parent_id: string | null;
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

  return { user, showNameInput, setShowNameInput, saveName };
}

export default function PostPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: localeParam, id } = use(params);
  const locale = localeParam || "zh";
  const isZh = locale === "zh";

  const { user, showNameInput, setShowNameInput, saveName } = useUser();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    try {
      const res = await fetch("/api/community/posts/" + id);
      if (res.ok) {
        const data = await res.json();
        setPost(data.post);
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      setShowNameInput(true);
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/community/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: id,
          content: newComment,
          authorId: "user_" + user.name + "_" + Date.now(),
          authorName: user.name,
          authorImage: null,
        }),
      });

      if (res.ok) {
        setNewComment("");
        fetchPost();
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return isZh ? "刚刚" : "Just now";
    if (hours < 24) return isZh ? hours + " 小时前" : hours + " hours ago";
    if (days < 7) return isZh ? days + " 天前" : days + " days ago";
    return date.toLocaleDateString();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
            <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-500">{isZh ? "加载中..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-gray-500 mb-4">{isZh ? "帖子不存在" : "Post not found"}</p>
          <Link
            href={"/" + locale + "/community"}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold"
          >
            {isZh ? "返回社区" : "Back to Community"}
          </Link>
        </div>
      </div>
    );
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href={"/" + locale + "/community"}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <span className="text-lg">←</span>
          <span>{isZh ? "返回社区" : "Back to Community"}</span>
        </Link>

        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              {post.category_icon && (
                <span className="text-xl">{post.category_icon}</span>
              )}
              <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                {isZh ? post.category_name_zh : post.category_name_en}
              </span>
              <span className="text-sm text-gray-400">{formatTime(post.created_at)}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>

            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                {post.author_image ? (
                  <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  post.author_name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800">{post.author_name}</div>
                <div className="text-sm text-gray-500">
                  👁️ {post.view_count} {isZh ? "浏览" : "views"}
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {isZh ? "评论" : "Comments"} ({comments.length})
            </h2>
          </div>

          {user ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-600 font-medium">{user.name}</span>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[120px] resize-none"
                placeholder={isZh ? "写下你的评论..." : "Write your comment..."}
                required
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold"
                >
                  {isZh ? "发表评论" : "Post Comment"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-indigo-50 rounded-xl text-center">
              <p className="text-gray-600 mb-4">{isZh ? "设置昵称后发表评论" : "Set nickname to post comments"}</p>
              <button
                onClick={() => setShowNameInput(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold"
              >
                {isZh ? "设置昵称" : "Set Nickname"}
              </button>
            </div>
          )}

          {comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💭</div>
              <p className="text-gray-500">{isZh ? "还没有评论，快来发表第一个评论吧！" : "No comments yet. Be the first to comment!"}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {comment.author_image ? (
                      <img src={comment.author_image} alt={comment.author_name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      comment.author_name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-800">{comment.author_name}</span>
                      <span className="text-xs text-gray-400">{formatTime(comment.created_at)}</span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}