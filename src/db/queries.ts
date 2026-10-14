import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages, type SubmissionType } from "./schema";

function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

export async function getAdminStats() {
  if (!isDatabaseConfigured() || !db) {
    return { messages: 0, subcontractors: 0, unread: 0 };
  }
  const [messageCount] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.type, "estimate"));
  const [subCount] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.type, "subcontractor"));
  return {
    messages: messageCount.value,
    subcontractors: subCount.value,
    unread: await getUnreadCount(),
  };
}

export async function getUnreadCount() {
  if (!isDatabaseConfigured() || !db) return 0;
  const [row] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.read, false));
  return row.value;
}

/** Every submission, newest first — the admin inbox filters client-side. */
export async function getContactMessages() {
  if (!isDatabaseConfigured() || !db) return [];
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function setContactMessageRead(id: number, read: boolean) {
  if (!isDatabaseConfigured() || !db) return;
  await db.update(contactMessages).set({ read }).where(eq(contactMessages.id, id));
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
