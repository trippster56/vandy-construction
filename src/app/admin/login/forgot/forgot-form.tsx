"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "../actions";
import BackToSignIn from "../back-to-sign-in";
import FormAlert from "../form-alert";

export default function ForgotForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, null);

  if (state && "sent" in state) {
    return (
      <div className="space-y-5">
        <FormAlert tone="success">
          If <span className="font-semibold">{state.email}</span>
          {" is a team account, a reset link is on its way. It expires in an hour — check spam if you don't see it."}
        </FormAlert>
        <BackToSignIn />
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          defaultValue={state?.email}
          key={state?.email}
          placeholder="you@vandyconstruction.com"
          aria-invalid={state ? true : undefined}
          className="h-10"
        />
      </div>

      {state?.error && <FormAlert>{state.error}</FormAlert>}

      <div className="space-y-3">
        <Button type="submit" disabled={pending} className="h-10 w-full text-sm">
          {pending ? (
            <>
              <Loader2 className="animate-spin" />
              Sending…
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
        <BackToSignIn />
      </div>
    </form>
  );
}
