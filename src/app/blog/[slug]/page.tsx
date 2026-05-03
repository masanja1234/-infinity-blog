"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

type Comment = {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  createdAt: string;
  author:   { id: string; name: string };
  category: { id: string; name: string; slug: string };
  comments: Comment[];
};

type RelatedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: string;
};

export default function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: resolvedSlug } = use(params);
  const [post,         setPost]         = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [notFound,     setNotFound]     = useState(false);

  // Comment form state
  const [name,         setName]         = useState("");
  const [email,        setEmail]        = useState("");
  const [comment,      setComment]      = useState("");
  const [submitting,   setSubmitting]   = useState(false);
  const [submitted,    setSubmitted]    = useState(false);

  useEffect(() => {
    async function load() {
      const listRes = await fetch(`/api/posts?search=${resolvedSlug}`);
      const posts   = await listRes.json();

      // Find exact slug match
      const found = posts.find((p: any) => p.slug === resolvedSlug);
      if (!found) { setNotFound(true); setLoading(false); return; }

      // Fetch full post with comments
      const postRes = await fetch(`/api/posts/${found.id}`);
      if (!postRes.ok) { setNotFound(true); setLoading(false); return; }
      const postData = await postRes.json();
      setPost(postData);

      // Fetch related posts from same category
      const relRes = await fetch(`/api/posts?category=${postData.category.slug}`);
      if (relRes.ok) {
        const all = await relRes.json();
        // Exclude the current post, take first 3
        setRelatedPosts(all.filter((p: any) => p.id !== postData.id).slice(0, 3));
      }

      setLoading(false);
    }
    load();
  }, [resolvedSlug]);

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    await fetch("/api/comments", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post!.id, content: comment, authorName: name, authorEmail: email }),
    });

    setSubmitted(true);
    setSubmitting(false);
    setName(""); setEmail(""); setComment("");
  }

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <p className="text-gray-400 animate-pulse">Loading article...</p>
    </main>
  );

  if (notFound) return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 gap-4">
      <p className="text-5xl">📭</p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
      <Link href="/blog" className="text-indigo-600 hover:underline">← Back to Blog</Link>
    </main>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mb-8">
          ← Back to Blog
        </Link>

        {/* Category badge */}
        <Link
          href={`/blog?category=${post!.category.slug}`}
          className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wide mb-4"
        >
          {post!.category.name}
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
          {post!.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {post!.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{post!.author.name}</p>
            <p>{new Date(post!.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>

        {/* Cover image */}
        {post!.coverImage && (
          <img src={post!.coverImage} alt={post!.title} className="w-full rounded-xl mb-8 object-cover max-h-80" />
        )}

        {/* Article content */}
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-[1.05rem]">
          {post!.content}
        </div>

        {/* ── Related Posts ─────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">{new Date(rp.createdAt).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Comments Section ──────────────────── */}
        <section className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Comments ({post!.comments.length})
          </h2>

          {/* Comment list */}
          {post!.comments.length === 0 ? (
            <p className="text-gray-400 text-sm mb-8">No comments yet. Be the first!</p>
          ) : (
            <div className="flex flex-col gap-4 mb-10">
              {post!.comments.map((c) => (
                <div key={c.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      {c.authorName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{c.authorName}</span>
                    <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{c.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Leave a comment form */}
          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl p-4 text-sm">
              ✅ Your comment has been submitted. Thank you!
            </div>
          ) : (
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Leave a Comment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="self-start px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          )}
        </section>

      </div>
    </main>
  );
}
