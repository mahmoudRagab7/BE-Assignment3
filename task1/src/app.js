const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const path = require("path");
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

const viewsDirectory = path.join(__dirname, "../temp1/views");
app.set("views", viewsDirectory);

// to read partials :
var hbs = require("hbs");
const partialsPath = path.join(__dirname, "../Temp1/partials");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    desc: "This is home page",
  });
});

app.get("/forecast", (req, res) => {
  res.render("forecast", {
    title: "Weather",
    desc: "This is weather page",
  });
});

const geocode = require("./tools/geocode");
const forecast = require("./tools/forecastFile");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      // shorthand property error:error
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        latitude: data.latitude,
        longitude: data.longitude,
        location: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.send("404 Page Not Founded");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
