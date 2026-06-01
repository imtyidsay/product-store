import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL })) // allow cors
app.use(clerkMiddleware()) // auth obj will be attached to the request object
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({ extended: true })) // parse urlencoded bodies

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