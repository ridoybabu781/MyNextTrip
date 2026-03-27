const {
  addBooking,
  getBookings,
  getAgencyBookings,
  updateBooking,
  getBooking,
  agencyFinishedTravel,
} = require("../controllers/booking.controller");
const User = require("../middleware/User");
const validation = require("../middleware/validation");

const express = require("express");
const { addBookingSchema } = require("../validation/booking.validate");
const Agency = require("../middleware/Agency");
const BookingRouter = express.Router();

BookingRouter.post(
  "/addBooking/:id",
  User,
  validation(addBookingSchema),
  addBooking
);
BookingRouter.get("/myBookings", User, getBookings);
BookingRouter.get("/getAgencyBookings", Agency, getAgencyBookings);
BookingRouter.put("/updateBooking/:id", User, updateBooking);
BookingRouter.get("/getBooking/:id", User, getBooking);
BookingRouter.get("/agencyFinishedTravel", Agency, agencyFinishedTravel);

module.exports = BookingRouter;
