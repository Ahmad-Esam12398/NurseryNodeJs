const express = require("express");
const router = express.Router();
const controller = require("../Controller/teacherController");


router.route("/teachers")
    .get(controller.getAllTeachers)
    .post(controller.insertTeacher)
    .put(controller.updateTeacher)
    .delete(controller.deleteTeacher);

router.get("/teachers/supervisors", controller.getAllSupervisors);
router.get("/teachers/:id", controller.getTeacherById);

module.exports = router;