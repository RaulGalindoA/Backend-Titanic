import mongoose from 'mongoose';
import { config } from "dotenv"
config();

const { HOST, DATABASE } = process.env

const MONGODB_URI = `mongodb://admin:admin@${HOST}/${DATABASE}`
 
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log("conectado"))
.catch(err => console.log(err))