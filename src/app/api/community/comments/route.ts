import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";

// 添加评论
export async function POST(request: NextRequest) {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { postId, content, authorId, authorName, authorImage, parentId } = body;

    if (!postId || !content || !authorId || !authorName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await env.DB
      .prepare(`
        INSERT INTO comments (id, post_id, author_id, author_name, author_image, content, parent_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(id, postId, authorId, authorName, authorImage || null, content, parentId || null, now, now)
      .run();

    return NextResponse.json({ id, message: "Comment added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Failed to add comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}
