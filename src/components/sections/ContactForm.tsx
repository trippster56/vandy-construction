"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, HardHat, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRADES, OTHER_TRADE } from "@/data/trades";

type Status = "idle" | "submitting" | "success" | "error";
export type FormMode = "estimate" | "subcontractor";

const MODES: { value: FormMode; label: string; icon: typeof Ruler }[] = [
  { value: "estimate", label: "I need an estimate", icon: Ruler },
  { value: "subcontractor", label: "I'm a subcontractor", icon: HardHat },
];

/**
 * Native "Connect with us" form → posts to /api/contact (Resend).
 *
 * Two paths behind one tab switch, so the customer estimate flow stays the
 * default and subcontractors get their own fields instead of calling Josh:
 *   estimate      → name, email, message required
 *   subcontractor → name, email, phone, trade required
 *
 * `initialMode` lets /contact?for=subcontractor (and the /subcontractors
 * alias) open straight onto the subcontractor tab.
 */
export default function ContactForm({
  initialMode = "estimate",
}: {
  initialMode?: FormMode;
}) {
  const [mode, setMode] = useState<FormMode>(initialMode);
  const [status, setStatus] = useState<Status>("idle");
  const [preferredContact, setPreferredContact] = useState("Email");
  const [trade, setTrade] = useState("");
  const [licensedInsured, setLicensedInsured] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isSub = mode === "subcontractor";

  function reset() {
    setPreferredContact("Email");
    setTrade("");
    setLicensedInsured("");
  }

  function switchMode(next: FormMode) {
    if (next === mode) return;
    setMode(next);
    setStatus("idle");
    setError(null);
    reset();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // The trade select isn't a native input, so validate it ourselves.
    if (isSub && !trade) {
      setError("Please choose the trade you work in.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const resolvedTrade =
      trade === OTHER_TRADE
        ? `${OTHER_TRADE}: ${String(data.get("otherTrade") || "").trim() || "unspecified"}`
        : trade;

    const payload = isSub
      ? {
          type: "subcontractor",
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          trade: resolvedTrade,
          licensedInsured,
          message: data.get("message"),
        }
      : {
          type: "estimate",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          preferredContact,
          message: data.get("message"),
        };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      form.reset();
      reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center text-center gap-4">
        <CheckCircle2 size={48} className="text-primary" />
        <h3 className="text-xl font-bold text-foreground">
          {isSub ? "Thanks — you're on our list." : "Thanks — we got your message."}
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          {isSub
            ? "We've added your info to our subcontractor list and we'll reach out when we have work that fits your trade."
            : "We'll be in touch shortly. For anything urgent, feel free to give us a call."}
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          {isSub ? "Submit another trade" : "Send another message"}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-8">
      <h3 className="text-xl font-bold text-foreground mb-2">Connect with us</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Choose the option that fits you and we&apos;ll take it from there.
      </p>

      {/* Path switch — customers vs. trade partners */}
      <div
        role="tablist"
        aria-label="What brings you here"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8"
      >
        {MODES.map((m) => {
          const Icon = m.icon;
          const active = mode === m.value;
          return (
            <Button
              key={m.value}
              type="button"
              role="tab"
              aria-selected={active}
              variant={active ? "default" : "outline"}
              onClick={() => switchMode(m.value)}
              className="justify-start gap-2 h-auto py-3"
            >
              <Icon size={18} />
              {m.label}
            </Button>
          );
        })}
      </div>

      <p className="text-muted-foreground text-sm mb-6">
        {isSub
          ? "Tell us who you are and what you do. We'll keep your info on file and reach out when a job matches your trade — no need to call."
          : "Tell us about your project and we'll get right back to you."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone{isSub ? "" : <OptionalHint />}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required={isSub}
              autoComplete="tel"
              placeholder="(843) 000-0000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </div>

        {isSub ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="company">
                Company<OptionalHint />
              </Label>
              <Input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Your business name, if you have one"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trade">Trade</Label>
              <Select value={trade} onValueChange={(v) => setTrade(v ?? "")}>
                <SelectTrigger id="trade" className="w-full">
                  <SelectValue placeholder="Select your trade" />
                </SelectTrigger>
                <SelectContent>
                  {TRADES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {trade === OTHER_TRADE && (
              <div className="space-y-2">
                <Label htmlFor="otherTrade">What trade do you work in?</Label>
                <Input id="otherTrade" name="otherTrade" placeholder="Tell us your trade" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="licensedInsured">
                Licensed &amp; insured?<OptionalHint />
              </Label>
              <Select value={licensedInsured} onValueChange={(v) => setLicensedInsured(v ?? "")}>
                <SelectTrigger id="licensedInsured" className="w-full">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Licensed & insured">Licensed &amp; insured</SelectItem>
                  <SelectItem value="Insured only">Insured only</SelectItem>
                  <SelectItem value="Not yet">Not yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="preferredContact">Preferred contact method</Label>
            <Select value={preferredContact} onValueChange={(v) => setPreferredContact(v ?? "Email")}>
              <SelectTrigger id="preferredContact" className="w-full">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="message">
            {isSub ? "Anything else" : "Message"}
            {isSub && <OptionalHint />}
          </Label>
          <Textarea
            id="message"
            name="message"
            required={!isSub}
            rows={isSub ? 4 : 5}
            placeholder={
              isSub
                ? "Years in business, areas you cover, crew size, references…"
                : "Tell us about your project…"
            }
          />
        </div>

        {status === "error" && error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting"
            ? "Sending…"
            : isSub
              ? "Submit my info"
              : "Send message"}
          <ArrowRight size={18} />
        </Button>
      </form>
    </div>
  );
}

function OptionalHint() {
  return <span className="text-muted-foreground font-normal"> (optional)</span>;
}
