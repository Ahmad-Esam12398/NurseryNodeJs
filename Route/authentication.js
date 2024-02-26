const express = require("express");
const controller = require ("../Controller/authentication");
const route = express.Router();

route.post("/login", controller.login);

module.exports = route;


/**
 * @swagger
 * /login:
 *   post:
 *     description: login to the system
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: user's userName
 *                              example: Ahmad Esam(Admin Account)
 *                          password:
 *                              type: string
 *                              description: user's password
 *                              example: 12345678(Admin Password)
 *     responses:
 *       200:
 *          description: Success
 *       401:
 *          description: Incorrect username or password
 * 
 */