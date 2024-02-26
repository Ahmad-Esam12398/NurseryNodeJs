const express = require("express");
const controller = require("./../Controller/register")
const validationArray = require("./../MW/validations/childsValidator")
const validator = require("./../MW/validations/validator")

const router = express.Router();

router.post("/register", validationArray.insertArray, validator, controller.register);

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
 *                              example: Ahmad Esam
 *                              minLength: 8
 *                              maxLength: 50
 *                          passsword:
 *                              type: string
 *                              description: user's newPassword
 *                              example: 87654321
 *                              minLength: 8
 *                              maxLength: 50
 *     responses:
 *       200:
 *          description: Success
 *       422:
 *          description: validation Error
 *       422:
 *          description: Incorrect validation
 *       
 * 
 */