import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  // Connecting to the mongoose db with the giving uri
  const db = await mongoose.connect(MONGODB_URI);
  // const db = await mongoose.connect(`mongodb://mongo/titanic`);
  console.log("Database is connected to", db.connection.name);
} catch (error) {
  console.error(error.message);
}