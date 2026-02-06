import authMiddleware from "./middlewares/authMiddleware.js";
import app from "./app.js";

app.use(authMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Book service is running on port ${PORT}`);
});
