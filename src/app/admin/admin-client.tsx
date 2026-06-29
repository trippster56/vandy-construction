"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Eye,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Settings, label: "Settings" },
];

interface AdminClientProps {
  stats: {
    messages: number;
  };
}

export default function AdminClient({ stats }: AdminClientProps) {
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Per questionnaire 6.3: Josh wants traffic + form-submission visibility.
  const statCards = [
    {
      icon: MessageSquare,
      label: "Form Submissions",
      value: stats.messages.toString(),
      note: "From contact form",
      color: "bg-primary",
    },
    {
      icon: Eye,
      label: "Page Views",
      value: "—",
      note: "Connect Google Analytics",
      color: "bg-secondary",
    },
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
            Overview of leads and site activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-2xl">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{stat.note}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-2xl">
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Form submissions are stored in the database and emailed on arrival.
              Once Google Analytics is connected, traffic will appear here too.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
