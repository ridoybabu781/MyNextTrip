const { default: mongoose } = require("mongoose");
const Booking = require("../models/booking.model");
const Travel = require("../models/travel.model");
const User = require("../models/user.model");

const addBooking = async (req, res) => {
  try {
    const travelId = req.params.id;
    const userId = req.userId;
    let { numberOfTraveler, tourDate, paymentMethod, totalPrice } = req.body;

    if (!tourDate) {
      return res.status(404).json({ message: "Date is missing" });
    }

    if (!numberOfTraveler) {
      numberOfTraveler = 1;
    }
    const travel = await Travel.findById({ _id: travelId });

    if (!travel) {
      return res.status(404).json({ message: "Travel id not found" });
    }

    const booking = await Booking.findOne({
      travelerId: userId,
      travelId,
    });

    if (booking) {
      return res.status(400).json({ message: "Already Booked" });
    }

    const newBooking = new Booking({
      travelId,
      travelerId: userId,
      tourName: travel.title,
      tourLocation: travel.location,
      tourDate,
      numberOfTraveler,
      totalPrice,
      paymentMethod,
    });

    await newBooking.save();

    if (paymentMethod === "cash") {
      return res.status(200).json({
        message: "Booking success, pay for confirm",
        booking: newBooking,
      });
    }

    if (paymentMethod === "sslcommerz") {
      return res.status(200).json({
        message: "Complete Payment To Confirm Your Order",
        redirectUrl: `/payment/payBill/${newBooking._id}`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const getBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const myBookings = await Booking.find({ travelerId: userId });

    if (!myBookings) {
      return res.status(404).json({ message: "No Bookings are available" });
    }

    res.status(200).json({ myBookings });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getAgencyBookings = async (req, res) => {
  try {
    const travels = await Travel.find({ agencyId: user._id }).select("_id");
    if (!travels.length) {
      return res
        .status(404)
        .json({ message: "No travels found for this agency" });
    }

    const travelIds = travels.map((t) => t._id);

    const myTripBookings = await Booking.find({ travelId: { $in: travelIds } });

    if (!myTripBookings.length) {
      return res.status(400).json({ message: "No Bookings Are Available" });
    }

    res.status(200).json({
      message: "Bookings are fetched",
      agencyBookings: myTripBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const updateBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (user.role !== "agency") {
      return res.status(400).json({ message: "You're not an agency" });
    }

    const { status } = req.body;

    const bookingId = req.params.id;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        status,
      },
      { new: true }
    );
    if (!booking) {
      return res.status(400).json("Booking Not updated");
    }

    res.status(200).json({ message: "Booking Updated Successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getBooking = async (req, res) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(400).json("No booking found");
    }
    res.status(200).json({ booking, message: "Booking fetched" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const agencyFinishedTravel = async (req, res, next) => {
  try {
    const agencyId = req.agencyId;

    const finishedTravels = await Booking.aggregate([
      {
        $match: { status: "Completed" },
      },
      {
        $lookup: {
          from: "travels",
          localField: "travelId",
          foreignField: "_id",
          as: "travel",
        },
      },
      { $unwind: "$travel" },
      {
        $match: {
          "travel.agencyId": new mongoose.Types.ObjectId(agencyId),
        },
      },
      {
        $project: {
          _id: 1,
          travelerId: 1,
          status: 1,
          tourDate: 1,
          numberOfTraveler: 1,
          totalPrice: 1,
          tourDate: 1,
          travel: 1,
        },
      },
    ]);

    if (finishedTravels.length === 0) {
      return res.status(404).json({ message: "No Travel Found" });
    }

    res
      .status(200)
      .json({ message: "Travel Fetched Successfully", finishedTravels });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBooking,
  getAgencyBookings,
  getBookings,
  updateBooking,
  getBooking,
  agencyFinishedTravel,
};
