"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

// Google's four-colour "G" — brand mark, so not from lucide.
function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.11A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.61H1.28A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4.01 3.11C6.23 6.88 8.88 4.77 12 4.77z"
      />
    </svg>
  );
}

/**
 * Starts the Google round trip from the browser: our /api/auth handler sets a
 * one-time challenge cookie, Google returns through Neon to /admin with a
 * verifier, and the proxy swaps the pair for a session. requireAdmin() then
 * applies the same ADMIN_EMAILS allowlist as password sign-in.
 */
export default function GoogleButton() {
  const [pending, setPending] = useState(false);

  async function start() {
    setPending(true);
    const origin = window.location.origin;
    const { error } = await authClient.signIn.social({
      provider: "google",
      // Absolute: Neon redirects here from its own domain. Must be a proxied
      // path (not the login page) so the verifier gets exchanged.
      callbackURL: `${origin}/admin`,
      // Neon appends ?error=<code> (e.g. signup_disabled for an unknown account).
      errorCallbackURL: `${origin}/admin/login`,
    });
    // On success the client navigates away to Google.
    if (error) window.location.assign("/admin/login?error=google");
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={pending}
      onClick={start}
      className="h-10 w-full text-sm"
    >
      {pending ? <Loader2 className="animate-spin" /> : <GoogleMark />}
      Continue with Google
    </Button>
  );
}
