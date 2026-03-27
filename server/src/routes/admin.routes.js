const router = require("express").Router();

const {
  createAdmin,
  approveAgency,
  rejectAgency,
  getPendingAgencies,
  deleteProfile,
  blockProfile,
  unBlockProfile,
  getBlockedProfile,
  getAllAgencies,
} = require("../controllers/admin.controller");
const Admin = require("../middleware/Admin");
const userCheck = require("../middleware/User");

router.post("/admin/rr/rsc-create-bro-admin", createAdmin);

router.get("/getAllAgencies", userCheck, Admin, getAllAgencies);

router.delete("/deleteProfile/:id", userCheck, Admin, deleteProfile);
router.put("/blockProfile/:id", userCheck, Admin, blockProfile);
router.put("/unBlockProfile/:id", userCheck, Admin, unBlockProfile);
router.get("/getBlockedProfiles", userCheck, Admin, getBlockedProfile);

router.get("/getPendingAgencies", userCheck, Admin, getPendingAgencies);
router.post("/approveAgency/:agencyId", userCheck, Admin, approveAgency);
router.post("/rejectAgency/:agencyId", userCheck, Admin, rejectAgency);

const adminRouter = router;
module.exports = adminRouter;
