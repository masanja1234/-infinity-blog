"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: string;
  author:   { name: string };
  category: { name: string; slug: string };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data.slice(0, 3))); // show 3 latest posts
  }, []);

  return (
    <main className="bg-gray-50 dark:bg-gray-950">

      {/* ── Hero ──────────────────────────────── */}
      <section className="px-6 py-24 text-center bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full uppercase tracking-widest mb-5">
            Finance · Payments · Technology
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Welcome to <span className="text-indigo-600 dark:text-indigo-400">InfinityPay</span> Blog
          </h1>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Your trusted source for insights on digital payments, personal finance,
            and the technology shaping tomorrow's economy.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md">
              Read Articles
            </Link>
            <Link href="/categories" className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ── Topic Cards ───────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Finance",    desc: "Smart money moves and investment strategies.",  icon: "💰", slug: "finance"    },
            { title: "Payments",   desc: "The future of digital transactions explained.", icon: "💳", slug: "payments"   },
            { title: "Technology", desc: "How tech is reshaping the financial world.",    icon: "🚀", slug: "technology" },
          ].map((item) => (
            <Link key={item.title} href={`/blog?category=${item.slug}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest Articles ───────────────────── */}
      {posts.length > 0 && (
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
            <Link href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-36 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-4xl opacity-50">✍️</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      {post.category.name}
                    </span>
                    <h3 className="mt-2 font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{post.excerpt}</p>
                    )}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-400">
                      <span>By {post.author.name}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Newsletter CTA ────────────────────── */}
      <section className="bg-indigo-600 dark:bg-indigo-700 px-6 py-16 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-3">Stay in the loop</h2>
          <p className="text-indigo-200 mb-8">Get the latest articles delivered straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-indigo-300 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </main>
  );
}
