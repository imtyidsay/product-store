"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsRelations = exports.productsRelations = exports.usersRelations = exports.commentsTable = exports.productsTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    name: (0, pg_core_1.text)("name").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});
exports.productsTable = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { mode: "date" }).notNull().defaultNow(),
});
exports.commentsTable = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    content: (0, pg_core_1.text)("content").notNull(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.usersTable.id, { onDelete: "cascade" }),
    productId: (0, pg_core_1.uuid)("product_id")
        .notNull()
        .references(() => exports.productsTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "date" }).notNull().defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.usersTable, ({ many }) => ({
    products: many(exports.productsTable),
    comments: many(exports.commentsTable),
}));
exports.productsRelations = (0, drizzle_orm_1.relations)(exports.productsTable, ({ one, many }) => ({
    comments: many(exports.commentsTable),
    user: one(exports.usersTable, {
        fields: [exports.productsTable.userId],
        references: [exports.usersTable.id],
    }),
}));
exports.commentsRelations = (0, drizzle_orm_1.relations)(exports.commentsTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.commentsTable.userId],
        references: [exports.usersTable.id],
    }),
    product: one(exports.productsTable, {
        fields: [exports.commentsTable.productId],
        references: [exports.productsTable.id],
    }),
}));
