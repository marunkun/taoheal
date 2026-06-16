import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";
import { mockPosts, mockCategories, createMockPost } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { env } = getCloudflareContext();

  if (!env.DB) {
    let filteredPosts = [...mockPosts];
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category_id === parseInt(category)
      );
    }

    filteredPosts.sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) return b.is_pinned ? 1 : -1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const offset = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / limit),
      },
    });
  }

  try {
    const offset = (page - 1) * limit;
    let query = `
      SELECT p.*, c.name_zh as category_name_zh, c.name_en as category_name_en, c.icon as category_icon
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
    `;
    const params: (string | number)[] = [];

    if (category) {
      query += ` WHERE p.category_id = ?`;
      params.push(parseInt(category));
    }

    query += ` ORDER BY p.is_pinned DESC, p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await env.DB
      .prepare(query)
      .bind(...params)
      .all();

    let countQuery = `SELECT COUNT(*) as total FROM posts`;
    if (category) {
      countQuery += ` WHERE category_id = ?`;
    }
    const countResult = await env.DB
      .prepare(countQuery)
      .bind(category ? parseInt(category) : undefined)
      .first();

    const total = Number(countResult?.total) || 0;

    return NextResponse.json({
      posts: result.results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { env } = getCloudflareContext();

  try {
    const body = await request.json();
    const { title, content, categoryId, authorId, authorName, authorImage } = body;

    if (!title || !content || !authorId || !authorName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!env.DB) {
      const newPost = createMockPost({
        title,
        content,
        categoryId,
        authorId,
        authorName,
        authorImage,
      });
      return NextResponse.json({ id: newPost.id, message: "Post created successfully" }, { status: 201 });
    }

    const id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await env.DB
      .prepare(`
        INSERT INTO posts (id, title, content, author_id, author_name, author_image, category_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(id, title, content, authorId, authorName, authorImage || null, categoryId || null, now, now)
      .run();

    if (categoryId) {
      await env.DB
        .prepare(`UPDATE categories SET post_count = post_count + 1 WHERE id = ?`)
        .bind(categoryId)
        .run();
    }

    return NextResponse.json({ id, message: "Post created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}