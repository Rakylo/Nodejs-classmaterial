// import express from "express";
const PORT = 3000;

const express = require("express");

const cors = require("cors");

const app = express();

const brandai = ["BMW", "VW", "Audi"];

app.use(cors());

app.listen(3000, () => {
  console.log("server running on PORT 3000");
});

app.get("/brandai/:parametras", (req, res) => {
  const vokietis = req.params.parametras;
  const filtered = brandai.filter(
    (auto) => auto.toUpperCase() === vokietis.toUpperCase()
  );
  res.json(filtered);
});

app.get("/", (req, res) => {
  res.json(brandai);
});
