"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth(); // true if the user is logged in

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          Infinity<span className="text-gray-900 dark:text-white">Pay Blog</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <li><Link href="/"           className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link></li>
          <li><Link href="/blog"       className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link></li>
          <li><Link href="/categories" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Categories</Link></li>
          <li><Link href="/about"      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link></li>
          <li><Link href="/contact"    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link></li>

          {/* Show Dashboard link if logged in, Login button if not */}
          {isSignedIn ? (
            <>
              <li>
                <Link href="/admin" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              {/* UserButton = Clerk's avatar + dropdown (logout, profile, etc.) */}
              <li><UserButton afterSignOutUrl="/" /></li>
            </>
          ) : (
            <li>
              <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Theme toggle + hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/"           onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Home</Link>
          <Link href="/blog"       onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Blog</Link>
          <Link href="/categories" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Categories</Link>
          <Link href="/about"      onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">About</Link>
          <Link href="/contact"    onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Contact</Link>
          {isSignedIn ? (
            <>
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="w-fit px-4 py-2 bg-indigo-600 text-white rounded-lg">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
