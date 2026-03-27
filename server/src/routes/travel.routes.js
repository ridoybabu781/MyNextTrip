const express = require("express");
const TravelRouter = express.Router();
const Agency = require("../middleware/Agency");
const {
  addTravelImages,
  addTravel,
  getTravels,
  getTravel,
  getAgencyTravels,
  searchTravels,
  updateTravel,
  deleteTravel,
} = require("../controllers/travel.controller");
const User = require("../middleware/User");
const upload = require("../utils/multer");
const validation = require("../middleware/validation");
const { addTravelSchema } = require("../validation/travel.validate");

TravelRouter.post("/addTravel", Agency, validation(addTravelSchema), addTravel);
TravelRouter.post(
  "/addImage/:id",
  Agency,
  upload.single("travelImage"),
  addTravelImages
);
TravelRouter.get("/getMyTravels", Agency, getAgencyTravels);
TravelRouter.get("/getTravels/:query", searchTravels);

TravelRouter.get("/getTravels", getTravels);
TravelRouter.get("/getTravel/:id", getTravel);
TravelRouter.put("/updateTravel/:id", Agency, updateTravel);
TravelRouter.delete("/deleteTravel/:id", Agency, deleteTravel);

module.exports = TravelRouter;
