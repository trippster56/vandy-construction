"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Native contact form → posts to /api/contact (Resend).
 * Replaces the former JobTread iframe.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [preferredContact, setPreferredContact] = useState("Email");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
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
      setPreferredContact("Email");
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
        <h3 className="text-xl font-bold text-foreground">Thanks — we got your message.</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          We&apos;ll be in touch shortly. For anything urgent, feel free to give us a call.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-8">
      <h3 className="text-xl font-bold text-foreground mb-2">Request an estimate</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Tell us about your project and we&apos;ll get right back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(843) 000-0000" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project…"
          />
        </div>

        {status === "error" && error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
          <ArrowRight size={18} />
        </Button>
      </form>
    </div>
  );
}
