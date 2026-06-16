"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { use } from "react";

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

export default function PostPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const resolvedParams = use(params);
  const { locale: localeFromParams, id } = resolvedParams;
  const locale = localeFromParams || "zh";
  const isZh = locale === "zh";

  const { data: session, status } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    setLoading(true);
    try {
      const res = await fetch(`/api/community/posts/${id}`);
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
    if (!session || !newComment.trim()) return;

    try {
      const res = await fetch("/api/community/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: id,
          content: newComment,
          authorId: session.user?.id || session.user?.email,
          authorName: session.user?.name || "Anonymous",
          authorImage: session.user?.image || null,
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
    if (hours < 24) return isZh ? `${hours} 小时前` : `${hours} hours ago`;
    if (days < 7) return isZh ? `${days} 天前` : `${days} days ago`;
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
            href={`/${locale}/community`}
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href={`/${locale}/community`}
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6"
        >
          <span>←</span>
          <span>{isZh ? "返回社区" : "Back to Community"}</span>
        </Link>

        {/* Post Content */}
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

        {/* Comments Section */}
        <div className="bg-white rounded-2xl p-8 border border-border">
          <h2 className="text-xl font-bold text-text-primary mb-6">
            {isZh ? "评论" : "Comments"} ({comments.length})
          </h2>

          {/* Comment Form */}
          {session ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[100px]"
                placeholder={isZh ? "写下你的评论..." : "Write your comment..."}
                required
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={session.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session.user?.name}`}
                    alt={session.user?.name || ""}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-text-muted">{session.user?.name}</span>
                </div>
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
              <p className="text-text-muted mb-4">
                {isZh ? "登录后发表评论" : "Sign in to post comments"}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => signIn("github")}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-medium"
                >
                  GitHub
                </button>
                <button
                  onClick={() => signIn("google")}
                  className="px-6 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 font-medium border border-gray-200"
                >
                  Google
                </button>
              </div>
            </div>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💭</div>
              <p className="text-text-muted">
                {isZh ? "还没有评论，快来发表第一个评论吧！" : "No comments yet. Be the first to comment!"}
              </p>
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
