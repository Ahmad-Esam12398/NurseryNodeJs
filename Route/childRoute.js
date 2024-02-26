const express = require("express");
const router = express.Router();
const controller = require("../Controller/childController");
const {body, query, param} = require("express-validator");

router.route("/child")
    .get(controller.getAllChildren)
    .post(controller.insertChild)
    .put(controller.updateChild)
    .delete(controller.deleteChild);

router.get("/child/:id", controller.getChildById);


module.exports = router;