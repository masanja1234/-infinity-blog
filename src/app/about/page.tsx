import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full uppercase tracking-widest mb-4">
            About Us
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            We write about what matters — <br />
            <span className="text-indigo-600 dark:text-indigo-400">Finance, Payments & Technology</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            InfinityPay Blog was created to bridge the gap between complex financial topics
            and everyday people. We believe everyone deserves access to clear, honest,
            and actionable financial insights.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon:  "🎯",
              title: "Our Mission",
              text:  "To simplify finance and technology for everyone — from first-time investors to seasoned professionals — through clear, well-researched content.",
            },
            {
              icon:  "🔭",
              title: "Our Vision",
              text:  "A world where financial literacy is accessible to all, empowering individuals and businesses to make smarter decisions with confidence.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* What we cover */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">What We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { emoji: "💰", title: "Finance",    desc: "Investment tips, budgeting strategies, and economic analysis." },
              { emoji: "💳", title: "Payments",   desc: "Digital payments, mobile money, crypto, and fintech trends." },
              { emoji: "🚀", title: "Technology", desc: "How emerging tech is reshaping the financial industry." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-10 mb-16 text-white text-center">
          <h2 className="text-2xl font-bold mb-8">InfinityPay Blog by the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { value: "50+",  label: "Articles Published" },
              { value: "10K+", label: "Monthly Readers"    },
              { value: "3",    label: "Topic Categories"   },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-extrabold">{stat.value}</p>
                <p className="text-indigo-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to start reading?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Browse Articles
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
