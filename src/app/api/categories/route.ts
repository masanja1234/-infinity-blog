import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────
// GET /api/categories
// Returns all categories from the database
// ─────────────────────────────────────────
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }, // alphabetical order
      include: {
        _count: { select: { posts: true } }, // include how many posts each category has
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────
// POST /api/categories
// Creates a new category
// Body: { name: "Finance", slug: "finance" }
// ─────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    // Validate — both fields are required
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name, slug },
    });

    return NextResponse.json(category, { status: 201 }); // 201 = Created
  } catch (error: any) {
    // P2002 = Prisma unique constraint failed (duplicate name or slug)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A category with that name or slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
