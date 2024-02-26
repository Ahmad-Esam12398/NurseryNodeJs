const express = require("express");
const controller = require("../Controller/usersController")
const {isTeacher, isAdminOrTeacher} = require("../MW/authorization")
const router = express.Router();



router.route("/childs")
        .all(isAdminOrTeacher)
        .get(controller.findAllChildrens)


module.exports = router;



/**
 * @swagger
 * /childs:
 *   get:
 *     description: get All childs
 *     requestBody:
 *          required: false
 *     responses:
 *       200:
 *          description: Success
 *       403:
 *          description: Unauthorized (Not Admin Nor Teacher)
 *       
 * 
 */