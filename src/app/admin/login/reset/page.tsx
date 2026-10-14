import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AuthHeading from "../auth-heading";
import BackToSignIn from "../back-to-sign-in";
import FormAlert from "../form-alert";
import ResetForm from "./reset-form";

export const metadata = {
  title: "Set a new password | Vandy Construction Admin",
};

/**
 * Landing page for the emailed link. Neon checks the token, then redirects here
 * with ?token=… (or ?error=INVALID_TOKEN if it's expired or already used).
 */
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  if (!token || error) {
    return (
      <>
        <AuthHeading title="Link expired" />
        <div className="space-y-5">
          <FormAlert>
            This reset link has expired or was already used. Links last an hour — request a
            fresh one.
          </FormAlert>
          <div className="space-y-3">
            <Link
              href="/admin/login/forgot"
              className={cn(buttonVariants(), "h-10 w-full text-sm")}
            >
              Send a new link
            </Link>
            <BackToSignIn />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthHeading title="Set a new password" description="At least 8 characters." />
      <ResetForm token={token} />
    </>
  );
}
