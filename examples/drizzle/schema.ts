import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name", { length: 64 }).notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  // oxlint-disable-next-line no-use-before-define
  photoId: integer("photo_id").references(() => photos.id),
});

export const photos = sqliteTable("photo", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  size: text("size").notNull(),
});

export const licenses = sqliteTable(
  "license",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    expire: integer("expire", { mode: "timestamp_ms" }).notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (table) => ({
    titleIndex: uniqueIndex("license_title_index").on(table.title),
  })
);

export const organizations = sqliteTable("organization", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  expire: integer("expire", { mode: "timestamp_ms" }).notNull(),
});

export const organizationLicenses = sqliteTable("organization_license", {
  organizationId: integer("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  licenseId: integer("license_id")
    .notNull()
    .references(() => licenses.id, { onDelete: "cascade" }),
});
