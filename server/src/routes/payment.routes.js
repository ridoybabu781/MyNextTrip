const express = require("express");
const User = require("../middleware/User");
const {
  payBill,
  fail,
  success,
  cancel,
  Cash,
} = require("../controllers/payment.controller");
const PaymentRouter = express.Router();

PaymentRouter.post("/cash/:id", User, Cash);
PaymentRouter.post("/payBill/:id", User, payBill);
PaymentRouter.post("/success/:id", success);
PaymentRouter.post("/fail/:id", fail);
PaymentRouter.post("/cancel/:id", cancel);

module.exports = PaymentRouter;
