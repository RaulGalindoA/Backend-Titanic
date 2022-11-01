// const { Person } =  require('../models/Person')
import Person from "../models/Person.js";
import csvtojson from "csvtojson";

export const addPerson = async (req, res) => {
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

    let exist = await Person.find({ Name });

    if (exist.length > 0) {
      res.status(500).json({ message: "This person exists already." });
    } else {
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
    console.log(_id);
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
    res.status(201).json({ message: "Person updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deletePerson = async (req, res) => {
  const { _id } = req.body;
  try {
    await Person.deleteOne({ _id });
    res.status(201).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAll = async (req, res) => {
  const { pageSize, pageNumber, pclass, name, sex } = req.query;

  let filters = {};

  if (pclass) filters.Pclass = pclass;
  if (name) filters.Name = { $regex: ".*" + name + ".*" };
  if (sex) filters.Sex = sex;

  let persons = await Person.find(filters)
    .skip(pageNumber * pageSize)
    .limit(pageSize);
  res.status(201).json({ data: persons, length: await Person.count() });
};

export const importData = async (req, res) => {
  const { check } = req.body;

  const json = await csvtojson().fromFile("./public/" + req.file.filename);

  let insert = [];

  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    var keys = Object.keys(element);
    if (check == "true") {
      let exist = await Person.find({ Name: element[keys[2]] });
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

  await Person.insertMany(insert);

  //   res.status(201).json(json);
  res.status(201).json({ message: "Pasajeros insertados correctamente." });
};
