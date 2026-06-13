import { db } from "./index";
import { eq, ilike } from "drizzle-orm";
import { 
    usersTable,
    productsTable, 
    commentsTable, 
    type User, 
    type UserInsert,
    type Product, 
    type ProductInsert,
    type Comment,
    type CommentInsert 
} from "./schema";

export const createUser = async (data: UserInsert) => {
    const [user] = await db.insert(usersTable).values(data).returning();
    return user;
};

export const getUserById = async (id: string) => {
    return await db.query.usersTable.findFirst({where: eq(usersTable.id, id)});
};

type UserUpdate = Partial<Pick<User, "email" | "name" | "imageUrl">>;

export const updateUser = async (id: string, data: UserUpdate) => {
    const [user] = await db.update(usersTable).set(data).where(eq(usersTable.id, id)).returning();
    return user;
};

export const upsertUser = async (data: UserInsert) => {
    const [user] = await db
        .insert(usersTable)
        .values(data)
        .onConflictDoUpdate({
            target: usersTable.id,
            set: data,
        })
        .returning();
    return user;
};

export const createProduct = async (data: ProductInsert) => {
    const [product] = await db.insert(productsTable).values(data).returning();
    return product;
};

export const getAllProducts = async () => {
    return await db.query.productsTable.findMany({
        with: {user: true}, 
        orderBy: (products, {desc}) => [desc(products.createdAt)]});
};

export const getProductById = async (id: string) => {
    return await db.query.productsTable.findFirst({
        where: eq(productsTable.id, id),
        with: {user: true},
        orderBy: (comments, {desc}) => [desc(comments.createdAt)],
    });
};

export const getProductsByUserId = async (userId: string) => {
    return await db.query.productsTable.findMany({
        where: eq(productsTable.userId, userId),
        with: {user: true},
        orderBy: (products, {desc}) => [desc(products.createdAt)],
    });
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
    const [product] = await db.update(productsTable).set(data).where(eq(productsTable.id, id)).returning();
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const deleteProduct = async (id: string) => {
    const [product] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

export const createComment = async (data: CommentInsert) => {
    const [comment] = await db.insert(commentsTable).values(data).returning();
    return comment;
};

export const deleteComment = async (id: string) => {
    const [comment] = await db.delete(commentsTable).where(eq(commentsTable.id, id)).returning();
    if (!comment) {
        throw new Error("Comment not found");
    }
    return comment;
};
