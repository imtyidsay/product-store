"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentById = exports.deleteComment = exports.createComment = exports.deleteProduct = exports.updateProduct = exports.getProductsByUserId = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.upsertUser = exports.updateUser = exports.getUserById = exports.createUser = void 0;
const index_1 = require("./index");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("./schema");
const createUser = async (data) => {
    const [user] = await index_1.db.insert(schema_1.usersTable).values(data).returning();
    return user;
};
exports.createUser = createUser;
const getUserById = async (id) => {
    return await index_1.db.query.usersTable.findFirst({ where: (0, drizzle_orm_1.eq)(schema_1.usersTable.id, id) });
};
exports.getUserById = getUserById;
const updateUser = async (id, data) => {
    const [user] = await index_1.db.update(schema_1.usersTable).set(data).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id)).returning();
    return user;
};
exports.updateUser = updateUser;
const upsertUser = async (data) => {
    const [user] = await index_1.db
        .insert(schema_1.usersTable)
        .values(data)
        .onConflictDoUpdate({
        target: schema_1.usersTable.id,
        set: data,
    })
        .returning();
    return user;
};
exports.upsertUser = upsertUser;
const createProduct = async (data) => {
    const [product] = await index_1.db.insert(schema_1.productsTable).values(data).returning();
    return product;
};
exports.createProduct = createProduct;
const getAllProducts = async () => {
    return await index_1.db.query.productsTable.findMany({
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    });
};
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    return await index_1.db.query.productsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.productsTable.id, id),
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
    });
};
exports.getProductById = getProductById;
const getProductsByUserId = async (userId) => {
    return await index_1.db.query.productsTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.productsTable.userId, userId),
        with: { user: true },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });
};
exports.getProductsByUserId = getProductsByUserId;
const updateProduct = async (id, data) => {
    const existingProduct = await (0, exports.getProductById)(id);
    if (!existingProduct) {
        throw new Error("Product not found");
    }
    const [product] = await index_1.db.update(schema_1.productsTable).set(data).where((0, drizzle_orm_1.eq)(schema_1.productsTable.id, id)).returning();
    return product;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const existingProduct = await (0, exports.getProductById)(id);
    if (!existingProduct) {
        throw new Error("Product not found");
    }
    const [product] = await index_1.db.delete(schema_1.productsTable).where((0, drizzle_orm_1.eq)(schema_1.productsTable.id, id)).returning();
    return product;
};
exports.deleteProduct = deleteProduct;
const createComment = async (data) => {
    const [comment] = await index_1.db.insert(schema_1.commentsTable).values(data).returning();
    return comment;
};
exports.createComment = createComment;
const deleteComment = async (id) => {
    const existingComment = await (0, exports.getCommentById)(id);
    if (!existingComment) {
        throw new Error("Comment not found");
    }
    const [comment] = await index_1.db.delete(schema_1.commentsTable).where((0, drizzle_orm_1.eq)(schema_1.commentsTable.id, id)).returning();
    return comment;
};
exports.deleteComment = deleteComment;
const getCommentById = async (id) => {
    return index_1.db.query.commentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.commentsTable.id, id),
        with: { user: true },
    });
};
exports.getCommentById = getCommentById;
