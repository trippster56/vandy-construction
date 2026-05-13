import { count } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "./schema";

function isDatabaseConfigured() {
  return !!process.env.DATABASE_URL;
}

export async function getAdminStats() {
  if (!isDatabaseConfigured() || !db) {
    return { products: 0, blogPosts: 0, messages: 0, orders: 0 };
  }
  const [[messageCount]] = await Promise.all([
    db.select({ value: count() }).from(contactMessages),
  ]);
  return { products: 0, blogPosts: 0, messages: messageCount.value, orders: 0 };
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
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
