module.exports = () => {
  const kuralRoute = require("express-promise-router")();
  const dotenv = require("dotenv");
  var kuralController = require("../controller/kuralController");
  dotenv.config();

  kuralRoute.route("/adhigaram").get(kuralController.getAthigaram);
  kuralRoute
    .route("/kural")
    .get(kuralController.getKural)
    .post(kuralController.addKural);
  kuralRoute.route("/kural/:id").get(kuralController.getKuralByAdhigaramId);

  return kuralRoute;
};
