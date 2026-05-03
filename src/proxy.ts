import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are protected (require login)
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",          // all admin pages
  "/api/posts(.*)",      // post create/edit/delete APIs
  "/api/categories(.*)", // category manage APIs
]);

// Public routes that Clerk should never block
const isPublicRoute = createRouteMatcher([
  "/",
  "/blog(.*)",
  "/categories(.*)",
  "/about",
  "/contact",
  "/login(.*)",          // includes /login/sso-callback
  "/api/contact(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // If someone tries to access an admin route, check if they're logged in
  if (isAdminRoute(req)) {
    await auth.protect(); // redirects to /login if not authenticated
  }
});

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
