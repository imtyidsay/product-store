"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
