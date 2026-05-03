import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-white font-extrabold text-xl">
            Infinity<span className="text-indigo-400">Pay Blog</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Your trusted source for insights on finance, digital payments,
            and emerging technology. Written by experts, for everyone.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[
              { label: "Twitter",  href: "#", icon: "𝕏"  },
              { label: "LinkedIn", href: "#", icon: "in" },
              { label: "GitHub",   href: "#", icon: "⌥"  },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { label: "Home",       href: "/"           },
              { label: "Blog",       href: "/blog"       },
              { label: "Categories", href: "/categories" },
              { label: "About",      href: "/about"      },
              { label: "Contact",    href: "/contact"    },
            ].map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-indigo-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Topics</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { label: "Finance",    slug: "finance"    },
              { label: "Payments",   slug: "payments"   },
              { label: "Technology", slug: "technology" },
            ].map((cat) => (
              <li key={cat.label}>
                <Link href={`/blog?category=${cat.slug}`} className="hover:text-indigo-400 transition-colors">
                  {cat.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link href="/admin" className="hover:text-indigo-400 transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} InfinityPay Blog. All rights reserved.</p>
        <p className="mt-1">Built with Next.js · Tailwind CSS · Supabase · Prisma · Clerk</p>
      </div>
    </footer>
  );
}
