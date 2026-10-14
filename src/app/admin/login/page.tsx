import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth/server";
import { isAdminEmail } from "@/lib/auth/admin";
import { siteConfig } from "@/lib/site-config";
import LoginForm from "./login-form";
import SignedInElsewhere from "./signed-in-elsewhere";

// Reads the session cookie, so it has to render per request.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in | Vandy Construction Admin",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const { data: session } = await auth.getSession();
  const email = session?.user?.email;
  if (email && isAdminEmail(email)) redirect("/admin");

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel — a finished Vandy kitchen under the same navy scrim as the hero. */}
      <aside className="relative isolate flex min-h-56 flex-col justify-between overflow-hidden bg-primary-dark p-6 text-white sm:p-10 lg:min-h-0 lg:p-14">
        <Image
          src="/images/vandy-kitchen.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="-z-10 object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(16,21,61,0.55)_0%,rgba(16,21,61,0.35)_40%,rgba(16,21,61,0.92)_100%)]"
        />

        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
          <span>Est. {siteConfig.established}</span>
          <span>{siteConfig.city}</span>
        </div>

        <div className="mt-10 lg:mt-0">
          <Image
            src={siteConfig.logo}
            alt=""
            width={72}
            height={72}
            className="mb-6 hidden h-14 w-auto lg:block"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            Team admin
          </p>
          <h2 className="mt-3 max-w-md text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
            Every lead, in one place.
          </h2>
          <p className="mt-4 hidden max-w-sm text-white/75 lg:block">
            {siteConfig.tagline}
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <section className="flex items-center justify-center px-4 py-12 sm:px-10 lg:py-16">
        <div className="w-full max-w-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {siteConfig.short}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">Sign in</h1>
          <div className="mt-4 mb-8 h-1 w-12 rounded-full bg-primary" />

          {email ? <SignedInElsewhere email={email} /> : <LoginForm />}

          <div className="mt-10 flex items-center justify-between border-t border-border pt-6 text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Back to site
            </Link>
            <span className="text-muted-foreground">Team access only</span>
          </div>
        </div>
      </section>
    </div>
  );
}
