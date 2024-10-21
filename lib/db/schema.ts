import { relations } from "drizzle-orm";
import { int, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export const users_relations = relations(users, ({ many }) => ({
  tasks: many(tasks, {
    relationName: "tasks",
  }),
}));

export const tasks = sqliteTable("tasks", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  isDone: integer({ mode: "boolean" }).notNull(),
  userId: int().references(() => users.id),
});
