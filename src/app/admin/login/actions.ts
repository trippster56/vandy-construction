"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { LOGIN_PATH, isAdminEmail } from "@/lib/auth/admin";

export type SignInState = { error: string; email: string } | null;

// One message for "unknown email", "not an admin", and "wrong password", so the
// form never confirms which addresses have accounts.
const INVALID = "That email and password don't match an admin account.";

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password.", email };
  if (!isAdminEmail(email)) return { error: INVALID, email };

  const { error } = await auth.signIn.email({ email, password });
  if (error) {
    const unreachable = String(error.code ?? "").startsWith("NETWORK_");
    return {
      error: unreachable ? "Couldn't reach the sign-in service. Try again in a minute." : INVALID,
      email,
    };
  }

  redirect("/admin");
}

export async function signOut() {
  await auth.signOut();
  redirect(LOGIN_PATH);
}
