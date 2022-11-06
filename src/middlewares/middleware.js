import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Defining the route where the file will be saved
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    // adding a personalized name to the file with extension
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
// Declaring the constant that will save the file
const upload = multer({ storage /* dest: "public/" */ });
export { upload };