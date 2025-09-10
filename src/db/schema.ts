import { pgTable, serial, varchar, integer, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  company: varchar("company", { length: 256 }).notNull(),
  activity: integer("activity").default(0).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  leadsCount: integer("leads_count").default(0).notNull(),
  requestStatus: varchar("request_status", { length: 50 }).default("pending"),
});
