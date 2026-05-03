import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "InfinityPay Blog",
  description: "Your trusted source for finance, payments, and technology news.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // ClerkProvider gives every page access to auth state (logged in / logged out)
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <ThemeProvider>
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
