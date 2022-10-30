const mongoose = require('mongoose');

const { HOST, DATABASE } = process.env

const MONGODB_URI = `mongodb://${HOST}/${DATABASE}`
 
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log("conectado"))
.catch(err => console.log(err))