import { config } from "dotenv";
config();

// We define port and mongo uri
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/titanic";

export const PORT = process.env.PORT || 4000;
