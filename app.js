import express from "express";
import cors from "cors";
import multer from "multer";

// Routes
import routes from "./src/routes/routes.js";

// Swagger

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Titanic API",
      version: "1.0.0",
      description: "All endpoints needed",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

// Route for Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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