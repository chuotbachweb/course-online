const express = require("express");
const router = express.Router();

const { verifyToken ,verifyTokenBusiness} = require("../middleware/CheckLogin");
const recruitmentController = require("../Controllers/recruitment.controller")
const upload = require("../middleware/upload")

router.post('/post-recruitment',verifyTokenBusiness,recruitmentController.postRecruitment)

router.put('/edit/:id',verifyTokenBusiness,recruitmentController.editRecruitment)
router.delete('/delete/:id',verifyTokenBusiness,recruitmentController.deleteRecruitment)

router.get('/get-all-recruitment',recruitmentController.getAllRecruitment)
router.get('/get-my-recruitment',verifyToken,recruitmentController.getRecruitmentStudent)

router.put('/apply-recruitment',verifyToken,upload.single("fileCV"),recruitmentController.applyRecruitment)
router.put('/handle-recruitment',verifyTokenBusiness,recruitmentController.handleApplyCV)

module.exports = router;
