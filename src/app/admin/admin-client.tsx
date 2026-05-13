"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  HardHat,
  FileText,
  MessageSquare,
  Eye,
  Settings,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: HardHat, label: "Projects" },
  { icon: FileText, label: "Blog Posts" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

interface AdminClientProps {
  stats: {
    products: number;
    blogPosts: number;
    messages: number;
    orders: number;
  };
}

export default function AdminClient({ stats }: AdminClientProps) {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const statCards = [
    { icon: HardHat, label: "Total Projects", value: stats.products.toString(), trend: "From database", color: "bg-blue-500" },
    { icon: FileText, label: "Blog Posts", value: stats.blogPosts.toString(), trend: "From database", color: "bg-green-500" },
    { icon: MessageSquare, label: "Messages", value: stats.messages.toString(), trend: "From database", color: "bg-purple-500" },
    { icon: Eye, label: "Orders", value: stats.orders.toString(), trend: "From database", color: "bg-orange-500" },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden lg:flex w-64 bg-muted border-r border-border flex-col p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Admin Panel</h2>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.label}
                variant={activeLink === link.label ? "default" : "ghost"}
                onClick={() => setActiveLink(link.label)}
                className="w-full justify-start gap-3"
              >
                <Icon size={18} />
                {link.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome to your admin panel. Here&apos;s a quick overview.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <TrendingUp size={14} />
                      {stat.trend}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              This is a starting point for your admin dashboard. Extend it with
              product management, blog editing, message inbox, and more as needed
              for your project.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
