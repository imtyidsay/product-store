"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const express_2 = require("@clerk/express");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: env_1.ENV.FRONTEND_URL })); // allow cors
app.use((0, express_2.clerkMiddleware)()); // auth obj will be attached to the request object
app.use(express_1.default.json()); // parse json bodies
app.use(express_1.default.urlencoded({ extended: true })); // parse urlencoded bodies
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Productify Store API - Powered by PostgreSQL, Drizzle ORM, and Clerk Authentication",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        }
    });
});
app.listen(env_1.ENV.PORT, () => {
    console.log(`Server is running on port ${env_1.ENV.PORT}`);
});
