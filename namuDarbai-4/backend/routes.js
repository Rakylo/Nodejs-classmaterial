import express from "express";
import {
  getNames,
  postNames,
  deleteNames,
  putNames,
  getBrand,
  getData,
  getDataByCar,
  getDataById,
  getByEmail,
  femaleNameSurname,
  dviejuParametruUzklausa,
  pagalUzklausa,
} from "./controllers.js";

const router = express.Router();

router.get("/", getNames);

router.post("/", postNames);

router.delete("/:id", deleteNames);

router.put("/:id", putNames);

router.get("/cars/:brands", getBrand);

router.get("/data", getData);

router.get("/data/:masina", getDataByCar);

router.get("/datazmones/:id", getDataById);

router.get("/dataemailas", getByEmail);

router.get("/moterys", femaleNameSurname);

router.get("/duparametrai", dviejuParametruUzklausa);

router.get("/uzklausa", pagalUzklausa);

export default router;
