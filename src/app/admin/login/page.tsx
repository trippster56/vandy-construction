import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isAdminEmail } from "@/lib/auth/admin";
import AuthHeading from "./auth-heading";
import FormAlert from "./form-alert";
import LoginForm from "./login-form";
import SignedInElsewhere from "./signed-in-elsewhere";

// Reads the session cookie, so it has to render per request.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in | Vandy Construction Admin",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email;
  if (email && isAdminEmail(email)) redirect("/admin");

  const { reset } = await searchParams;

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
          <LoginForm />
        </div>
      )}
    </>
  );
}
