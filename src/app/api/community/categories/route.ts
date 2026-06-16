import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";

// 获取分类列表
export async function GET() {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const result = await env.DB
      .prepare(`
        SELECT c.*, COUNT(p.id) as actual_post_count
        FROM categories c
        LEFT JOIN posts p ON c.id = p.category_id
        GROUP BY c.id
        ORDER BY c.id
      `)
      .all();

    return NextResponse.json({ categories: result.results });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
