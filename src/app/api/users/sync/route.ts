import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// POST /api/users/sync
// Called when an admin first visits the dashboard.
// It checks if their Clerk account exists in our DB — if not, creates it.
export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get the full user profile from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const name  = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || email;

    // upsert = update if exists, create if not — safe to call multiple times
    const user = await prisma.user.upsert({
      where:  { email },
      update: { name },
      create: {
        id:       userId,   // use Clerk's userId as our DB id
        name,
        email,
        password: "",       // empty — Clerk handles passwords, not us
        role:     "ADMIN",
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
