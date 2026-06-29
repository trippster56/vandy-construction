import { count } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "./schema";

function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

export async function getAdminStats() {
  if (!isDatabaseConfigured() || !db) {
    return { messages: 0 };
  }
  const [messageCount] = await db.select({ value: count() }).from(contactMessages);
  return { messages: messageCount.value };
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  preferredContact?: string;
  subject?: string;
  message: string;
}) {
  if (!isDatabaseConfigured() || !db) {
    console.log("[db] DATABASE_URL not set — skipping contact message save");
    return null;
  }
  const [msg] = await db.insert(contactMessages).values(data).returning();
  return msg;
}
