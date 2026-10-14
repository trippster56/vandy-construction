"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { resetPassword } from "../actions";
import FormAlert from "../form-alert";
import PasswordInput from "../password-input";

export default function ResetForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPassword, null);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="token" value={token} />

      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          autoFocus
          aria-invalid={state ? true : undefined}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm password</Label>
        <PasswordInput
          id="confirm"
          name="confirm"
          autoComplete="new-password"
          required
          minLength={8}
          aria-invalid={state ? true : undefined}
        />
      </div>

      {state?.error && <FormAlert>{state.error}</FormAlert>}

      <Button type="submit" disabled={pending} className="h-10 w-full text-sm">
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Saving…
          </>
        ) : (
          "Save password"
        )}
      </Button>
    </form>
  );
}
