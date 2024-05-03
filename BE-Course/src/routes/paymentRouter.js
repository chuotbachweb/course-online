const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/CheckLogin");
const paymentController = require("../Controllers/payment.controller");

router.post(
  "/create_payment_vnpay",
  verifyToken,
  paymentController.createPayment
);
router.post("/vnpay_callback",verifyToken, paymentController.callbackVnPay);

module.exports = router;