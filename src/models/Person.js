import mongoose from "mongoose";

// Defining person model with all the attributes and the type of each one
const PersonSchema = new mongoose.Schema({
  Survived: {
    type: Number,
    required: true,
  },
  Pclass: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  SiblingsSpouses: {
    type: Number,
    required: true,
  },
  ParentsChildren: {
    type: Number,
    required: true,
  },
  Fare: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Person", PersonSchema);