const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/CheckLogin");
const myCourseController = require("../Controllers/myCourse.controller");

router.get("/buy-course/:id", verifyToken, myCourseController.buyCourse);
router.get("/get-my-course", verifyToken, myCourseController.getMyCourse);

router.put("/tracking-progress",verifyToken, myCourseController.trackProgress);
router.delete("/delete/:id",verifyToken, myCourseController.deleteMyCourse);

module.exports = router;