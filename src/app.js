const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecase");
const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Chuong Duong",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Chuong Duong",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Help message",
    name: "Chuong Duong",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longtitude, (error, forecaseData) => {
        if (error) {
          return res.send({ error });
        }
        //send res
        res.send({
          location,
          forecast: forecaseData,
          address: req.query.address,
        });
      });
    }
  );
});

//404 page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Chuong Duong",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Chuong Duong",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
