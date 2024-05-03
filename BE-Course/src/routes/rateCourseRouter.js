const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/CheckLogin");
const rateCourseController = require("../Controllers/rateCourse.controller")

router.post('/sent-rate/:id',verifyToken,rateCourseController.sentRate)
router.get('/get-rate-course/:id',rateCourseController.getRate)


module.exports = router;
