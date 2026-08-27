import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

// ─── Contact Messages ───────────────────────────────
// The only table this site needs: submissions from the /contact form.
// Two kinds share the table, discriminated by `type`:
//   "estimate"      → customer lead (name, email, message required)
//   "subcontractor" → trade partner wanting to be considered for jobs
//                     (name, email, phone, trade required; message optional)
// (Shop/blog/orders tables were removed — not in scope per the questionnaire.)
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }).notNull().default("estimate"),
  name: varchar("name", { length: 255 }).notNull(),
  // Subcontractor's business name, when they have one.
  company: varchar("company", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  // Preferred way to be reached, per questionnaire 10.1: "email" | "text"
  preferredContact: varchar("preferred_contact", { length: 20 }),
  // Subcontractor fields — null on customer estimate requests.
  trade: varchar("trade", { length: 120 }),
  licensedInsured: varchar("licensed_insured", { length: 20 }),
  subject: varchar("subject", { length: 255 }),
  // Required for estimate requests, optional for subcontractors.
  message: text("message"),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── Inferred Types ─────────────────────────────────
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
export type SubmissionType = "estimate" | "subcontractor";
