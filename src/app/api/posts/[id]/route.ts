import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────
// GET /api/posts/:id
// Returns a single post with its comments
// ─────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author:   { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
        comments: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────
// PUT /api/posts/:id
// Updates an existing post
// ─────────────────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, coverImage, published, categoryId } = body;

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        ...(title      !== undefined && { title }),
        ...(slug       !== undefined && { slug }),
        ...(content    !== undefined && { content }),
        ...(excerpt    !== undefined && { excerpt }),
        ...(coverImage !== undefined && { coverImage }),
        ...(published  !== undefined && { published }),
        ...(categoryId !== undefined && { categoryId }),
      },
      include: {
        author:   { select: { id: true, name: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────
// DELETE /api/posts/:id
// Deletes a post and all its comments (cascade)
// ─────────────────────────────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
