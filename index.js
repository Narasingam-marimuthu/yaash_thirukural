const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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
app.listen(5000, () => {
  console.log("Server is running on port 3000");
});

// Routes

app.get("/", (req, res) => {
  const imagePath = "logo.png";
  const image = fs.readFileSync(imagePath);

  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Length", image.length);
  res.send("Yaash Thirukural");

  res.end(image);
});

const kuralRoute = require("./route/kuralroute")();
app.use("/categories", kuralRoute);
