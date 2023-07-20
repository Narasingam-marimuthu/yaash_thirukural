"use strict";
const Kural = require("../model/kuralModel");
const Kuralroute = require("../route/kuralroute");
const thirukural = require("../thirukural");
const athigaram = require("../athigaram");

module.exports = {
  addKural: async (req, res, next) => {
    // console.log("req1s :", req);
    let results = await Kural.addKural(thirukural);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
  addAthigaram: async (req, res, next) => {
    // console.log("req1s :", req);
    let results = await Kural.addAthigaram(athigaram);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
  getKural: async (req, res, next) => {
    let results = await Kural.getKural();
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
  getKuralByAdhigaramId: async (req, res, next) => {
    console.log(req.params, "req.params");
    let id = req.params.id;
    let results = await Kural.getKuralByAdhigaramId(req);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },

  getAthigaram: async (req, res, next) => {
    let results = await Kural.getAdhigaram();
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
};
