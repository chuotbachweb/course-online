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
router.get("/get-all", lessonController.getAllLesson);
router.get("/get-lesson/:id", lessonController.getLessonById);

router.post(
  "/add-lesson/:id",
  verifyTokenTeacher,
  upload.fields([
    { name: "fileHomework", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 },
  ]),
  lessonController.addLesson
);

router.put(
  "/edit-lesson/:id",
  verifyTokenTeacher,
  upload.fields([
    { name: "fileHomework", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 },
  ]),
  lessonController.editLesson
);

router.put("/assignment/:id",verifyToken,lessonController.changeAssignment);
router.put("/submit-assignment/:id",verifyToken,upload.single("fileAssignment"),lessonController.submitAssignment);

router.delete(
  "/delete-lesson/:id",
  verifyTokenTeacher,
  lessonController.deleteLesson
);

module.exports = router;
