import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routers/userRoute.js";
import messageRouter from "./routers/messageRoute.js";
import { dbConnect } from "./configs/dbConfig.js";
import { initSocket } from "./socket.io/server.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = [
  "http://localhost:5173",
  "https://realtime-chat-app-ma9c.onrender.com",
];
// CORS with credentials
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Required for ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files (add this before your routes)
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// HTTP Server + Socket.io
const server = http.createServer(app);
try {
  dbConnect();
  initSocket(server);
  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Server start error:", error.message);
}
