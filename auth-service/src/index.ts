import express from "express";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes.js";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(express.json());

app.use("/api/auth/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/auth/health", (req, res) => {
    res.send("server auth is running");
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server auth is running on port 3000");
});