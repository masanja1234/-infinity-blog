import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────
// GET /api/posts
// Returns all published posts
// Optional query: /api/posts?category=finance
//                 /api/posts?search=bitcoin
// ─────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category"); // filter by category slug
    const search   = searchParams.get("search");   // search in title or content

    const posts = await prisma.post.findMany({
      where: {
        published: true, // only return live posts, not drafts
        ...(category && { category: { slug: category } }),
        ...(search && {
          OR: [
            { title:   { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        author:   { select: { id: true, name: true } }, // include author name
        category: { select: { id: true, name: true, slug: true } },
        _count:   { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" }, // newest first
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────
// POST /api/posts
// Creates a new blog post
// Body: { title, slug, content, excerpt, coverImage, published, authorId, categoryId }
// ─────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, coverImage, published, authorId, categoryId } = body;

    // Validate required fields
    if (!title || !slug || !content || !authorId || !categoryId) {
      return NextResponse.json(
        { error: "title, slug, content, authorId and categoryId are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt:    excerpt    || null,
        coverImage: coverImage || null,
        published:  published  ?? false,
        authorId,
        categoryId,
      },
      include: {
        author:   { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A post with that slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
