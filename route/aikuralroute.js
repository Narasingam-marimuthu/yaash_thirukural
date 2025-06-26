module.exports = () => {
  const aiKuralRoute = require("express-promise-router")();
  const dotenv = require("dotenv");
  var kuralController = require("../controller/aikuralController");
  dotenv.config();
  aiKuralRoute.route("/kuralchat").post(kuralController.kuralChat);

  return aiKuralRoute;
};
