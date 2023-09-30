import express from "express";
import {
  deleteUserByName,
  getMemberships,
  getUsersByOrder,
  postMembership,
  postUsers,
  deleteMembershipByName,
  // getMembershipById,
  addUsersToMembership,
  getMembershipIdByName,
} from "./controllers.js";

const router = express.Router();

router.post("/membership", postMembership);
router.post("/user", postUsers);
router.post("/user/:userid/member:memberid", addUsersToMembership);

router.get("/membership/:name", getMembershipIdByName);
router.get("/memberships", getMemberships);
router.get("/users/:order?", getUsersByOrder);

// router.get("/membership/:id", getMembershipById);

router.delete("/membership/:name", deleteMembershipByName);
router.delete("/user/:name", deleteUserByName);

export default router;
