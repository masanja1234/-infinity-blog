"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: string;
  author:   { name: string };
  category: { name: string; slug: string };
  _count:   { comments: number };
};

type Category = { id: string; name: string; slug: string };

export default function BlogPage() {
  const [posts,          setPosts]          = useState<Post[]>([]);
  const [categories,     setCategories]     = useState<Category[]>([]);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState(""); // empty = all
  const [loading,        setLoading]        = useState(true);

  // Fetch posts whenever search or category changes
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const params = new URLSearchParams();
      if (search)         params.set("search",   search);
      if (activeCategory) params.set("category", activeCategory);

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (res.ok) setPosts(await res.json());
      setLoading(false);
    }
    fetchPosts();
  }, [search, activeCategory]);

  // Fetch categories once on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            All Articles
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">
            Explore the latest from InfinityPay Blog
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActiveCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === ""
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-indigo-400"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-indigo-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-64 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-lg">No articles found.</p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-3 text-indigo-600 hover:underline text-sm">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

// ─── Post Card Component ───────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">

        {/* Cover image or placeholder */}
        <div className="h-44 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-4xl opacity-50">✍️</span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Category badge */}
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
            {post.category.name}
          </span>

          {/* Title */}
          <h2 className="mt-2 font-bold text-gray-900 dark:text-white text-lg leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Footer — author + date + comments */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400">
            <span>By {post.author.name}</span>
            <div className="flex items-center gap-3">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>💬 {post._count.comments}</span>
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}
