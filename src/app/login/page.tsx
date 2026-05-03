// Login page — uses Clerk's ready-made sign-in UI
// No need to build forms manually — Clerk handles everything
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          Admin Login
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Sign in to manage InfinityPay Blog
        </p>

        {/* Clerk renders a complete, styled login form here */}
        <SignIn />
      </div>
    </main>
  );
}
