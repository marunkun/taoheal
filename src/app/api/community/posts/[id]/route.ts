import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";

// 获取单个帖子详情
export async function GET(request: NextRequest) {
  const { env } = getCloudflareContext();
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("id");

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  if (!env.DB) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    // 获取帖子
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

    // 增加浏览次数
    await env.DB
      .prepare(`UPDATE posts SET view_count = view_count + 1 WHERE id = ?`)
      .bind(postId)
      .run();

    // 获取评论
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
