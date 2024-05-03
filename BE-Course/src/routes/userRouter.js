const express = require("express");
const router = express.Router();

const { verifyToken, verifyTokenAdmin } = require("../middleware/CheckLogin");
const upload = require("../middleware/upload");
const userController = require("../Controllers/user.controller");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post(
  "/new-teacher",
  verifyTokenAdmin,
  upload.single("imageUrl"),
  userController.newTeacher
);

router.get("/current-user", verifyToken, userController.currentUser);
router.get("/get-teacher", verifyTokenAdmin, userController.getTeacher);
router.get("/get-user", verifyTokenAdmin, userController.getUser);
router.get("/get-user/:id", userController.getUserById);

router.put(
  "/edit-user/:id",
  verifyToken,
  upload.single("imageUrl"),
  userController.editUser
);

router.delete("/delete-user/:id", verifyTokenAdmin, userController.deleteUser);

module.exports = router;
