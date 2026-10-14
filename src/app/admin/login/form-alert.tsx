import { cn } from "@/lib/utils";

/** Inline message under an auth form — red for errors, neutral for confirmations. */
export default function FormAlert({
  tone = "error",
  children,
}: {
  tone?: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg border px-3 py-2.5 text-sm",
        tone === "error"
          ? "border-destructive/20 bg-destructive/5 text-destructive"
          : "border-primary/15 bg-primary/5 text-foreground",
      )}
    >
      {children}
    </p>
  );
}
