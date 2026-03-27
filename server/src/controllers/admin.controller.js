const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(createError(404, "Something is missing"));
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPass,
      role: "admin",
    });

    await user.save();

    res.status(201).json({
      message: "Admin Created Successfull. Go to login page for login",
    });
  } catch (error) {
    next(error);
  }
};

const getPendingAgencies = async (req, res, next) => {
  try {
    const agencies = await User.find({
      $and: [{ isAgent: "pending" }, { role: "agency" }],
    });

    if (!agencies) {
      return next(createError(404, "No agency request here"));
    }

    res.status(200).json({ message: "Agency Fetched Successfully", agencies });
  } catch (error) {
    next(error);
  }
};

const approveAgency = async (req, res, next) => {
  try {
    const { agencyId } = req.params;

    const agency = await User.findByIdAndUpdate(
      agencyId,
      {
        isAgent: "yes",
      },
      { new: true }
    );

    if (!agency) {
      return next(createError(400, "Agency Updation failed"));
    }

    res.status(200).json({ agency, message: "Agency updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const rejectAgency = async (req, res, next) => {
  try {
    const { agencyId } = req.params;

    const agency = await User.findByIdAndDelete(agencyId);

    if (!agency) {
      return next(createError(400, "Agency deletion failed"));
    }

    res
      .status(200)
      .json({ agency, message: "Agency request rejected Successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllAgencies = async (req, res, next) => {
  try {
    const agencies = await User.find({
      role: "agency",
      isAgent: "yes",
      isBlocked: { $ne: true },
    });

    if (agencies?.length === 0) {
      return next(createError(404, "No Agency Available"));
    }

    res.status(200).json({ message: "All Agency loaded", agencies });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const profileId = req.params.id;

    const res = await User.findByIdAndDelete(profileId);

    if (!res) {
      return next(createError(400, "Something went wrong"));
    }
    res.status(200).json({ message: "Profile Deleted Successfully" });
  } catch (error) {}
};

const blockProfile = async (req, res, next) => {
  try {
    const id = req.params.id;

    const blockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    if (!blockedUser) {
      return next(createError(400, "Profile Blocking Failed"));
    }

    res
      .status(200)
      .json({ message: "One Profile Blocked Successfully", blockedUser });
  } catch (error) {
    next(error);
  }
};

const unBlockProfile = async (req, res, next) => {
  try {
    const id = req.params.id;

    const unBlockedUser = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    if (!unBlockedUser) {
      return next(createError(400, "Profile Unblocking Failed"));
    }

    res
      .status(200)
      .json({ message: "One Profile Blocked Successfully", unBlockedUser });
  } catch (error) {
    next(error);
  }
};

const getBlockedProfile = async (req, res, next) => {
  try {
    const blockedProfiles = await User.find({ isBlocked: true });

    if (!blockedProfiles) {
      return next(createError(404, "There's no Blocked Profiles"));
    }

    res
      .status(201)
      .json({ message: "All Blocked Profile Fetched", blockedProfiles });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmin,
  approveAgency,
  rejectAgency,
  getPendingAgencies,
  deleteProfile,
  blockProfile,
  unBlockProfile,
  getBlockedProfile,
  getAllAgencies,
};
