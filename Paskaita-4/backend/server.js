const express = require("express");
const app = express();

const cars = {
  bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
  mb: ["A class", "C class", "E class", "S class"],
  vw: ["Golf", "Arteon", "UP"],
};

// GET užklausos tvarkytojas su dinamine nuoroda
app.get("/cars/:brand", (req, res) => {
  const brand = req.params.brand.toLowerCase(); // Gauti automobilio markę iš URL ir paversti ją mažosiomis raidėmis
  const carModels = cars[brand]; // Gauti atitinkamą automobilių masyvą pagal markę

  if (carModels) {
    res.json(carModels); // Grąžinti automobilių masyvą kaip JSON
  } else {
    res.status(404).json({
      message: "Markė nerasta", // Jei markė nerasta, grąžinti 404 klaidos pranešimą
    });
  }
});

const PORT = process.env.PORT || 3000; // Nustatyti portą
app.listen(PORT, () => {
  console.log(`Serveris veikia portu ${PORT}`);
});
