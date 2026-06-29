import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

// ─── Contact Messages ───────────────────────────────
// The only table this site needs: lead submissions from the contact form.
// (Shop/blog/orders tables were removed — not in scope per the questionnaire.)
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  // Preferred way to be reached, per questionnaire 10.1: "email" | "text"
  preferredContact: varchar("preferred_contact", { length: 20 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── Inferred Types ─────────────────────────────────
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
