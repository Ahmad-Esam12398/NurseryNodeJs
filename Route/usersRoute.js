const express = require("express");
const {isAdmin} = require("../MW/authorization");
const validationArrs = require("../MW/validations/childsValidator");
const validate = require("../MW/validations/validator");

const controller = require("../Controller/usersController");
const router = express.Router();

router.route("/users")
    .all(isAdmin)
    .get(controller.getAllUsers)
    .post(validationArrs.insertArray, validate, controller.upload.single('profileImage'), controller.insertChild)
    .delete(controller.deleteChild)

router.route("/users/:id")
    .all(isAdmin)
    .patch(controller.upload.single('profileImage'), validationArrs.updateArray, validate, controller.updateChild)

module.exports = router;


