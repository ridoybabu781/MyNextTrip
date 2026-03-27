const config = require("../../src/config");
const Booking = require("../models/booking.model");
const axios = require("axios");
const qs = require("qs");

const Cash = async (req, res, next) => {
  try {
    const userId = req.userId;
    const bookingId = req.params.id;

    const booking = await Booking.findOne({
      _id: bookingId,
      travelerId: userId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found" });
    }

    booking.paymentMethod = "COCD";
    await booking.save();
    res.status(200).json({ message: "COD Payment method added ", booking });
  } catch (error) {
    console.log(error);
  }
};

const payBill = async (req, res) => {
  try {
    const user = req.userId;
    const bookingId = req.params.id;

    console.log(bookingId);

    const booking = await Booking.findOne({
      _id: bookingId,
      travelerId: user,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const transactionId = "txn_" + Date.now();

    const data = {
      store_id: config.store_id,
      store_passwd: config.store_passwd,
      total_amount: booking.totalPrice,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `http://localhost:5050/api/payment/success/${bookingId}`,
      fail_url: `http://localhost:5050/api/payment/fail/${bookingId}`,
      cancel_url: `http://localhost:5050/api/payment/cancel/${bookingId}`,
      cus_name: booking.travelerId.name,
      cus_email: booking.travelerId.email,
      product_name: booking.tourName,
      product_category: booking.tourLocation,
      product_profile: "general",
    };

    const SSLCommerz_API =
      "https://sandbox.sslcommerz.com/gwprocess/v3/api.php";

    const response = await axios.post(SSLCommerz_API, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    booking.paymentMethod = "sslcommerz";
    await booking.save();

    res.json({
      url: response.data.GatewayPageURL,
      message: "SSLCommerz payment method selected. verify your payment",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const success = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { paymentStatus: "Paid" },
      { new: true }
    );
    if (!booking) {
      return res.status(400).json({ message: "Success Failed" });
    }
    res.redirect(`${process.env.CORS_ORIGIN}/payment/success/${id}`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const fail = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { paymentStatus: "Failed" },
      { new: true }
    );
    if (!booking) {
      return res.status(400).json({ message: "Fail Updation Failed" });
    }
    res.redirect(`${process.env.CORS_ORIGIN}/payment/failed/${id}`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const cancel = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { paymentStatus: "Canceled" },
      { new: true }
    );
    if (!booking) {
      return res.status(400).json({ message: "Fail Updation Failed" });
    }
    res.redirect(`${process.env.CORS_ORIGIN}/payment/canceled/${id}`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  Cash,
  payBill,
  success,
  fail,
  cancel,
};
