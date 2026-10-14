import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackToSignIn({ className }: { className?: string }) {
  return (
    <Link href="/admin/login" className={cn(buttonVariants({ variant: "outline" }), "h-10 w-full", className)}>
      <ArrowLeft />
      Back to sign in
    </Link>
  );
}
