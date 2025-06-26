"use strict";
const Kural = require("../model/kuralModel");
const Kuralroute = require("../route/kuralroute");
const thirukural = require("../thirukural.json");
const athigaram = require("../athigaram");
const PALM_API_KEY = "AIzaSyALnGbeCtuXhc7NmIEzl-lcHuy1DBTz898";

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

  getKuralByNumber: async (req, res, next) => {
    console.log(req.params,"req.params.number");
    
    let results = await Kural.getKuralByNumber(req.params.number);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },

  // filter: async (req, res, next) => {
  //   console.log("inside the function");
  //   console.log(req.body, "req.body");
  //   try {
  //     const { prompt, maxTokens } = req.body;
  //     const PALM_API_KEY = "AIzaSyALnGbeCtuXhc7NmIEzl-lcHuy1DBTz898";
  //     let results = await Kural.filter(req, res, PALM_API_KEY);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  generateText: async (req, res) => {
    console.log(req.body, "req.body");
    try {
      const { prompt } = req.body;
      console.log("datas", prompt);

      const generatedText = await Kural.generateText(prompt);
      console.log(generatedText, "generte");
      if (generatedText.success) {
        res.status(200).send({
          status: 1,
          message: generatedText.message,
          data: generatedText,
        });
      } else {
        res
          .status(400)
          .send({ status: 0, message: generatedText.message, data: {} });
      }
      res.json({ generatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};
