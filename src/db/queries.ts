import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages, type SubmissionType } from "./schema";

function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

export async function getAdminStats() {
  if (!isDatabaseConfigured() || !db) {
    return { messages: 0, subcontractors: 0 };
  }
  const [messageCount] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.type, "estimate"));
  const [subCount] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.type, "subcontractor"));
  return { messages: messageCount.value, subcontractors: subCount.value };
}

export async function saveContactMessage(data: {
  type?: SubmissionType;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  trade?: string;
  licensedInsured?: string;
  subject?: string;
  message?: string;
}) {
  if (!isDatabaseConfigured() || !db) {
    console.log("[db] DATABASE_URL not set — skipping contact message save");
    return null;
  }
  const [msg] = await db.insert(contactMessages).values(data).returning();
  return msg;
}
