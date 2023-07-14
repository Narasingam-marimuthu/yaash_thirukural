require("dotenv").config();
const environment = process.env.NODE_ENV || "development";
const knex = require("knex");
// knex.raw(`CREATE DATABASE ${process.env.DB_NAME};`)
//   .then(function() {
//     return knex.raw(`DROP DATABASE ${process.env.DB_NAME};`)
//   })
//   .finally(function () {
//     console.log("MYSQL Server Connected Successfully");
//   });
const config = require("./knexfile");
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

module.exports = connection;
