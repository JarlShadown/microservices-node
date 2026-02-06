import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import bookRoutes from "./routes/bookRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();
app.use(express.json());

app.use("/api/books/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/books/health", (req, res) => {
    res.send("Book service is running");
});
app.use(authMiddleware);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Book service is running on port ${PORT}`);
});
