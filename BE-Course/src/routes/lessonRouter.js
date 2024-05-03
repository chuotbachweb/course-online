const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAdmin,
  verifyTokenTeacher,
} = require("../middleware/CheckLogin");
const upload = require("../middleware/upload");
const lessonController = require("../Controllers/lesson.controller");

router.get("/course/:id", lessonController.getCourseId);
router.get("/get-lesson/:id", lessonController.getLessonById);

router.post(
  "/add-lesson/:id",
  verifyTokenTeacher,
  upload.single("videoUrl"),
  lessonController.addLesson
);

router.put(
  "/edit-lesson/:id",
  verifyTokenTeacher,
  upload.single("videoUrl"),
  lessonController.editLesson
);

router.delete(
  "/delete-lesson/:id",
  verifyTokenTeacher,
  lessonController.deleteLesson
);

module.exports = router;
