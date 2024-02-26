const express = require("express");
const router = express.Router();
const controller = require("../Controller/classController");
const { route } = require("./authentication");


router.route("/classes")
    .get(controller.getAllClasses)
    .post(controller.insertClass)
    .put(controller.updateClass)
    .delete(controller.deleteClass);

router.get("/classes/:id", controller.getClassById);
router.get("/classes/children/:id", controller.getChildrenByClassId);
router.get("/classes/teacher/:id", controller.getTeacherByClassId);

module.exports = router;