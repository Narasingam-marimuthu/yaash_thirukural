"use strict";
const Category = require("../model/categoryModel");
const categoryroute = require("../route/kuralroute");
const thirukural = require("../thirukural");

module.exports = {
  addKural: async (req, res, next) => {
    // console.log("req1s :", req);
    console.log(thirukural, "thirukural");
    let results = await Category.addKural(thirukural);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
  getKural: async (req, res, next) => {
    let results = await Category.getKural();
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
};
