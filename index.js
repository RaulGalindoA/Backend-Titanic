import app from "./app.js";
import { PORT } from "./config.js";
import "./database.js";

// We start the server 
app.listen(PORT)
console.log("SERVER ON PORT", app.get("port"));