import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString: ENV.DATABASE_URL });

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (error) => {
    console.error("Database connection error:", error);
});

export const db = drizzle({client:pool, schema });