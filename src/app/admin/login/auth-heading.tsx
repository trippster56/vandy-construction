import { siteConfig } from "@/lib/site-config";

export default function AuthHeading({
  title,
  description,
}: {
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {siteConfig.short}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">{title}</h1>
      <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
      {description && <p className="mt-5 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
