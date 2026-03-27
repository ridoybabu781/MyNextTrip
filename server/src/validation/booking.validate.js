const Joi = require("joi");

const addBookingSchema = Joi.object({
  numberOfTraveler: Joi.number().default(1),
  tourDate: Joi.date().required(),
  paymentMethod: Joi.string().valid("cash", "sslcommerz").required(),
  status: Joi.string()
    .valid("Pending", "Confirmed", "Cancelled")
    .default("Pending"),
  paymentStatus: Joi.string()
    .valid("Pending", "Paid", "Failed")
    .default("Pending"),
  totalPrice: Joi.number().required(),
});

module.exports = {
  addBookingSchema,
};
