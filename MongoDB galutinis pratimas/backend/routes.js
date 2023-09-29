import express from "express";
import {
  deleteUserByName,
  getMemberships,
  getUsersByOrder,
  postMemberships,
  postUsers,
  deleteMembershipByName,
  getMembershipNamefromUserId,
} from "./controllers.js";

const router = express.Router();

router.get("/memberships", getMemberships);

router.get("/membership/:id", getMembershipNamefromUserId);

router.post("/memberships", postMemberships);

router.delete("/membership/:name", deleteMembershipByName);

router.delete("/user/:name", deleteUserByName);

router.get("/users/:order", getUsersByOrder);

router.post("/users", postUsers);

export default router;
