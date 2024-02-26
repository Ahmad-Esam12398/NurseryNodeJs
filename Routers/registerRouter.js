const express = require("express");
const controller = require("./../Controllers/registerController")
const {body} = require("express-validator");


const router = express.Router();

router.patch(("/register"),[
    body("id").isInt().withMessage("Id must be a number"),
    body("name").isAlpha().withMessage("name must contain only alphatics")
                .isLength({min:3, max:10}).withMessage("Name length must be between 3 and 10 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({min:5, max:15}).withMessage("Password length must be between 5 and 15 characters")
], controller.register)
module.exports = router;


/**
 * @swagger
 * /register:
 *   post:
 *     description: Registeration
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: User Name
 *                              example: AhmadEsam
 *                              minLength: 3
 *                              maxLength: 10
 *                          passsword:
 *                              type: string
 *                              description: user's newPassword
 *                              example: 87654321
 *                              minLength: 5
 *                              maxLength: 15
 *     responses:
 *       201:
 *          description: Success
 *       422:
 *          description: validation Error
 *       
 * 
 */