const knex = require("../knex");

exports.up = function () {
  return knex.schema.createTable("athigaram", function (table) {
    table.increments("athigaram_id").primary();
    table.string("athigaram_name", 5000).notNullable();
  });
};

exports.down = function () {
  return knex.schema.dropTable("athigaram");
};
