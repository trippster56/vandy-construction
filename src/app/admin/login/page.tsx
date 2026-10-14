import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/server";
import { isAdminEmail } from "@/lib/auth/admin";
import AuthHeading from "./auth-heading";
import FormAlert from "./form-alert";
import GoogleButton from "./google-button";
import LoginForm from "./login-form";
import SignedInElsewhere from "./signed-in-elsewhere";

// Reads the session cookie, so it has to render per request.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in | Vandy Construction Admin",
};

/** Error codes Neon appends when the Google round trip fails. */
function googleError(code: string) {
  if (code === "signup_disabled") {
    return "That Google account isn't set up for admin access. Use a team email, or sign in with your password.";
  }
  // Existing account whose email isn't marked verified, so Neon won't attach Google to it.
  if (code === "account_not_linked") {
    return "Google couldn't be linked to your account yet. Sign in with your email and password for now.";
  }
  return "Google sign-in didn't finish. Try again, or use your email and password.";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; error?: string }>;
}) {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email;
  if (email && isAdminEmail(email)) redirect("/admin");

  const { reset, error } = await searchParams;

  return (
    <>
      <AuthHeading title="Sign in" />
      {email ? (
        <SignedInElsewhere email={email} />
      ) : (
        <div className="space-y-5">
          {reset === "done" && (
            <FormAlert tone="success">Password saved. Sign in with your new password.</FormAlert>
          )}
          {error && <FormAlert>{googleError(error)}</FormAlert>}

          <GoogleButton />

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <Separator className="flex-1" />
            or
            <Separator className="flex-1" />
          </div>

          <LoginForm />
        </div>
      )}
    </>
  );
}
