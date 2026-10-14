import { auth } from "@/lib/auth/server";
import { LOGIN_PATH } from "@/lib/auth/admin";

// Validates + refreshes the session cookie on admin routes and bounces signed-out
// visitors to the login page. The admin email allowlist is checked server-side
// in requireAdmin() — this only proves *someone* is signed in.
export default auth.middleware({ loginUrl: LOGIN_PATH });

export const config = {
  // Everything under /admin except the login page itself.
  matcher: ["/admin", "/admin/((?!login).*)"],
};
