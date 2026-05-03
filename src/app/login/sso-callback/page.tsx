// This page handles the redirect after Google/SSO login
// Clerk automatically completes the authentication here
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
