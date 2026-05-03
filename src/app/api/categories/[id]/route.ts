import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: { posts: true },
    });
    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json(category, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, slug } = await request.json();
    const category = await prisma.category.update({ where: { id }, data: { name, slug } });
    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") return NextResponse.json({ error: "Category not found" }, { status: 404 });
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
