"use server";

import { revalidatePath } from "next/cache";
import { setContactMessageRead } from "@/db/queries";

// TODO(auth): server actions are public endpoints — once admin login lands,
// check the session here too, not just in the /admin layout.
export async function markMessageRead(id: number, read: boolean) {
  if (!Number.isInteger(id)) return;
  await setContactMessageRead(id, read);
  revalidatePath("/admin", "layout");
}
