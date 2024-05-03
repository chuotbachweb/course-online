const express = require("express");
const router = express.Router();

const { verifyTokenTeacher, verifyToken } = require("../middleware/CheckLogin");
const courseController = require("../Controllers/course.controller");
const upload = require("../middleware/upload");

router.post(
  "/new-course",
  verifyTokenTeacher,
  upload.single("imageUrl"),
  courseController.newCourse
);

router.put(
  "/edit-course/:id",
  upload.single("imageUrl"),
  courseController.editCourse
);

router.get("/get-all-course", courseController.getCourse);
router.get("/course-all-sold",verifyTokenTeacher, courseController.getAllCourseSold);
router.get("/course-sold/:id",verifyTokenTeacher, courseController.getCourseSold);
router.get("/get-course-teacher", courseController.getCourseTeacher);
router.get("/get-course/:id", courseController.getCourseById);

router.get("/month-income",verifyTokenTeacher, courseController.getMonthIncome);
router.get("/top-income",verifyTokenTeacher, courseController.getTopIncome);

router.delete(
  "/delete-course/:id",
  verifyTokenTeacher,
  courseController.deleteCourse
);

module.exports = router;
