import { getUnreadCount } from "@/db/queries";
import { requireAdmin } from "@/lib/auth/admin";
import AdminNav from "./admin-nav";

// Leads change constantly — never prerender the admin at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Vandy Construction",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const unread = await getUnreadCount();
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <AdminNav unread={unread} user={{ name: user.name, email: user.email }} />
      <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-10">{children}</main>
    </div>
  );
}
