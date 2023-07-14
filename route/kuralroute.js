module.exports = () => {
  const kuralRoute = require("express-promise-router")();
  const dotenv = require("dotenv");
  var categoryController = require("../controller/categoriesController");
  dotenv.config();
  kuralRoute.route("/addKural").post(categoryController.addKural);

  kuralRoute.route("/getKural").get(categoryController.getKural);
  // kuralRoute
  //   .route("/getCategories/:id")
  //   .get(categoryController.getCategoryById);

  // kuralRoute
  //   .route("/editCategories/:id")
  //   .put(categoryController.editCategory);

  // kuralRoute
  //   .route("/deleteCategories")
  //   .delete(categoryController.deleteCategory);

  return kuralRoute;
};
