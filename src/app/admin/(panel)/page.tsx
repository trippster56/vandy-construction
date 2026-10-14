import Link from "next/link";
import { MessageSquare, Eye, HardHat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminStats } from "@/db/queries";
import { requireAdmin } from "@/lib/auth/admin";

export default async function AdminPage() {
  await requireAdmin();
  const stats = await getAdminStats();

  // Per questionnaire 6.3: Josh wants traffic + form-submission visibility.
  const statCards = [
    {
      icon: MessageSquare,
      label: "Form Submissions",
      value: stats.messages.toString(),
      note: "Estimate requests",
      color: "bg-primary",
    },
    {
      icon: HardHat,
      label: "Subcontractor Interest",
      value: stats.subcontractors.toString(),
      note: "From the subcontractor tab",
      color: "bg-primary",
    },
    {
      icon: Eye,
      label: "Page Views",
      value: "—",
      note: "Connect Google Analytics",
      color: "bg-muted-foreground",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of leads and site activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-4xl">
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
            {stats.unread > 0
              ? `${stats.unread} unread submission${stats.unread === 1 ? "" : "s"}. `
              : "You're all caught up. "}
            Every form submission is saved and emailed on arrival —{" "}
            <Link href="/admin/messages" className="text-primary font-medium hover:underline">
              open the inbox
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </>
  );
}
