"use client";

// ThemeProvider wraps the whole app so every page can use dark/light mode.
// "use client" is required because next-themes uses browser APIs.
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // attribute="class" means it adds/removes the "dark" class on <html>
    // defaultTheme="system" means it follows the user's OS setting on first visit
    // enableSystem allows automatic OS dark/light detection
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
