const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    travelerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    travelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Travel",
      required: true,
      index: true,
    },
    tourName: {
      type: String,
      required: true,
      index: true,
    },
    tourLocation: {
      type: String,
      required: true,
    },
    numberOfTraveler: {
      type: Number,
      required: true,
      default: 1,
    },
    tourDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentMethod: { type: String, enum: ["cash", "sslcommerz"] },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Canceled"],
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
