"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
};

// Assign a colour and emoji to each category by name
const categoryStyles: Record<string, { color: string; emoji: string }> = {
  Finance:    { color: "from-green-400 to-emerald-600",  emoji: "💰" },
  Technology: { color: "from-blue-400 to-indigo-600",    emoji: "🚀" },
  Payments:   { color: "from-purple-400 to-pink-600",    emoji: "💳" },
};

const defaultStyle = { color: "from-indigo-400 to-purple-600", emoji: "📂" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Categories</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">Browse articles by topic</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="h-36 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-400">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const style = categoryStyles[cat.name] ?? defaultStyle;
              return (
                <Link key={cat.id} href={`/blog?category=${cat.slug}`}>
                  <div className={`bg-gradient-to-br ${style.color} rounded-xl p-6 text-white hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}>
                    <div className="text-4xl mb-3">{style.emoji}</div>
                    <h2 className="text-xl font-bold">{cat.name}</h2>
                    <p className="text-white/80 text-sm mt-1">
                      {cat._count.posts} {cat._count.posts === 1 ? "article" : "articles"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
