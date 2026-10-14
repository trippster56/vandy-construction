import { Button } from "@/components/ui/button";
import { signOut } from "./actions";

/** Signed in, but not on the ADMIN_EMAILS allowlist. */
export default function SignedInElsewhere({ email }: { email: string }) {
  return (
    <div className="space-y-5">
      <p role="alert" className="rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground">
        You&apos;re signed in as <span className="font-semibold">{email}</span>, which doesn&apos;t
        have admin access.
      </p>
      <form action={signOut}>
        <Button type="submit" variant="outline" className="h-10 w-full">
          Sign out and use a different account
        </Button>
      </form>
    </div>
  );
}
