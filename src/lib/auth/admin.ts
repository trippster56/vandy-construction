import { redirect } from "next/navigation";
import { auth } from "./server";

export const LOGIN_PATH = "/admin/login";

/**
 * Signing in is not enough to see the admin — the account's email must also be
 * in ADMIN_EMAILS. Neon Auth can't restrict sign-ups yet, so this allowlist is
 * what keeps a stray account (or a Google sign-in) out.
 */
export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

/** Gate for every admin page and server action. Returns the signed-in admin. */
export async function requireAdmin() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect(LOGIN_PATH);
  // The login page explains the denial and offers sign-out.
  if (!isAdminEmail(session.user.email)) redirect(LOGIN_PATH);
  return session.user;
}
