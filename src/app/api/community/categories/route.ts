import { NextResponse } from "next/server";
import { getCloudflareContext } from "@/lib/cloudflare";
import { mockCategories, mockPosts } from "@/lib/mockData";

export async function GET() {
  const { env } = getCloudflareContext();

  if (!env.DB) {
    const categoriesWithCount = mockCategories.map(cat => ({
      ...cat,
      actual_post_count: mockPosts.filter(p => p.category_id === cat.id).length,
    }));
    return NextResponse.json({ categories: categoriesWithCount });
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