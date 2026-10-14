"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, MessageSquare } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { signOut } from "../login/actions";

const links = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
];

export default function AdminNav({
  unread,
  user,
}: {
  unread: number;
  user: { name: string; email: string };
}) {
  const pathname = usePathname();

  return (
    <aside className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3 lg:w-64 lg:shrink-0 lg:flex-col lg:items-stretch lg:border-r lg:border-b-0 lg:p-6">
      <h2 className="mb-6 hidden text-lg font-bold text-foreground lg:block">Admin Panel</h2>
      <nav className="flex flex-1 gap-1 lg:flex-none lg:flex-col">
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

      <div className="lg:mt-auto lg:border-t lg:border-border lg:pt-4">
        <div className="mb-2 hidden min-w-0 lg:block">
          <p className="truncate text-sm font-medium text-foreground">{user.name || user.email}</p>
          {user.name && <p className="truncate text-xs text-muted-foreground">{user.email}</p>}
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost" className="gap-2 text-muted-foreground lg:w-full lg:justify-start">
            <LogOut size={16} />
            <span className="sr-only sm:not-sr-only">Sign out</span>
          </Button>
        </form>
      </div>
    </aside>
  );
}
