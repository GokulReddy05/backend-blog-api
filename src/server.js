import "dotenv/config";
import express from "express";
import prisma from "./config/db.js";
import postRoutes from "./routes/postRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import authRoutes from "./routes/authRoute.js";


const app = express();
const PORT = 3000;

app.use(express.json());


app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/auth", authRoutes);



async function startServer() {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();