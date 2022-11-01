import express from "express";
import cors from "cors";
import multer from "multer";
// Routes
import routes from "./src/routes/routes.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Files

// Middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routes);

export default app;