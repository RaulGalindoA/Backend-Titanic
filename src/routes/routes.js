import {
  addPerson,
  deletePerson,
  getAll,
  importData,
  updatePerson,
} from "../controllers/main.controller.js";

import { Router } from "express";
import { upload } from "../middlewares/middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - Survived
 *         - Pclass
 *         - Name
 *         - Pclass
 *         - Sex
 *         - Age
 *         - SiblingsSpouses
 *         - ParentsChildren
 *         - Fare
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the person
 *         Survived:
 *           type: number
 *           description: If the selected person survived or not 
 *         Pclass:
 *           type: number
 *           description: The class of the ticket bought
 *         Name:
 *           type: string
 *           description: Name of the person
 *         Sex:
 *           type: string
 *           description: Sex of the person
 *         Age:
 *           type: number
 *           description: Age of the person
 *         SiblingsSpouses:
 *           type: number
 *           description: Number of Siblings or Spouses of the passanger
 *         ParentsChildren:
 *           type: number
 *           description: Number of the Parents or Children of the passanger
 *         Fare:
 *           type: number
 *           description: Fare of the bought ticket
 *         
 *       example:
 *        _id: 635effca2c86db8939d4ff1f      
 *        Survived: 1
 *        Pclass: 3
 *        Name: Raúl Galindo Alfonsin
 *        Sex: Male
 *        Age: 22
 *        SiblingsSpouses: 0 
 *        ParentsChildren: 2
 *        Fare: 12.50
 *     newPerson:
 *       type: object
 *       required:
 *         - Survived
 *         - Pclass
 *         - Name
 *         - Pclass
 *         - Sex
 *         - Age
 *         - SiblingsSpouses
 *         - ParentsChildren
 *         - Fare
 *       properties:
 *         Survived:
 *           type: number
 *           description: If the selected person survived or not 
 *         Pclass:
 *           type: number
 *           description: The class of the ticket bought
 *         Name:
 *           type: string
 *           description: Name of the person
 *         Sex:
 *           type: string
 *           description: Sex of the person
 *         Age:
 *           type: number
 *           description: Age of the person
 *         SiblingsSpouses:
 *           type: number
 *           description: Number of Siblings or Spouses of the passanger
 *         ParentsChildren:
 *           type: number
 *           description: Number of the Parents or Children of the passanger
 *         Fare:
 *           type: number
 *           description: Fare of the bought ticket
 *         
 *       example:
 *        Survived: 1
 *        Pclass: 3
 *        Name: Raúl Galindo Alfonsin
 *        Sex: Male
 *        Age: 22
 *        SiblingsSpouses: 0 
 *        ParentsChildren: 2
 *        Fare: 12.50
 * 
 *     dPerson:
 *       type: object
 *       required:
 *         - _id
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the person to delete 
 *         
 *       example:
 *        _id: 635effca2c86db8939d4ff1f
 *        
 *         
 */

 /**
  * @swagger
  * tags:
  *   name: Persons
  *   description: CRUD of Persons
  */

router.post("/person/addPerson", addPerson);

/**
 * @swagger
 * /api/person/addPerson:
 *   post:
 *     summary: Add a new person to the list
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/newPerson'
 *     responses:
 *       200:
 *         description: Response
 *         content:
 *           application/json:
 *            message: Person saved correctly
 *            isSuccess: true
 *       500:
 *         description: Response
 *         content:
 *           application/json:
 *            message: This person exists already.
 *            isSuccess: false
 */

router.post("/person/updatePerson", updatePerson);

/**
 * @swagger
 * /api/person/updatePerson:
 *   post:
 *     summary: Update an existing person of the list
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: Response
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: Person updated successfully
 *                isSuccess: true
 *       500:
 *         description: Response
 *         content:
 *           application/json:
 *            error: error
 */

router.post("/person/deletePerson", deletePerson);

/**
 * @swagger
 * /api/person/deletePerson:
 *   post:
 *     summary: Delete an existing person of the list
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dPerson'
 *     responses:
 *       200:
 *         description: Response
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 *                  description: Person updated successfully
 *                  value: Person updated successfully
 *                isSuccess:
 *                  type: boolean
 *                  description: true
 *       500:
 *         description: Response
 *         content:
 *           application/json:
 *            error: error
 */

router.get("/person/getAll", getAll);

 /**
 * @swagger
 * /api/person/getAll:
 *   get:
 *     summary: Get all persons registered in the system
 *     tags: [Persons]
 *     parameters:
 *      - in: query
 *        name: pageSize
 *      - in: query
 *        name: pageNumber
 *      - in: query
 *        name: pclass
 *      - in: query
 *        name: name
 *      - in: query
 *        name: sex
 *     responses:
 *       200:
 *         description: The list of the persons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */


router.post("/person/import", upload.single("file"), importData);

/**
 * @swagger
 * /api/person/import:
 *    post:
 *      tags: [Persons]
 *      summary: Uploads the CSV file to the database.
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: file
 *          type: file
 *          required: true
 *          description: The file to upload.
 *        - in: formData
 *          name: check
 *          type: string
 *          required: false
 *          description: (true or false) If you want to check every single register looking for not repeated names
 */


export default router;
