"use server";

import { revalidatePath } from "next/cache";
import { setContactMessageRead } from "@/db/queries";
import { requireAdmin } from "@/lib/auth/admin";

// Server actions are public endpoints — each one re-checks the admin session.
export async function markMessageRead(id: number, read: boolean) {
  await requireAdmin();
  if (!Number.isInteger(id)) return;
  await setContactMessageRead(id, read);
  revalidatePath("/admin", "layout");
}
