import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/comments
// Adds a new comment to a blog post
// Body: { postId, content, authorName, authorEmail }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, content, authorName, authorEmail } = body;

    if (!postId || !content || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: { postId, content, authorName, authorEmail },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
