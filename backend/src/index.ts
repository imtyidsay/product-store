import express from "express";
import { ENV } from "./config/env";

const app = express();

app.get("/", (req, res) => {
    res.json({ 
        message: "Welcome to Productify Store API - Powered by PostgreSQL, Drizzle ORM, and Clerk Authentication", 
        endpoints:{
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        }
    });
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});