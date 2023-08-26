module.exports = () => {
  const kuralRoute = require("express-promise-router")();
  const dotenv = require("dotenv");
  var kuralController = require("../controller/kuralController");
  kuralRoute.route("/filter").post(kuralController.generateText);
};
