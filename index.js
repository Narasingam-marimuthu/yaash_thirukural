const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());

//error handler
app.use(function (err, req, res, next) {
  console.log("unknown error", err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});
// Start the server
app.listen(5001, () => {
  console.log("Server is running on port 5000");
});

// Routes

app.get("/", (req, res) => {
  const imagePath = "logo.png";
  const image = fs.readFileSync(imagePath);

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Length", image.length);

  res.end(image);
});

const kuralRoute = require("./route/kuralroute")();
const aiKuralRoute = require("./route/aikuralroute")();
app.use("/v1/ai",aiKuralRoute)
app.use("/v1", kuralRoute);
