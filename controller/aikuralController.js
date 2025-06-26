"use strict";
const Kural = require("../model/kuralAi");

module.exports = {
  kuralChat: async (req, res, next) => {
    let results = await Kural.getAiResponse(req,res);
    if (results.success) {
      res
        .status(200)
        .send({ status: 1, message: results.message, data: results.data });
    } else {
      res.status(400).send({ status: 0, message: results.message, data: {} });
    }
  },
};
