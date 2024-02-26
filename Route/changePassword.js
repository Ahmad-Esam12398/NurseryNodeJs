const express = require("express");

const router = express.Router();
const controller = require("./../Controller/changePassword")
const {isYourData} = require("./../MW/authorization")
const validationArrs = require("./../MW/validations/childsValidator")
const validator = require("./../MW/validations/validator")

router.route("/changePassword")
        .all(isYourData)
        .patch(validationArrs.updatePassword, validator, controller.updatePassword);

module.exports = router;

/**
 * @swagger
 * /changePassword:
 *   post:
 *     description: change Password
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          oldPassword:
 *                              type: string
 *                              description: user's oldPassword
 *                              example: 12345678
 *                          newPassword:
 *                              type: string
 *                              description: user's newPassword
 *                              example: 87654321(Admin Password)
 *                              minLength: 8
 *                              maxLength: 50
 *     responses:
 *       200:
 *          description: Success
 *       403:
 *          description: Unauthorized (your id not id will be updated)
 *       422:
 *          description: Incorrect validation
 *       
 * 
 */