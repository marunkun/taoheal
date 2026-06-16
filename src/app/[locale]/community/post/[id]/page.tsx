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
      <div className="min-h-screen bg-bg-section flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-text-muted">{isZh ? "加载中..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-section flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-text-muted mb-4">{isZh ? "帖子不存在" : "Post not found"}</p>
          <Link
            href={"/" + locale + "/community"}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
          >
            {isZh ? "返回社区" : "Back to Community"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-section">
      {showNameInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {isZh ? "设置您的昵称" : "Set Your Nickname"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isZh ? "输入一个昵称，即可在社区发帖和评论" : "Enter a nickname to post and comment in the community"}
            </p>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
              placeholder={isZh ? "您的昵称" : "Your nickname"}
              maxLength={20}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNameInput(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {isZh ? "取消" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  if (userNameInput.trim()) {
                    saveName(userNameInput.trim());
                  }
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
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
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6"
        >
          <span>←</span>
          <span>{isZh ? "返回社区" : "Back to Community"}</span>
        </Link>

        <article className="bg-white rounded-2xl p-8 border border-border mb-8">
          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            {post.category_icon && (
              <>
                <span>{post.category_icon}</span>
                <span>{isZh ? post.category_name_zh : post.category_name_en}</span>
                <span>•</span>
              </>
            )}
            <span>{formatTime(post.created_at)}</span>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold overflow-hidden">
              {post.author_image ? (
                <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover" />
              ) : (
                post.author_name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="font-medium text-text-primary">{post.author_name}</div>
              <div className="text-sm text-text-muted">
                👁️ {post.view_count} {isZh ? "浏览" : "views"}
              </div>
            </div>
          </div>

          <div className="prose max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </article>

        <div className="bg-white rounded-2xl p-8 border border-border">
          <h2 className="text-xl font-bold text-text-primary mb-6">
            {isZh ? "评论" : "Comments"} ({comments.length})
          </h2>

          {user ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-text-muted">{user.name}</span>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[100px]"
                placeholder={isZh ? "写下你的评论..." : "Write your comment..."}
                required
              />
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium"
                >
                  {isZh ? "发表评论" : "Post Comment"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-6 bg-bg-section rounded-xl text-center">
              <p className="text-text-muted mb-4">{isZh ? "设置昵称后发表评论" : "Set nickname to post comments"}</p>
              <button
                onClick={() => setShowNameInput(true)}
                className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium"
              >
                {isZh ? "设置昵称" : "Set Nickname"}
              </button>
            </div>
          )}

          {comments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💭</div>
              <p className="text-text-muted">{isZh ? "还没有评论，快来发表第一个评论吧！" : "No comments yet. Be the first to comment!"}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                    {comment.author_image ? (
                      <img src={comment.author_image} alt={comment.author_name} className="w-full h-full object-cover" />
                    ) : (
                      comment.author_name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text-primary">{comment.author_name}</span>
                      <span className="text-xs text-text-muted">{formatTime(comment.created_at)}</span>
                    </div>
                    <p className="text-text-secondary">{comment.content}</p>
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