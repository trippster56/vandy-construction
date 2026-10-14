"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { LOGIN_PATH, isAdminEmail } from "@/lib/auth/admin";

export type SignInState = { error: string; email: string } | null;

// One message for "unknown email", "not an admin", and "wrong password", so the
// form never confirms which addresses have accounts.
const INVALID = "That email and password don't match an admin account.";
const UNREACHABLE = "Couldn't reach the sign-in service. Try again in a minute.";

const isNetworkError = (error: { code?: string } | null) =>
  String(error?.code ?? "").startsWith("NETWORK_");

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password.", email };
  if (!isAdminEmail(email)) return { error: INVALID, email };

  const { error } = await auth.signIn.email({ email, password });
  if (error) return { error: isNetworkError(error) ? UNREACHABLE : INVALID, email };

  redirect("/admin");
}

export async function signOut() {
  await auth.signOut();
  redirect(LOGIN_PATH);
}

export type ForgotState = { sent: true; email: string } | { error: string; email: string } | null;

/**
 * Emails a reset link (sent by Neon Auth, not Resend). Also how a new admin sets
 * their first password: accounts made in the Neon Console have none.
 */
export async function requestPasswordReset(
  _prev: ForgotState,
  formData: FormData,
): Promise<ForgotState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter your email.", email };

  // Same answer whether or not the address has an account; only allowlisted
  // addresses actually get an email.
  if (isAdminEmail(email)) {
    // The link in the email goes to Neon first, which bounces back here with
    // ?token=… — so it needs this site's absolute origin.
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
    const origin = h.get("origin") ?? `${proto}://${host}`;

    const { error } = await auth.requestPasswordReset({
      email,
      redirectTo: `${origin}${LOGIN_PATH}/reset`,
    });
    if (isNetworkError(error)) return { error: UNREACHABLE, email };
    if (error) console.error("[auth] password reset request failed", error);
  }

  return { sent: true, email };
}

export type ResetState = { error: string } | null;

export async function resetPassword(_prev: ResetState, formData: FormData): Promise<ResetState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) return { error: "Use at least 8 characters." };
  if (password.length > 128) return { error: "Use 128 characters or fewer." };
  if (password !== confirm) return { error: "Those passwords don't match." };

  const { error } = await auth.resetPassword({ newPassword: password, token });
  if (error) {
    if (isNetworkError(error)) return { error: UNREACHABLE };
    return { error: "This reset link has expired or was already used. Request a new one." };
  }

  redirect(`${LOGIN_PATH}?reset=done`);
}
