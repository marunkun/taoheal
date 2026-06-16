import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";
import { createMockComment, mockComments } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Missing postId parameter" }, { status: 400 });
  }

  const { env } = getCloudflareContext();

  if (!env.DB) {
    return NextResponse.json({ comments: mockComments[postId] || [] });
  }

  try {
    const result = await env.DB
      .prepare(`
        SELECT * FROM comments 
        WHERE post_id = ? 
        ORDER BY created_at ASC
      `)
      .bind(postId)
      .all();

    return NextResponse.json({ comments: result.results });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { env } = getCloudflareContext();

  try {
    const body = await request.json();
    const { postId, content, authorId, authorName, authorImage, parentId } = body;

    if (!postId || !content || !authorId || !authorName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!env.DB) {
      const newComment = createMockComment({
        postId,
        content,
        authorId,
        authorName,
        authorImage,
        parentId,
      });
      return NextResponse.json({ id: newComment.id, message: "Comment added successfully" }, { status: 201 });
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