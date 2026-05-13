import { getAdminStats } from "@/db/queries";
import AdminClient from "./admin-client";

export default async function AdminPage() {
  const stats = await getAdminStats();
  return <AdminClient stats={stats} />;
}
