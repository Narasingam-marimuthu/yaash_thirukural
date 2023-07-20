module.exports = () => {
  const kuralRoute = require("express-promise-router")();
  const dotenv = require("dotenv");
  var kuralController = require("../controller/kuralController");
  dotenv.config();
  kuralRoute
    .route("/getkuralById/:id")
    .get(kuralController.getKuralByAdhigaramId);

  kuralRoute.route("/addKural").post(kuralController.addKural);

  kuralRoute.route("/getkural").get(kuralController.getKural);

  kuralRoute.route("/addadhigaram").post(kuralController.addAthigaram);
  kuralRoute.route("/getadhigaram").get(kuralController.getAthigaram);

  return kuralRoute;
};
