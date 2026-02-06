import authMiddleware from "./middlewares/authMiddleware.js";
import app from "./app.js";
import { env } from "./config/env.js";

app.use(authMiddleware);

const PORT = env.PORT;
app.listen(PORT, () => {
    console.log(`Book service is running on port ${PORT}`);
});
