const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const createHttpError = require("http-errors");

const Agency = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.token?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const agencyId = decoded.id;

    const agency = await User.findById(agencyId);
    if (!agency || agency.role !== "agency") {
      return next(createHttpError(403, "You're not authorized to add travel"));
    }

    req.agency = agency;
    req.agencyId = agencyId;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Agency;
