"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const links = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
];

export default function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();

  return (
    <aside className="border-b border-border bg-muted px-4 py-3 lg:w-64 lg:shrink-0 lg:border-r lg:border-b-0 lg:p-6">
      <h2 className="mb-6 hidden text-lg font-bold text-foreground lg:block">Admin Panel</h2>
      <nav className="flex gap-1 lg:flex-col">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                buttonVariants({ variant: active ? "default" : "ghost" }),
                "justify-start gap-3 lg:w-full"
              )}
            >
              <Icon size={18} />
              {link.label}
              {link.href === "/admin/messages" && unread > 0 && (
                <Badge variant={active ? "secondary" : "default"} className="ml-auto">
                  {unread}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
