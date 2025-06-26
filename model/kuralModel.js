const knex = require("../knex");
const dotenv = require("dotenv");
const crypto = require("crypto");
const fileUpload = require("../fileupload");
dotenv.config();
const axios = require("axios");
const { PALM_API_KEY } = require("../config");
const fs = require("fs");
const path = require("path");

class Kural {
  static async addAthigaram(athigaram) {
    try {
      for (let index = 0; index < athigaram.length; index++) {
        let query = knex("athigaram").insert({
          athigaram_name: athigaram[index].athigaram,
        });
        await query;
      }
      return {
        success: true,
        message: "Athikaram Added Successfully",
        data: {},
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
        data: {},
      };
    }
  }
  static async getAdhigaram() {
    try {
      console.log("inside getAdhigaram");
      let query = knex("athigaram").select("*");
      // await query;

      let results = await query;
      console.log(results, "Athigrama");
      return {
        success: true,
        message: "Adhigaram list",
        data: results.map((obj) => ({
          athigaram_id: obj.athigaram_id,
          athigaram_name: obj.athigaram_name,
        })),
      };
    } catch (err) {
      return {
        success: false,
        message: "Error occured while fetching learntype data",
        data: {},
      };
    }
  }

  static async getKuralByNumber(kuralNumber) {
    try {
      console.log("inside getKuralByNumber");

      // Read and parse the Tirukkural JSON file
      const filePath = path.join(__dirname, "../thirukural.json"); // update path as needed
      const rawData = fs.readFileSync(filePath, "utf-8");
      const kurals = JSON.parse(rawData);

      // Find the kural with the given number
      const kural = kurals.find((k) => k.number === Number(kuralNumber));

      if (!kural) {
        return {
          success: false,
          message: "Kural not found",
          data: {},
        };
      }

      return {
        success: true,
        message: "Kural found",
        data: kural,
      };
    } catch (err) {
      console.error("Error reading Kural:", err);
      return {
        success: false,
        message: "Error occurred while fetching Kural",
        data: {},
      };
    }
  }

  static async addKural(thirukural) {
    try {
      // console.log(thirukural, "req model");
      for (let index = 0; index < thirukural.length; index++) {
        let query = knex("thirukural").insert({
          number: thirukural[index].number,
          paal_id: thirukural[index].paal_id,
          eyal_id: thirukural[index].eyal_id,
          athigaram_id: thirukural[index].athigaram_id,
          sect_tam: thirukural[index].sect_tam,
          chapgrp_tam: thirukural[index].chapgrp_tam,
          chap_tam: thirukural[index].chap_tam,
          line1: thirukural[index].line1,
          line2: thirukural[index].line2,
          tam_exp: thirukural[index].tam_exp,
          sect_eng: thirukural[index].sect_eng,
          chap_eng: thirukural[index].chap_eng,
          chapgrp_eng: thirukural[index].chapgrp_eng,
          eng_exp: thirukural[index].eng_exp,
          eng: thirukural[index].eng,
        });
        await query;
      }

      return {
        success: true,
        message: "Kural Added Successfully",
        data: {},
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
        data: {},
      };
    }
  }
  static async getKural() {
    try {
      let query = knex("thirukural").select("*");
      let results = await query;
      // console.log(results, "results");
      return {
        success: true,
        message: "Kural list",
        data: results.map((obj) => ({
          id: obj.id,
          paal_id: obj.paal_id,
          eyal_id: obj.eyal_id,
          athigaram_id: obj.athigaram_id,
          number: obj.number,
          sect_tam: obj.sect_tam,
          chapgrp_tam: obj.chapgrp_tam,
          chap_tam: obj.chap_tam,
          line1: obj.line1,
          line2: obj.line2,
          tam_exp: obj.tam_exp,
          sect_eng: obj.sect_eng,
          chap_eng: obj.chap_eng,
          chapgrp_eng: obj.chapgrp_eng,
          eng_exp: obj.eng_exp,
          eng: obj.eng,
        })),
      };
    } catch (err) {
      return {
        success: false,
        message: "Error occured while fetching learntype data",
        data: {},
      };
    }
  }
  static async getKuralByAdhigaramId(req) {
    console.log(req.params.id, "req");
    try {
      let id = req.params.id;
      let query = knex("thirukural").select("*").where({ athigaram_id: id });
      let results = await query;
      return {
        success: true,
        message: "Thirukural list",
        data: results.map((obj) => ({
          number: obj.number,
          sect_tam: obj.sect_tam,
          chapgrp_tam: obj.chapgrp_tam,
          chap_tam: obj.chap_tam,
          line1: obj.line1,
          line2: obj.line2,
          tam_exp: obj.tam_exp,
          sect_eng: obj.sect_eng,
          chap_eng: obj.chap_eng,
          chapgrp_eng: obj.chapgrp_eng,
          eng_exp: obj.eng_exp,
          eng: obj.eng,
        })),
      };
    } catch (err) {
      return {
        success: false,
        message: "Error occured while fetching learntype data",
        data: {},
      };
    }
  }

  static async generateText(prompt) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${PALM_API_KEY}`;

      const response = await axios.post(apiUrl, {
        prompt,
      });
      console.log("value_response:", response.data.candidates[0].output);
      const value = response.data.candidates[0].output;

      let filterQuery = knex("thirukural").select("*");
      let filterValue = await filterQuery;
      console.log("filterValue :", filterValue);
      if (response) {
        return {
          success: true,
          message: "filter list",
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "Error occured while fetching learntype data",
          data: {},
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // static async getKuralById(req) {
  //   console.log(req, "req");
  //   try {
  //     let id = req.params.id;
  //     let query = knex(process.env.CATEGORY)
  //       .where({ id: id })
  //       .select("category_name");
  //     let results = await query;
  //     return { success: true, message: "Category list", data: results };
  //   } catch (err) {
  //     return {
  //       success: false,
  //       message: "Error occured while fetching learntype data",
  //       data: {},
  //     };
  //   }
  // }
  // static async editKural(req) {
  //   // console.log(req, "req");

  //   try {
  //     let id = req.params.id;
  //     let query = knex(process.env.Kural).where({ id: id }).update({
  //       Kural_name: req.body.Kural_name,
  //     });
  //     await query;
  //     return { success: true, message: "Successfully edited", data: {} };
  //   } catch (err) {
  //     return {
  //       success: false,
  //       message: err.message,
  //       data: {},
  //     };
  //   }
  // }

  // static async deleteKural(req) {
  //   try {
  //     let id = req.params.id;
  //     let query = knex(process.env.Kural).where({ id: id }).del();
  //     await query;
  //     return { success: true, message: "Successfully Deleted", data: {} };
  //   } catch (err) {
  //     return {
  //       success: false,
  //       message: err.message,
  //       data: {},
  //     };
  //   }
  // }
}

module.exports = Kural;
