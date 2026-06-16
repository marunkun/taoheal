import { NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";
import { mockPosts, mockComments } from "@/lib/mockData";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.pathname.split("/").pop();
  
  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const { env } = getCloudflareContext();

  if (!env.DB) {
    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      post,
      comments: mockComments[postId] || [],
    });
  }

  try {
    const postResult = await env.DB
      .prepare(`
        SELECT p.*, c.name_zh as category_name_zh, c.name_en as category_name_en, c.icon as category_icon
        FROM posts p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?
      `)
      .bind(postId)
      .first();

    if (!postResult) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await env.DB
      .prepare(`UPDATE posts SET view_count = view_count + 1 WHERE id = ?`)
      .bind(postId)
      .run();

    const commentsResult = await env.DB
      .prepare(`
        SELECT * FROM comments
        WHERE post_id = ?
        ORDER BY created_at ASC
      `)
      .bind(postId)
      .all();

    return NextResponse.json({
      post: postResult,
      comments: commentsResult.results,
    });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}