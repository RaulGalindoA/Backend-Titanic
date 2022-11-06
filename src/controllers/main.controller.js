// const { Person } =  require('../models/Person')
import Person from "../models/Person.js";
import csvtojson from "csvtojson";

export const addPerson = async (req, res) => {
  // Defining the attributes from the Post Method
  const {
    Survived,
    Pclass,
    Name,
    Sex,
    Age,
    SiblingsSpouses,
    ParentsChildren,
    Fare,
  } = req.body;
  try {
    // Create a new person with the given attributes
    const newPerson = new Person({
      Survived,
      Pclass,
      Name,
      Sex,
      Age,
      SiblingsSpouses,
      ParentsChildren,
      Fare,
    });

    // Check if the name of the person already exists
    let exist = await Person.find({ Name });

    // if exists, return error message
    if (exist.length > 0) {
      res.status(500).json({ message: "This person exists already.", isSuccess: false });
    } else {
      // If no exists, we create it
      const personSaved = await newPerson.save();
      res
        .status(201)
        .json({ message: "Person saved correctly", isSuccess: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updatePerson = async (req, res) => {
  // Getting all attributes from the post method
  const {
    _id,
    Survived,
    Pclass,
    Name,
    Sex,
    Age,
    SiblingsSpouses,
    ParentsChildren,
    Fare,
  } = req.body;
  try {
    // We update the person with the given id 
    await Person.findByIdAndUpdate(
      { _id },
      {
        Survived,
        Pclass,
        Name,
        Sex,
        Age,
        SiblingsSpouses,
        ParentsChildren,
        Fare,
      }
    );
    // return success message
    res.status(201).json({ message: "Person updated successfully" });
  } catch (error) {
    console.log(error);
    // In case of error, we return it
    return res.status(500).json(error);
  }
};

export const deletePerson = async (req, res) => {
  // We get the id from the person to delete
  const { _id } = req.body;

  try {
    // Delete the person from the database
    await Person.deleteOne({ _id });
    // We return success message
    res.status(201).json({ message: "Person deleted successfully" });
  } catch (error) {
    // In case of error, we return it 
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAll = async (req, res) => {
  // We get all parameters from the url
  const { pageSize, pageNumber, pclass, name, sex } = req.query;

  // Declare an empty JSON for the filters
  let filters = {};

  // For each filter, if it exists, we add it to the json
  if (pclass) filters.Pclass = pclass;
  if (name) filters.Name = { $regex: ".*" + name + ".*" };
  if (sex) filters.Sex = sex;

  // We look for persons with the filters (in case they exist)
  let persons = await Person.find(filters)
    .skip(pageNumber * pageSize)
    .limit(pageSize);
  res.status(201).json({ data: persons, length: await Person.count(filters) });
};

export const importData = async (req, res) => {
  // We receive a parameter if the user wants to look for existing persons
  const { check } = req.body;

  // Using a library to convert the csv file to json
  const json = await csvtojson().fromFile("./public/" + req.file.filename);

  // We create an empty array for all the persons we will add
  let insert = [];

  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    var keys = Object.keys(element);
    // If we want to check if the person name exists
    if (check == "true") {
      let exist = await Person.find({ Name: element[keys[2]] });
      // If the person name does not exists in the database, we add it to the array
      if (exist.length == 0) {
        insert.push({
          Survived: element[keys[0]],
          Pclass: element[keys[1]],
          Name: element[keys[2]],
          Sex: element[keys[3]],
          Age: element[keys[4]],
          SiblingsSpouses: element[keys[5]],
          ParentsChildren: element[keys[6]],
          Fare: element[keys[7]],
        });
      } else {
        // console.log("you exist already");
      }
    } else {
      // We add it to the array
      insert.push({
        Survived: element[keys[0]],
        Pclass: element[keys[1]],
        Name: element[keys[2]],
        Sex: element[keys[3]],
        Age: element[keys[4]],
        SiblingsSpouses: element[keys[5]],
        ParentsChildren: element[keys[6]],
        Fare: element[keys[7]],
      });
    }
  }

  // We add all the persons added in the array
  await Person.insertMany(insert);

  // we return a success message
  res.status(201).json({ message: "Persons added successfully." });
};
