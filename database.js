import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  const db = await mongoose.connect(MONGODB_URI);
  // const db = await mongoose.connect(`mongodb://mongo/titanic`);
  console.log("Database is connected to", db.connection.name);
} catch (error) {
  console.error(error.message);
}
