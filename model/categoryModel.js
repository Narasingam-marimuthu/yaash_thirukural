const knex = require("../knex");
const dotenv = require("dotenv");
const crypto = require("crypto");
const fileUpload = require("../fileupload");
dotenv.config();

class Kural {
  static async addKural(thirukural) {
    try {
      console.log(thirukural, "req model");
      for (let index = 0; index < thirukural.length; index++) {
        let query = knex("thirukural").insert({
          number: thirukural[index].number,
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
      console.log(results, "results");
      return {
        success: true,
        message: "Kural list",
        data: results.map((obj) => ({
          id: obj.id,
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
