import express from "express";
import prisma from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.get("/health", (req, res) => {
    res.send("server is running");
});

app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});