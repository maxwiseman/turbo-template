import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

import { mySqlTable } from "./_table";

export const post = mySqlTable("post", {
  id: int("id").primaryKey(),
  title: text("name", { length: 256 }).notNull(),
  content: text("content", { length: 256 }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
});
