import express from 'express';
import bookRoutes from './routes/bookRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use("/api/books/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/books/health", (req, res) => {
    res.send("Book service is running");
});
app.use('/books', bookRoutes);

// Global error handler
app.use(errorHandler);

export default app;