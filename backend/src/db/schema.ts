import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const usersTable = pgTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at",{mode: "date"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at",{mode: "date"}).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const productsTable = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at",{mode: "date"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at",{mode: "date"}).notNull().defaultNow(),
});

export const commentsTable = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    content: text("content").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.id, {onDelete: "cascade"}),
    productId: uuid("product_id")
        .notNull()
        .references(() => productsTable.id, {onDelete: "cascade"}),
    createdAt: timestamp("created_at",{mode: "date"}).notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
    products: many(productsTable),
    comments: many(commentsTable),
}));

export const productsRelations = relations(productsTable, ({ one, many }) => ({
    comments: many(commentsTable),
    user: one(usersTable, {
        fields: [productsTable.userId],
        references: [usersTable.id],
    }),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [commentsTable.userId],
        references: [usersTable.id],
    }),
    product: one(productsTable, { 
        fields: [commentsTable.productId], 
        references: [productsTable.id],
    }),
}));

export type User = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;
export type Product = typeof productsTable.$inferSelect;
export type ProductInsert = typeof productsTable.$inferInsert;
export type Comment = typeof commentsTable.$inferSelect;
export type CommentInsert = typeof commentsTable.$inferInsert;